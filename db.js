const path = require('path');
const Database = require('better-sqlite3');

// Put the database into the data folder
const dbPath = path.join(__dirname, 'data', 'articles.db');
const db = new Database(dbPath);

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
