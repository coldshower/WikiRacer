'use strict';

const request = require('request-promise');
const Bluebird = require('bluebird');

const { matchWikiUrls, getUrlsFromMatch } = require('./utils.js');

function makeRequest(wiki1, wiki2) {
	const request1 = request(wikiPath + wiki1.link);
	const request2 = request(wikiPath + wiki2.link);

	return Bluebird.all([request1, request2])
	.spread((html1, html2) => {
		let urlArray1 = getUrlsFromMatch(matchWikiUrls(html1));
		let urlArray2 = getUrlsFromMatch(matchWikiUrls(html2));

		const mappedUrls1 = [];

		for (let i = 0; i < urlArray1.length; i++) {
			let centralTerminalEntry = centralTerminal[urlArray1[i]];

			if (centralTerminalEntry) {
				if (centralTerminalEntry.pathToEnd) {
					return wiki1.pathFromStart + ' ' + urlArray1[i] + ' ' + centralTerminalEntry.pathToEnd;
				}
			} else {
				let wikiObj = {
					link: urlArray1[i],
					pathFromStart: wiki1.pathFromStart + ' ' + urlArray1[i]
				};
				centralTerminal[urlArray1[i]] = wikiObj;
				mappedUrls1.push(wikiObj);
			}

		}
		
		const mappedUrls2 = [];

		for (let i = 0; i < urlArray2.length; i++) {
			let centralTerminalEntry = centralTerminal[urlArray2[i]];

			if (centralTerminalEntry) {
				if (centralTerminalEntry.pathFromStart) {
					return centralTerminalEntry.pathFromStart + ' ' + urlArray2[i] + ' ' + wiki2.pathToEnd;
				}
			} else {
				let wikiObj = {
					link: urlArray2[i],
					pathToEnd: urlArray2[i] + ' ' + wiki2.pathToEnd
				};
				centralTerminal[urlArray2[i]] = wikiObj;
				mappedUrls2.push(wikiObj);
			}
		}

		startQueue.shift();
		destQueue.shift();

		startQueue = startQueue.concat(mappedUrls1);
		destQueue = destQueue.concat(mappedUrls2);

		return findPath();
	});
}

function findPath() {
	if (startQueue[0].link === destQueue[0].link) {
		return startQueue[0].pathFromStart + ' ' +  destQueue[0].pathToEnd;
	}
	console.log(centralTerminal);
	return makeRequest(startQueue[0], destQueue[0])
	.then(res => {
		if (res) {
			console.log(res);
		}
		return null;
	});
	
}

const wikiPath = 'https://en.wikipedia.org';
const start = '/wiki/Teucrium_canadense';
const destination = '/wiki/Deserts_and_xeric_shrublands';

const centralTerminal = {};

let startQueue = [{
	link: start,
	pathFromStart: start
}];

let destQueue = [{
	link: destination,
	pathToEnd: destination
}];

findPath();

