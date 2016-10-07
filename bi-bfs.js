'use strict';

const request = require('request-promise');
const { matchWikiUrls, testForWikiArticlePage, getUrlsFromMatch } = require('./utils.js');

const wikiPath = 'https://en.wikipedia.org';
const start = '/wiki/Pastry';
const destination = '/wiki/Olive_oil';

const centralTerminal = {};

const startQueue = [{
	link: start,
	path: start
}];

const destQueue = [{
	link: destination,
	path: destination
}];

function objLength(obj) {
	return Object.keys(obj).length;
}

function sortObjByLength(obj1, obj2) {
	return objLength(obj1) > objLength(obj2) ? [obj1, obj2] : [obj2, obj1];
}

function findPath() {
	if (startQueue[0].link === destQueue[0].link) {
		return startQueue.path + destQueue.path;
	}

	for (let i = 0; i < startQueue.length; i++) {
		let { currLink, currPath } = startQueue[i];

		if (centralTerminal[currLink]) {
			if (centralTerminal[currLink].pathToEnd) {
				return currPath + ' ' + centralTerminal[currLink].pathToEnd;
			}
		} else {
			centralTerminal[currLink] = {
				link: currLink,
				startPath: currPath
			}
		}
	}

	for (let i = 0; i < destQueue.length; i++) {
		let { currLink, currPath } = destQueue[i];

		if (centralTerminal[currLink]) {
			if (centralTerminal[currLink].pathFromStart) {
				return centralTerminal[currLink].pathFromStart + ' ' + currPath;
			}
		} else {
			centralTerminal[currLink] = {
				link: currLink,
				endPath: currPath
			}
		}
	}

	makeRequest(startQueue[0], destQueue[0]);
}

function makeRequest(wiki1, wiki2) {
	request(wikiPath + wiki1.link)
	.then(htmlString => {
		let urlArray = getUrlsFromMatch(matchWikiUrls(htmlString));
		urlArray = urlArray
			.filter(elem => !centralTerminal[elem][startPath].startPath)
			.map(elem => {
				let wikiObj = {
					link: elem,
					startPath: wikiObj.path + ' ' + elem
				};
				centralTerminal[elem] = wikiObj;
				return wikiObj;
			});
	})
}


