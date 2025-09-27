const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Database file path
const dbPath = path.join(dataDir, 'articles.db');
const db = new Database(dbPath);

// Create articles table if it doesn't already exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    section TEXT,
    publication_date TEXT,
    url TEXT UNIQUE,
    body TEXT
  )
`).run();


module.exports = db;
