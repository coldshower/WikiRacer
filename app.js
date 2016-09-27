const https = require('https');
const cheerio = require('cheerio');
const request = require('request');

// request('http://wikipedia.org/wiki/lambda', (err, res, html) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	if (res.statusCode === 200) {
// 		console.log(html);
// 	}
// });

const options = {
	hostname: 'en.wikipedia.org',
	path: '/wiki/Pastry'
};

var req = https.request(options, res => {
	let str = '';
	console.log(res.statusCode);
	res.on('data', chunk => {
		str += chunk;
	});

	res.on('end', () => {
		console.log(str);
	});
});


req.on('error', e => {
	console.log('problem with request: ' + e.message);
});

req.end();