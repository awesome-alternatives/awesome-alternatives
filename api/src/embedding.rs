use std::num::NonZeroUsize;
use std::sync::{Arc, Mutex};

use fastembed::{EmbeddingModel, TextEmbedding, TextInitOptions};
use tokio::task::JoinError;

pub type Vector = Vec<f32>;

pub const BATCH: NonZeroUsize = NonZeroUsize::new(16).expect("16 is not zero");

#[derive(Debug, thiserror::Error)]
pub enum EmbedError {
    #[error("embedding failed: {0}")]
    Model(String),
    #[error("the embedding task failed: {0}")]
    Task(#[from] JoinError),
    #[error("the model left a text without a vector")]
    Incomplete,
}

#[derive(Debug, Clone, Copy)]
pub struct Thresholds {
    pub target: f32,
    pub margin: f32,
    pub relevance: f32,
}

pub trait Embedder: Send + Sync {
    fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError>;
    fn thresholds(&self) -> Thresholds;
}

pub struct LocalModel(Mutex<TextEmbedding>);

impl LocalModel {
    pub fn load() -> Result<Self, EmbedError> {
        let options = TextInitOptions::new(EmbeddingModel::ParaphraseMLMiniLML12V2Q)
            .with_show_download_progress(false);
        TextEmbedding::try_new(options)
            .map(|model| Self(Mutex::new(model)))
            .map_err(|e| EmbedError::Model(e.to_string()))
    }
}

impl Embedder for LocalModel {
    fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
        let mut model = self.0.lock().unwrap_or_else(|p| p.into_inner());
        model
            .embed(texts, Some(BATCH.get()))
            .map(|vectors| vectors.into_iter().map(normalized).collect())
            .map_err(|e| EmbedError::Model(e.to_string()))
    }

    fn thresholds(&self) -> Thresholds {
        Thresholds {
            target: 0.45,
            margin: 0.05,
            relevance: 0.40,
        }
    }
}

pub struct Model {
    embedder: Arc<dyn Embedder>,
    turn: Arc<tokio::sync::Mutex<()>>,
}

impl Model {
    pub fn new(embedder: Arc<dyn Embedder>) -> Self {
        Self {
            embedder,
            turn: Arc::default(),
        }
    }

    pub fn thresholds(&self) -> Thresholds {
        self.embedder.thresholds()
    }

    pub async fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
        let mut vectors = Vec::with_capacity(texts.len());
        for batch in texts.chunks(BATCH.get()) {
            vectors.extend(self.embed_batch(batch.to_vec()).await?);
        }
        Ok(vectors)
    }

    async fn embed_batch(&self, batch: Vec<String>) -> Result<Vec<Vector>, EmbedError> {
        let turn = Arc::clone(&self.turn).lock_owned().await;
        let embedder = Arc::clone(&self.embedder);
        tokio::task::spawn_blocking(move || {
            let _turn = turn;
            embedder.embed(&batch)
        })
        .await?
    }
}

pub fn normalized(mut vector: Vector) -> Vector {
    let norm = vector.iter().map(|x| x * x).sum::<f32>().sqrt();
    if norm > 0.0 {
        vector.iter_mut().for_each(|x| *x /= norm);
    }
    vector
}

pub fn similarity(a: &[f32], b: &[f32]) -> f32 {
    a.iter().zip(b).map(|(x, y)| x * y).sum()
}

#[cfg(test)]
pub mod fake {
    use std::hash::{DefaultHasher, Hash, Hasher};

    use super::*;
    use crate::lexical;

    pub struct Words;

    pub const THRESHOLDS: Thresholds = Thresholds {
        target: 0.3,
        margin: 0.05,
        relevance: 0.2,
    };

    impl Embedder for Words {
        fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
            Ok(texts.iter().map(|t| bag_of_words(t)).collect())
        }

        fn thresholds(&self) -> Thresholds {
            THRESHOLDS
        }
    }

    fn bag_of_words(text: &str) -> Vector {
        let mut vector = vec![0.0; 4096];
        for word in lexical::normalize(text).split(' ').filter(|w| w.len() > 2) {
            let mut hasher = DefaultHasher::new();
            word.hash(&mut hasher);
            vector[(hasher.finish() % 4096) as usize] += 1.0;
        }
        normalized(vector)
    }

    pub struct Broken;

    impl Embedder for Broken {
        fn embed(&self, _: &[String]) -> Result<Vec<Vector>, EmbedError> {
            Err(EmbedError::Model("model not loaded".into()))
        }

        fn thresholds(&self) -> Thresholds {
            THRESHOLDS
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn normalized_vectors_have_unit_similarity_with_themselves() {
        let v = normalized(vec![3.0, 4.0]);
        assert!((similarity(&v, &v) - 1.0).abs() < 1e-6);
        assert!((v[0] - 0.6).abs() < 1e-6);
    }

    #[test]
    fn a_zero_vector_stays_zero_instead_of_dividing_by_zero() {
        assert_eq!(normalized(vec![0.0, 0.0]), vec![0.0, 0.0]);
    }

    fn texts(count: usize) -> Vec<String> {
        (0..count).map(|i| format!("tool number {i}")).collect()
    }

    #[derive(Default)]
    struct Recording(Mutex<Vec<usize>>);

    impl Embedder for Recording {
        fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
            self.0.lock().unwrap().push(texts.len());
            fake::Words.embed(texts)
        }

        fn thresholds(&self) -> Thresholds {
            fake::THRESHOLDS
        }
    }

    #[tokio::test]
    async fn the_model_is_fed_in_batches_and_answers_what_one_call_would_have() {
        let recording = Arc::new(Recording::default());
        let texts = texts(2 * BATCH.get() + 3);
        let vectors = Model::new(recording.clone()).embed(&texts).await.unwrap();
        assert_eq!(vectors, fake::Words.embed(&texts).unwrap());
        assert_eq!(
            *recording.0.lock().unwrap(),
            vec![BATCH.get(), BATCH.get(), 3]
        );
    }

    #[tokio::test]
    async fn an_empty_input_never_reaches_the_model() {
        let recording = Arc::new(Recording::default());
        let vectors = Model::new(recording.clone()).embed(&[]).await.unwrap();
        assert!(vectors.is_empty());
        assert!(recording.0.lock().unwrap().is_empty());
    }

    #[tokio::test]
    async fn a_failing_batch_fails_the_whole_call() {
        assert!(
            Model::new(Arc::new(fake::Broken))
                .embed(&texts(7))
                .await
                .is_err()
        );
    }
}
