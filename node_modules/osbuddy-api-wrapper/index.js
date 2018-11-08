const fetch = require('node-fetch');
const Cache = require('./cache');

class OSBuddy {
  constructor({ cache }) {
    this.itemCache = new Cache(cache);
  }

  /*
    Fetchs an item from the RSBuddy API (cached)
  */
  item(id) {
    if (this.itemCache.valid(id)) {
      return Promise.resolve(this.itemCache.retrieve(id));
    } else {
      return this
        .fetchItem(id)
        .then(value => this.cacheItem(id, value));
    }
  }

  /*
    Fetchs an item from the RSBuddy API (uncached)
  */
  fetchItem(id) {
    return fetch(`https://api.rsbuddy.com/grandExchange?a=guidePrice&i=${id}`)
      .then(res => res.json())
      .then(data => ({
        'current-price': data.overall,
        'offer-price': data.selling,
        'sell-price': data.buying,
        'margin': data.buying - data.selling,
        'buying-quantity': data.buyingQuantity,
        'selling-quantity': data.sellingQuantity,
        'ratio': data.buyingQuantity / data.sellingQuantity
      }))
  }

  /*
    Caches an item
  */
  cacheItem(key, value) {
    this.itemCache.add(key, value);

    return value;
  }

  graph(opts) {
    return fetch(`https://api.rsbuddy.com/grandExchange?a=graph&g=${opts.interval}&start=${opts.start}&i=${opts.id}`)
      .then(res => res.json())
  }

  names() {
    return fetch(`https://rsbuddy.com/exchange/summary.json`)
      .then(res => res.json())
      .then(data => Object.keys(data).map(key => data[key]))
  }
}

module.exports = OSBuddy;
