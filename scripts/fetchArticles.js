const axios = require('axios');
const { htmlToText } = require('html-to-text');
require('dotenv').config();

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;

async function fetchArticles(targetCount = 100) {
    let allArticles = [];
    let page = 1;
    const pageSize = 50; // max per API request

    while (allArticles.length < targetCount) {
        const res = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'show-fields': 'body', 
                'page-size': pageSize,
                'page': page,
                'order-by': 'newest'
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

        if (res.data.response.pages < page) break;

        console.log(`Fetched ${allArticles.length} articles so far...`);
    }

    return allArticles.slice(0, targetCount);
}

module.exports = fetchArticles;
