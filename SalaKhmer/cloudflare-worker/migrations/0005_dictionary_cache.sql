-- Translator-backed dictionary cache. Entries are generated only after a learner
-- requests a Khmer word, then retained in D1 so later lookups avoid Azure.
CREATE TABLE IF NOT EXISTS dictionary_entries (
  query_normalized TEXT PRIMARY KEY,
  source_text TEXT NOT NULL,
  source_language TEXT NOT NULL DEFAULT 'km',
  translations_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'machine_draft' CHECK (status IN ('machine_draft','reviewed','blocked')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_used_at TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_dictionary_last_used ON dictionary_entries(last_used_at DESC);

-- A dictionary pronunciation is only created after a learner presses the speaker.
-- One stable R2 object is reused by every later learner.
CREATE TABLE IF NOT EXISTS dictionary_audio (
  query_normalized TEXT PRIMARY KEY REFERENCES dictionary_entries(query_normalized) ON DELETE CASCADE,
  object_key TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','ready','failed','blocked')),
  voice_name TEXT NOT NULL DEFAULT 'km-KH-SreymomNeural',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_used_at TEXT,
  hit_count INTEGER NOT NULL DEFAULT 0
);

-- Small fixed-window guard against users/bots continuously creating new remote
-- translations or MP3s. Cache hits do not consume this allowance.
CREATE TABLE IF NOT EXISTS dictionary_rate_limits (
  subject TEXT NOT NULL,
  window_start TEXT NOT NULL,
  translation_misses INTEGER NOT NULL DEFAULT 0,
  audio_misses INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (subject, window_start)
);

-- Per-user guard for the optional Workers AI assistant. This prevents a single
-- account from exhausting the shared daily Workers AI allowance.
CREATE TABLE IF NOT EXISTS assistant_rate_limits (
  subject TEXT NOT NULL,
  window_start TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (subject, window_start)
);
