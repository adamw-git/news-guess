const axios = require('axios');
const { htmlToText } = require('html-to-text');
require('dotenv').config();

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const PAGE_SIZE = 50; // max per request

async function fetchArticles() {
    let allArticles = [];
    let page = 1;

    try {
        while (allArticles.length < 100) {
            const res = await axios.get('https://content.guardianapis.com/search', {
                params: {
                    'api-key': GUARDIAN_API_KEY,
                    'show-fields': 'body',
                    'page-size': PAGE_SIZE,
                    'page': page
                }
            });

            const results = res.data.response.results.map(article => ({
                title: article.webTitle,
                section: article.sectionName,
                publication_date: article.webPublicationDate,
                url: article.webUrl,
                body: article.fields?.body
                    ? htmlToText(article.fields.body, { wordwrap: false })
                    : ''
            }));

            allArticles = allArticles.concat(results);
            page++;

            if (res.data.response.pages < page) break; // stop if no more pages
        }

        // Return exactly 100 articles
        return allArticles.slice(0, 100);

    } catch (err) {
        console.error('Error fetching articles:', err.message);
        return [];
    }
}

module.exports = fetchArticles;
