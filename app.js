'use strict';

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

function makeRequest(wikiObj) {
	return request(wikiPath + wikiObj.link)
	.then(htmlString => {
		let urlArray = getUrlsFromMatch(matchWikiUrls(htmlString));
		queue = queue.concat(
			urlArray
			.filter(elem => {
				return !visited[elem];
			})
			.map(elem => {
				return {
					link: elem,
					path: wikiObj.path + ' ' + elem
				}
			})
		);
		queue.shift();
		for (var i = 0; i < queue.length; i++) {
			if (queue[i].link === destination) {
				return queue[i].path;
			}
		}
		return findPath();
	});
}

function findPath() {
	if (queue[0] === destination) {
		return queue[0].path;
	}
	if (queue[0]) {
		visited[queue[0].link] = true;
	} 
	makeRequest(queue[0])
	.then(res => {
		console.log(res);
	})
	.catch(console.error);
}

// testing path = keyboard_cat -> danish pastry -> puff_pastry -> olive_oil

const wikiPath = 'https://en.wikipedia.org';
const start = '/wiki/Pastry';
const destination = '/wiki/Olive_oil';

let queue = [{
	link: start,
	path: start
}];

const visited = {}; // cache links already traveled

findPath(start, destination);


