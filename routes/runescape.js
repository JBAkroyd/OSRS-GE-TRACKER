const runescape = require('express').Router();
const request = require('request-promise');
const rsurl = 'http://services.runescape.com/m=itemdb_oldschool';
const detail = rsurl + '/api/catalogue/detail.json?item=';
const graph = rsurl + '/api/graph/';
const stats = require('stats-lite');
const rSItems = require('../client/src/assets/rs_items.json');
const osBuddyUrl = 'https://storage.googleapis.com/osbuddy-exchange/summary.json';

runescape.post('/item', async (req, res) => {
	try {

		//console.log(rSItems);
		var itemID = req.body.itemID;
		//console.log(itemID);

		var detailsURL = detail + itemID;
		console.log(detailsURL);
		var graphURL = graph + itemID + '.json';
		console.log(graphURL);
		console.log(osBuddyUrl);

		var rSItemDetails;
		var rSItemGraph;
		var rSItemGraphDaily;
		var rSItemGraphAverage;
		var oSBItem;

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

		await request(graphURL)
		.then(async res => {
			rSItemGraph = res;
			rSItemGraph = JSON.parse(rSItemGraph);
		})
		.catch(err => {
			console.log(err);
		})

		await request(osBuddyUrl)
		.then(async res => {
			oSBItem = res;
			oSBItem = JSON.parse(oSBItem);
			oSBItem = Object.values(oSBItem);
			var elementPos = oSBItem.map((x) => {return x.id; }).indexOf(itemID);
			oSBItem = oSBItem[elementPos];
			console.log(oSBItem);
		})
		.catch(err => {
			console.log(err);
		})

		rSItemGraphDaily = rSItemGraph.daily
		rSItemGraphDaily = rSItemGraphDaily[Object.keys(rSItemGraphDaily)[Object.keys(rSItemGraphDaily).length - 1]]
		rSItemGraphAverage = rSItemGraph.average
		rSItemGraphAverage = rSItemGraphAverage[Object.keys(rSItemGraphAverage)[Object.keys(rSItemGraphAverage).length - 1]]

		var price = rSItemDetails.current.price;

		var todayChange = rSItemDetails.today.price;
		var dailyPrice = rSItemGraphDaily;
		var averagePrice = rSItemGraphAverage;
		//console.log(oSBItem);
		var storePrice = oSBItem.sp;
		var buyPriceAv = oSBItem.buy_average;
		var sellPriceAv = oSBItem.sell_average;
		var buyQ = oSBItem.buy_quantity;
		var sellQ = oSBItem.sell_quantity;
		var obj = { price: price, todayChange: todayChange, dailyPrice: dailyPrice, averagePrice: averagePrice, storePrice: storePrice, buyPriceAv: buyPriceAv, sellPriceAv: sellPriceAv, buyQ: buyQ, sellQ: sellQ};
		//console.log(obj);
		res.send(obj);
	} catch (e) {
		throw new Error(e);
	}
});

runescape.post('/items', async (req, res) => {
	try {
		//console.log(rSItems);
		var itemID = req.body.itemID;
		//console.log(itemID);

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

		await request(graphURL)
		.then(async res => {
			rSItemGraph = res;
			rSItemGraph = JSON.parse(rSItemGraph);
		})
		.catch(err => {
			console.log(err.response.headers);
		})

		rSItemGraphDaily = rSItemGraph.daily
		rSItemGraphDaily = rSItemGraphDaily[Object.keys(rSItemGraphDaily)[Object.keys(rSItemGraphDaily).length - 1]]
		rSItemGraphAverage = rSItemGraph.average
		rSItemGraphAverage = rSItemGraphAverage[Object.keys(rSItemGraphAverage)[Object.keys(rSItemGraphAverage).length - 1]]

		var price = rSItemDetails.current.price;

		var todayChange = rSItemDetails.today.price;
		var dailyPrice = rSItemGraphDaily;
		var averagePrice = rSItemGraphAverage;
		var obj = { price: price, todayChange: todayChange, dailyPrice: dailyPrice, averagePrice: averagePrice};
		console.log(obj);
		res.send(obj);
	} catch (e) {
		throw new Error(e);
	}
});

module.exports = runescape;
