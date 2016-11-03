const https = require('https');
const Promise = require('bluebird');

const promisifiedRequest = {};

promisifiedRequest.get = Promise.method(url => {
	return new Promise((resolve, reject) => {
		function makeGetRequest(url) {
			var req = https.get(url, res => {
				let rawHtml = '';

				res.on('data', chunk => {
					rawHtml += chunk;
				});

				res.on('end', () => {
					if (res.statusCode === 301) { // if there is a redirect
						makeGetRequest(res.headers.location);
					} else {
						resolve(rawHtml);
					}
				});
			});

			req.on('error', e => {
				reject(e);
			});

			req.end();
		}

		makeGetRequest(url);
	});
});

promisifiedRequest.get('https://wikipedia.org/wiki/Keyboard_Cat')
.then(res => {
	console.log(res);
})
.catch(console.error); 


