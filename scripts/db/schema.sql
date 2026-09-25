CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS tool_facts (
  time timestamptz NOT NULL,
  slug text NOT NULL,
  stars integer NOT NULL,
  forks integer NOT NULL,
  open_issues integer NULL,
  pushed_at timestamptz NULL,
  release_tag text NULL,
  release_published_at timestamptz NULL,
  signed boolean NULL,
  PRIMARY KEY (slug, time)
);

SELECT create_hypertable('tool_facts', by_range('time'), if_not_exists => TRUE);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM timescaledb_information.hypertables
    WHERE hypertable_name = 'tool_facts' AND compression_enabled
  ) THEN
    ALTER TABLE tool_facts SET (timescaledb.compress, timescaledb.compress_segmentby = 'slug', timescaledb.compress_orderby = 'time DESC');
  END IF;
END
$$;

SELECT add_compression_policy('tool_facts', compress_after => INTERVAL '30 days', if_not_exists => TRUE);

CREATE MATERIALIZED VIEW IF NOT EXISTS tool_facts_daily
WITH (timescaledb.continuous, timescaledb.materialized_only = false) AS
SELECT
  time_bucket(INTERVAL '1 day', time) AS day,
  slug,
  last(stars, time) AS stars,
  last(forks, time) AS forks,
  last(open_issues, time) AS open_issues,
  last(pushed_at, time) AS pushed_at,
  last(release_tag, time) AS release_tag,
  last(release_published_at, time) AS release_published_at,
  last(signed, time) AS signed
FROM tool_facts
GROUP BY day, slug
WITH NO DATA;

SELECT add_continuous_aggregate_policy('tool_facts_daily',
  start_offset => INTERVAL '3 days',
  end_offset => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour',
  if_not_exists => TRUE);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'awesome_alternatives_api') THEN
    GRANT SELECT ON tool_facts_daily TO awesome_alternatives_api;
  END IF;
END
$$;
