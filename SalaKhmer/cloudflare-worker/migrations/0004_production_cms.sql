-- Production CMS structure.  These rows are intentionally generic: a module can
-- contain units, lessons and nested learning items without a Worker code change.
CREATE TABLE IF NOT EXISTS cms_nodes (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL CHECK (module_id IN ('module_1','module_2','module_3','module_4','module_5','module_6')),
  parent_id TEXT REFERENCES cms_nodes(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL CHECK (node_type IN ('unit','lesson','sub_item')),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  unlock_requirement_json TEXT NOT NULL DEFAULT '{}',
  content_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cms_nodes_tree ON cms_nodes(module_id, parent_id, order_index);

-- Versioned handwriting guidance.  paths_json is an ordered JSON array of SVG
-- path records.  It is stored separately from the font/glyph asset on purpose.
CREATE TABLE IF NOT EXISTS stroke_guides (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL CHECK (module_id IN ('module_1','module_4')),
  character TEXT NOT NULL,
  view_box TEXT NOT NULL DEFAULT '0 0 320 320',
  paths_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','reviewed','published')),
  updated_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(module_id, character)
);

-- Every playable item is an explicit record, so approved audio never silently
-- regenerates.  The R2 object stays private and is served by the Worker.
CREATE TABLE IF NOT EXISTS audio_items (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL CHECK (module_id IN ('module_2','module_3','module_5')),
  node_id TEXT REFERENCES cms_nodes(id) ON DELETE SET NULL,
  content_key TEXT NOT NULL UNIQUE,
  khmer_text TEXT NOT NULL,
  romanization TEXT,
  source_type TEXT NOT NULL DEFAULT 'azure_tts' CHECK (source_type IN ('static_r2','azure_tts','custom_native')),
  object_key TEXT,
  voice_settings_json TEXT NOT NULL DEFAULT '{}',
  is_approved INTEGER NOT NULL DEFAULT 0 CHECK (is_approved IN (0,1)),
  approved_by TEXT,
  approved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audio_items_module ON audio_items(module_id, is_approved, updated_at);
