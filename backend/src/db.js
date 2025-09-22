const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', 'data', 'cexcash.db');
const dataDir = path.dirname(dbPath);

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS referral_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    reward_rate REAL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS referral_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referral_code_id INTEGER NOT NULL,
    referred_email TEXT,
    trading_volume REAL DEFAULT 0.0,
    reward_amount REAL DEFAULT 0.0,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referral_code_id) REFERENCES referral_codes(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS page_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    section_key TEXT NOT NULL,
    heading TEXT,
    subheading TEXT,
    body TEXT,
    media TEXT,
    ctas TEXT,
    position INTEGER DEFAULT 0,
    UNIQUE(slug, section_key)
  );
`);

module.exports = db;
