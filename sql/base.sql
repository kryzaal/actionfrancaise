CREATE TABLE IF NOT EXISTS parameters (
	key TEXT PRIMARY KEY,
	value TEXT
);

INSERT OR IGNORE INTO parameters (key, value) VALUES ('version', '0');