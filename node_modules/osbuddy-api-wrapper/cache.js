module.exports = class Cache {
  constructor(options) {
    this.cache = {};

    if (!options['max-age']) {
      this.cache.maxAge = 0;
    } else {
      this.cache.maxAge = options['max-age'] * 1000;
    }

    this.cache.store = {};
  }

  /*
    Checks if an item is in the cache,
    but doesn't check when it was last updated
  */
  exists(key) {
    return this.cache.store.hasOwnProperty(key);
  }

  /*
    Returns true if the item does not need to be updated and false if it does
  */
  valid(key) {
    return this.exists(key) && (this.cache.store[key].lastUpdated + this.cache.maxAge) > Date.now();
  }

  /*
    Forcefully adds a new item to the cache.
    You should probably use Cache.add instead.
  */
  insert(key, value) {
    this.cache.store[key] = {
      key,
      value,
      updates: 0,
      lastUpdated: Date.now()
    };
  }

  /*
    Forcefully updates an existing item in the cache.
    You should probably use Cache.add instead.

  */
  update(key, value) {
    this.cache.store[key].value = value;
    this.cache.store[key].updates++;
    this.cache.store[key].lastUpdated = Date.now();
  }

  /*
    Adds an item to the cache if it is out of date
  */
  add(key, value) {
    if (!this.exists(key)) {
      this.insert(key, value);
    } else if (!this.valid(key)) {
      this.update(key, value);
    }
  }

  /*
    Retrieves an item from the cache if it is up to date.
    Returns null otherwise.
  */
  retrieve(key) {
    if (this.valid(key)) {
      return this.cache.store[key].value;
    } else {
      return null;
    }
  }
}
