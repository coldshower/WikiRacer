'use strict';

const request = require('request-promise');
const { matchWikiUrls, getUrlsFromMatch } = require('./utils.js');


function makeRequest(wikiObj) {
	return request(wikiPath + wikiObj.link)
	.then(htmlString => {
		let urlArray = getUrlsFromMatch(matchWikiUrls(htmlString));

		urlArray = urlArray
			.filter(elem => !visited[elem])
			.map(elem => {
				visited[elem] = true;
				return {
					link: elem,
					path: wikiObj.path + ' ' + elem
				};
			});
		
		for (let i = 0; i < urlArray.length; i++) {
			if (urlArray[i].link === destination) {
				return urlArray[i].path;
			}
		}

		queue.shift();
		queue = queue.concat(urlArray);
		return findPath();
	});
}

function findPath() {
	console.log(queue[0], queue.length)
	if (queue[0] === destination) {
		return queue[0].path;
	}
	if (queue[0]) {
		visited[queue[0].link] = true;
	} 
	makeRequest(queue[0])
	.then(res => {
		if (res) {
			console.log(Date.now() - timeStart);
			console.log(res);
		}
		return null;
	})
	.catch(console.error);
}

const wikiPath = 'https://en.wikipedia.org';
const start = '/wiki/Teucrium_canadense';
const destination = '/wiki/Deserts_and_xeric_shrublands';

let queue = [{
	link: start,
	path: start
}];

const visited = {}; // cache links already traveled
const timeStart = Date.now();

findPath(start, destination);


