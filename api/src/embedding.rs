use std::sync::Mutex;

use fastembed::{EmbeddingModel, TextEmbedding, TextInitOptions};

pub type Vector = Vec<f32>;

#[derive(Debug, thiserror::Error)]
#[error("embedding failed: {0}")]
pub struct EmbedError(String);

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
        let options =
            TextInitOptions::new(EmbeddingModel::BGESmallENV15Q).with_show_download_progress(false);
        TextEmbedding::try_new(options)
            .map(|model| Self(Mutex::new(model)))
            .map_err(|e| EmbedError(e.to_string()))
    }
}

impl Embedder for LocalModel {
    fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
        self.0
            .lock()
            .unwrap_or_else(|p| p.into_inner())
            .embed(texts, None)
            .map(|vectors| vectors.into_iter().map(normalized).collect())
            .map_err(|e| EmbedError(e.to_string()))
    }

    fn thresholds(&self) -> Thresholds {
        Thresholds {
            target: 0.75,
            margin: 0.02,
            relevance: 0.73,
        }
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
            Err(EmbedError("model not loaded".into()))
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
}
