
const express = require("express");
require('dotenv').config()


const port = 3000;


const app = express();
const https = require('https')

app.listen(process.env.PORT || 3000, () => {
	console.log(`App start on port ${port}`);
});

app.get('/api/v1/klines', async function (req, res) {

	var options = {
		hostname: 'pro.apex.exchange',
		path: '/api/v1/klines?start=' + req.query.start + '&end=' + req.query.end + '&interval=' + req.query.inerval + '&symbol=' + req.query.symbol,
	};

	callback = function (response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			res.set({ 'Content-Type': 'text/event-stream', 'access-control-allow-origin': '*' })
			res.send(JSON.parse(str))
		});
	}

	https.request(options, callback).end();
})
