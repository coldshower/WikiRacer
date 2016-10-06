module.exports = {
	matchWikiUrls: function (html) {
		return html.match(/href="(\/wiki\/[^"]+)/gi);
	},

	testForWikiArticlePage: function (url) {
		return url.indexOf('File:') === -1 && url.indexOf('Wikipedia:') === -1;
	},

	getUrlsFromMatch: function (match) {
		return match.map(str => {
			return str.slice(6);
		})
		.filter(str => {
			return testForWikiArticlePage(str);
		});
	}
}