'use strict';

const https = require('https');
const cheerio = require('cheerio');
const request = require('request-promise');

function matchWikiUrls(html) {
	return html.match(/href="(\/wiki\/[^"]+)/gi);
}
 
function testForWikiArticlePage(str) {
	return str.indexOf('File:') === -1 && str.indexOf('Wikipedia:') === -1;
}

function getUrlsFromMatch(match) {
	return match.map(str => {
		return str.slice(6);
	})
	.filter(str => {
		return testForWikiArticlePage(str);
	});
}

function depthFirstSearch(urlArray, current, destination) {
	if (current === destination) {
		return Promise.resolve(current);
	} else {
		for (var i = 0; i < urlArray.length; i++) {
			request('https://en.wikipedia.org' + urlArray[i])
		}
	}
}

function makeRequest(wikiPage) {
	request(wikiPath + wikiPage)
	.then(htmlString => {
		let urlArray = getUrlsFromMatch(matchWikiUrls(htmlString))

	})
	.catch(console.error);
}

// testing path = pastry -> danish pastry -> puff_pastry -> olive_oil

const wikiPath = 'https://en.wikipedia.org';
const start = '/wiki/Pastry';
const destination = '/wiki/Olive_oil';

makeRequest(start);


