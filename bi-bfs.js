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
	for (let i = 0; i < startQueue.length; i++) {
		let { currLink, currPath } = startQueue[i];

		if (centralTerminal[currLink]) {
			if (centralTerminal[currLink].pathToEnd) {
				return currPath + ' ' + centralTerminal[currLink].pathToEnd;
			}
		} else {
			centralTerminal[currLink] = {
				link: currLink,
				path: currPath
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
				path: currPath
			}
		}
	}

	makeRequest(startQueue[0], destQueue[0]);
}


