use std::time::Duration;

use moka::future::Cache;

pub trait Weight {
    fn bytes(&self) -> usize;
}

pub fn cache<V>(max_bytes: u64, ttl: Duration) -> Cache<String, V>
where
    V: Weight + Clone + Send + Sync + 'static,
{
    Cache::builder()
        .max_capacity(max_bytes)
        .weigher(|key: &String, value: &V| {
            u32::try_from(size_of::<String>() + key.len() + value.bytes()).unwrap_or(u32::MAX)
        })
        .time_to_live(ttl)
        .build()
}
