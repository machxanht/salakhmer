CREATE TABLE IF NOT EXISTS content_localizations (
  content_id TEXT NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'vi', 'zh', 'fr')),
  title TEXT NOT NULL,
  summary TEXT,
  body_json TEXT NOT NULL DEFAULT '{}',
  updated_by TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (content_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_content_localizations_locale
  ON content_localizations(locale, content_id);
