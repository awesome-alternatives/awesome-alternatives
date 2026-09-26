use schemars::JsonSchema;
use serde::Deserialize;

const DEFAULT_LIMIT: usize = 50;
const MAX_LIMIT: usize = 200;

#[derive(Debug, Deserialize, JsonSchema)]
pub struct Window {
    #[schemars(
        description = "How many results to return: 50 by default, 200 at most, larger values are clamped. 0 answers only the count."
    )]
    pub limit: Option<usize>,
    #[schemars(description = "How many matching results to skip, for the next page.")]
    pub offset: Option<usize>,
}

impl Window {
    pub fn bounds(&self) -> (usize, usize) {
        (
            self.limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT),
            self.offset.unwrap_or(0),
        )
    }

    pub fn cut<T>(&self, items: impl IntoIterator<Item = T>) -> Vec<T> {
        let (limit, offset) = self.bounds();
        items.into_iter().skip(offset).take(limit).collect()
    }
}
