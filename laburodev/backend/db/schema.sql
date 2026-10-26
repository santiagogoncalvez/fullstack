CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  level TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT NOT NULL, -- JSON string
  requirements TEXT NOT NULL,     -- JSON string
  about TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_jobs_level ON jobs(level);
CREATE INDEX IF NOT EXISTS idx_jobs_title ON jobs(title);
