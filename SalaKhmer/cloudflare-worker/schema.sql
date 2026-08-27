CREATE TABLE IF NOT EXISTS content_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('lesson', 'article')),
  module_id TEXT CHECK (module_id IN ('module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  body_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  publish_at TEXT,
  published_at TEXT,
  cover_media_key TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_publication
  ON content_items (status, publish_at, published_at);

CREATE INDEX IF NOT EXISTS idx_content_module_publication
  ON content_items (module_id, status, published_at);

CREATE TABLE IF NOT EXISTS media_items (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  media_type TEXT NOT NULL CHECK (media_type IN ('audio', 'image', 'video', 'document')),
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes INTEGER,
  alt_text TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_type ON media_items (media_type, created_at);

-- One translation per content item and interface locale. English remains the
-- canonical fallback stored in content_items for backwards compatibility.
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
