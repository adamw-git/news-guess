const fetchArticles = require('./fetchArticles');
const db = require('./db');
const fs = require('fs');

async function main() {
    try {
        // 1. Fetch articles from Guardian API
        const articles = await fetchArticles();

        // 2. Insert into SQLite database
        const insert = db.prepare(`
            INSERT OR IGNORE INTO articles (title, section, publication_date, url, body)
            VALUES (@title, @section, @publication_date, @url, @body)
        `);

        const insertMany = db.transaction((articles) => {
            for (const article of articles) insert.run(article);
        });

        insertMany(articles);
        console.log('Saved 100 articles to SQLite database "articles.db"');

        // 3. Export all articles from DB to JSON
        const allArticles = db.prepare('SELECT * FROM articles').all();
        fs.writeFileSync('articles.json', JSON.stringify(allArticles, null, 2));
        console.log('Exported articles to "articles.json"');

    } catch (err) {
        console.error(err);
    }
}

main();
