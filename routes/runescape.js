const runescape = require('express').Router();
const request = require('request-promise');
const url = 'http://services.runescape.com/m=itemdb_oldschool';
const detail = url + '/api/catalogue/detail.json?item=';
const graph = url + '/api/graph/';
const stats = require('stats-lite');
const rSItems = require('../rs_items.json');

runescape.post('/item', async (req, res) => {
	try {
		//console.log(rSItems);
		var itemID = req.body.itemID;
		console.log(itemID);

		var detailsURL = detail + itemID;
		console.log(detailsURL);
		var graphURL = graph + itemID + '.json';
		console.log(graphURL);


		var rSItemDetails;
		var rSItemGraph;
		var rSItemGraphDaily;
		var rSItemGraphAverage;

		await request(detailsURL)
		.then(async res => {
			rSItemDetails = res;
			rsItemDetails = JSON.stringify(rSItemDetails);
			rSItemDetails = JSON.parse(rSItemDetails);
			rSItemDetails = rSItemDetails.item;
		})
		.catch(err => {
			console.log(err);
		})

		//console.log(rSItemDetails);

		await request(graphURL)
		.then(async res => {
			//console.log(res);
			//console.log(response);
			rSItemGraph = res;
			rSItemGraph = JSON.parse(rSItemGraph);
		})
		.catch(err => {
			console.log(err);
		})

		rSItemGraphDaily = Object.values(rSItemGraph.daily);
		rSItemGraphAverage = Object.values(rSItemGraph.average);
		rSItemGraph = rSItemGraphDaily.concat(rSItemGraphAverage);


		// console.log(rSItemGraphDaily);
		//console.log(rSItemGraphAverage);
		//console.log(rSItemGraph);


		var price = rSItemDetails.current.price;
		//console.log('price: ' + price);
		var min = Math.min.apply(null, rSItemGraph);
		//console.log('minimum: ' + min);
		var max = Math.max.apply(null, rSItemGraph);
		//console.log('maximum: ' + max);
		var mean = Math.round(stats.mean(rSItemGraph));
		//console.log('mean: ' + mean);
		var median = Math.round(stats.median(rSItemGraph));
		//console.log('median: ' + median);
		var mode = stats.mode(rSItemGraph);

		var modeMin = mode;
		var modeMax = mode;
		if(mode.length > 1){
			modeMin = Math.min.apply(null, mode);
			modeMax = Math.max.apply(null, mode);
			mode = 0;

		}
		//console.log('mode min: ' + modeMin);
		//console.log('mode max: ' + modeMax);
		//console.log('mode: ' + mode);
		var range = max - min;
		//console.log('range: ' + range);
		var lowerQuartile = Math.round(stats.percentile(rSItemGraph, 0.50));
		//console.log('lq: ' + fortyP);
		var upperQuartile = Math.round(stats.percentile(rSItemGraph, 0.70));
		//console.log('uq: ' + sixtyP);
		var obj = { price: price, minimum: min, maximum: max, mean: mean, median: median, mode: mode, modeMin: modeMin, modeMax: modeMax, range: range, lowerQuartile: lowerQuartile, upperQuartile: upperQuartile};
		//console.log(obj);
		res.send(obj);
		//var histogram = stats.histogram(rSItemGraph, 10);
		//console.log('histogram: ' + histogram.values);

		// res.send(
		//   `Item ID: ${req.body.itemID}`,
		// );
	} catch (e) {
		throw new Error(e);
	}
});

runescape.post('/items', async (req, res) => {
	try {
		//console.log(req.body);

		var itemID = req.body.itemID;

		console.log(itemID);

		var detailsURL = detail + itemID;
		console.log(detailsURL);
		var graphURL = graph + itemID + '.json';
		console.log(graphURL);


		var rSItemDetails;
		var rSItemGraph;
		var rSItemGraphDaily;
		var rSItemGraphAverage;

		await request(detailsURL)
		.then(async res => {
			rSItemDetails = res;
			rsItemDetails = JSON.stringify(rSItemDetails);
			rSItemDetails = JSON.parse(rSItemDetails);
			rSItemDetails = rSItemDetails.item;
		})
		.catch(err => {
			console.log(err);
		})

		//console.log(rSItemDetails);

		await request(graphURL)
		.then(async res => {
			//console.log(res);
			//console.log(response);
			rSItemGraph = res;
			rSItemGraph = JSON.parse(rSItemGraph);
		})
		.catch(err => {
			console.log(err);
		})

		rSItemGraphDaily = Object.values(rSItemGraph.daily);
		rSItemGraphAverage = Object.values(rSItemGraph.average);
		rSItemGraph = rSItemGraphDaily.concat(rSItemGraphAverage);


		// console.log(rSItemGraphDaily);
		//console.log(rSItemGraphAverage);
		//console.log(rSItemGraph);


		var price = rSItemDetails.current.price;
		console.log('price: ' + price);
		var min = Math.min.apply(null, rSItemGraph);
		console.log('minimum: ' + min);
		var max = Math.max.apply(null, rSItemGraph);;
		console.log('maximum: ' + max);
		var mean = stats.mean(rSItemGraph);
		console.log('mean: ' + mean);
		var median = stats.median(rSItemGraph);
		console.log('median: ' + median);
		var mode = stats.mode(rSItemGraph);

		var modeMin = mode;
		var modeMax = mode;
		if(mode.length > 1){
			modeMin = Math.min.apply(null, mode);
			modeMax = Math.max.apply(null, mode);
			mode = 0;
		}
		console.log('mode min: ' + modeMin);
		console.log('mode max: ' + modeMax);
		console.log('mode: ' + mode);
		var range = max - min;
		console.log('range: ' + range);
		var twentyP = stats.percentile(rSItemGraph, 0.40);
		console.log('lq: ' + twentyP);
		var eightyP = stats.percentile(rSItemGraph, 0.60);
		console.log('uq: ' + eightyP);
		//var histogram = stats.histogram(rSItemGraph, 10);
		//console.log('histogram: ' + histogram.values);

		// res.send(
		//   `Item ID: ${req.body.itemID}`,
		// );
	} catch (e) {
		throw new Error(e);
	}
});

module.exports = runescape;
