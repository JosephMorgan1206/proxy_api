
const { default: axios } = require("axios");
const express = require("express");
require('dotenv').config()


const port = 5000;


const app = express();
const https = require('https')

app.listen(process.env.PORT || port, () => {
	console.log(`App start on port ${port}`);
});

app.get('/api/v1/klines', async function (req, res) {
	const result = await axios.get(`https://pro.apex.exchange/api/v1/klines?end=${req.query.end}&interval=${req.query.interval}&start=${req.query.start}&symbol=${req.query.symbol}`);
	console.log('debug', result.data.data[req.query.symbol])
	res.set({ 'Content-Type': 'text/event-stream', 'access-control-allow-origin': '*' })
	res.status(200).send(result.data.data[req.query.symbol])

	// var options = {
	// 	hostname: 'pro.apex.exchange',
	// 	path: '/api/v1/klines?start=' + req.query.start + '&end=' + req.query.end + '&interval=' + req.query.inerval + '&symbol=' + req.query.symbol,
	// };

	// callback = function (response) {
	// 	var str = '';
	// 	response.on('data', function (chunk) {
	// 		str += chunk;
	// 	});

	// 	response.on('end', function () {
	// 		res.set({ 'Content-Type': 'text/event-stream', 'access-control-allow-origin': '*' })
	// 		res.send(JSON.parse(str))
	// 	});
	// }

	// https.request(options, callback).end();
})
