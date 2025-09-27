const fetchArticles = require('./fetchArticles');
const fs = require('fs');

async function main() {
    try {
        const articles = await fetchArticles();

        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
        console.log('Saved 100 full-text articles to articles.json');
    } catch (err) {
        console.error(err);
    }
}

main();
