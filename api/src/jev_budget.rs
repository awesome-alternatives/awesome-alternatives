use std::num::NonZeroU32;
use std::sync::{Mutex, PoisonError};
use std::time::{SystemTime, UNIX_EPOCH};

use governor::{DefaultDirectRateLimiter, Quota, RateLimiter};

use crate::jev::JevClient;

const SECS_PER_DAY: u64 = 86_400;

#[derive(Debug, Clone, Copy)]
pub struct Limits {
    pub per_minute: NonZeroU32,
    pub per_day: u32,
}

pub struct MeteredJev {
    client: JevClient,
    budget: Budget,
}

impl MeteredJev {
    pub fn new(client: JevClient, limits: Limits) -> Self {
        Self {
            client,
            budget: Budget::new(limits),
        }
    }

    pub fn admitted(&self) -> Option<&JevClient> {
        self.budget
            .admit_at(SystemTime::now())
            .then_some(&self.client)
    }
}

struct Budget {
    per_minute: DefaultDirectRateLimiter,
    per_day: u32,
    spent: Mutex<Spent>,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
struct Day(u64);

impl Day {
    fn of(now: SystemTime) -> Self {
        Self(
            now.duration_since(UNIX_EPOCH)
                .map_or(0, |since| since.as_secs() / SECS_PER_DAY),
        )
    }
}

#[derive(Default)]
struct Spent {
    day: Day,
    calls: u32,
}

impl Budget {
    fn new(limits: Limits) -> Self {
        Self {
            per_minute: RateLimiter::direct(Quota::per_minute(limits.per_minute)),
            per_day: limits.per_day,
            spent: Mutex::default(),
        }
    }

    fn admit_at(&self, now: SystemTime) -> bool {
        if self.per_minute.check().is_err() {
            tracing::debug!("process-wide Jev quota reached, searching locally");
            return false;
        }
        match self.take(Day::of(now)) {
            Some(0) => {
                tracing::warn!(
                    per_day = self.per_day,
                    "daily Jev budget spent, search runs locally until midnight UTC"
                );
                true
            }
            Some(_) => true,
            None => false,
        }
    }

    fn take(&self, today: Day) -> Option<u32> {
        let mut spent = self.spent.lock().unwrap_or_else(PoisonError::into_inner);
        if spent.day != today {
            *spent = Spent {
                day: today,
                calls: 0,
            };
        }
        let left = self.per_day.checked_sub(spent.calls)?.checked_sub(1)?;
        spent.calls += 1;
        Some(left)
    }
}

#[cfg(test)]
mod tests {
    use std::time::Duration;

    use super::*;

    const PLENTY: NonZeroU32 = NonZeroU32::new(1_000).expect("not zero");

    fn at(secs: u64) -> SystemTime {
        UNIX_EPOCH + Duration::from_secs(secs)
    }

    fn budget(per_minute: NonZeroU32, per_day: u32) -> Budget {
        Budget::new(Limits {
            per_minute,
            per_day,
        })
    }

    #[test]
    fn the_daily_budget_refuses_past_its_limit_and_resets_at_midnight_utc() {
        let budget = budget(PLENTY, 2);
        let last_second = at(20_000 * SECS_PER_DAY - 1);
        assert!(budget.admit_at(at(19_999 * SECS_PER_DAY)));
        assert!(budget.admit_at(last_second));
        assert!(!budget.admit_at(last_second));
        assert!(budget.admit_at(at(20_000 * SECS_PER_DAY)));
        assert!(budget.admit_at(at(20_000 * SECS_PER_DAY + 3_600)));
        assert!(!budget.admit_at(at(20_000 * SECS_PER_DAY + 7_200)));
    }

    #[test]
    fn a_zero_daily_budget_never_admits_a_call() {
        let budget = budget(PLENTY, 0);
        assert!(!budget.admit_at(at(0)));
        assert!(!budget.admit_at(at(5 * SECS_PER_DAY)));
    }

    #[test]
    fn a_call_refused_by_the_minute_quota_does_not_spend_the_daily_budget() {
        let budget = budget(NonZeroU32::MIN, 2);
        let now = at(SECS_PER_DAY);
        assert!(budget.admit_at(now));
        assert!(!budget.admit_at(now));
        assert!(!budget.admit_at(now));
        assert_eq!(budget.take(Day::of(now)), Some(0));
    }
}
