const Database = require('better-sqlite3');

const db = new Database('articles.db');

// Create table with UNIQUE constraint on the URL
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
