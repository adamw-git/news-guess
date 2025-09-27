const axios = require('axios');
const { htmlToText } = require('html-to-text');
const cheerio = require('cheerio');
require('dotenv').config();

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const PAGE_SIZE = 50;

// Helper to scrape full text from Guardian article page
async function scrapeFullArticle(url) {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        // Guardian article text is in div with class 'article-body-commercial-selector' or 'article-body-viewer-selector'
        const paragraphs = $('.article-body-commercial-selector p, .article-body-viewer-selector p');

        const text = paragraphs
            .map((i, el) => $(el).text())
            .get()
            .join('\n');

        return text;
    } catch (err) {
        console.error(`Failed to scrape ${url}: ${err.message}`);
        return '';
    }
}

async function fetchArticles() {
    let allArticles = [];
    let page = 1;

    while (allArticles.length < 100) {
        const res = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'show-fields': 'body',
                'page-size': PAGE_SIZE,
                'page': page
            }
        });

        for (const article of res.data.response.results) {
            // Scrape full text from the web page
            const fullText = await scrapeFullArticle(article.webUrl);

            allArticles.push({
                title: article.webTitle,
                section: article.sectionName,
                publication_date: article.webPublicationDate,
                url: article.webUrl,
                body: fullText || '' // fallback to empty if scraping failed
            });

            if (allArticles.length >= 100) break;
        }

        page++;
        if (res.data.response.pages < page) break;
    }

    return allArticles.slice(0, 100);
}

module.exports = fetchArticles;
