-- A published item can be attached to one learner module.  Keeping this on the
-- canonical content row means every locale resolves to the same lesson/article.
ALTER TABLE content_items ADD COLUMN module_id TEXT
  CHECK (module_id IN ('module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'));

CREATE INDEX IF NOT EXISTS idx_content_module_publication
  ON content_items (module_id, status, published_at);
