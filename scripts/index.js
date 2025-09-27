const fetchArticles = require('./fetchArticles');
const db = require('../db'); // db.js is one level up
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const articles = await fetchArticles();

        const insert = db.prepare(`
            INSERT OR IGNORE INTO articles (title, section, publication_date, url, body)
            VALUES (@title, @section, @publication_date, @url, @body)
        `);

        const insertMany = db.transaction((articles) => {
            for (const article of articles) insert.run(article);
        });

        insertMany(articles);
        console.log('Inserted new articles (duplicates ignored)');

        // JSON output inside data/
        const jsonPath = path.join(__dirname, '..', 'data', 'articles.json');
        const allArticles = db.prepare('SELECT * FROM articles').all();
        fs.writeFileSync(jsonPath, JSON.stringify(allArticles, null, 2));
        console.log(`Exported all articles to ${jsonPath}`);

    } catch (err) {
        console.error(err);
    }
}

main();
