# OSBuddy API Wrapper

Wraps the old school runescape grand exchange API (provided by OSBuddy).

# Usage

## Constructor

The API wrapper will cache item requests if a max-age is supplied (in minutes). The default is 0, i.e. no caching.

```javascript
const api = new OSBuddy({
  cache: {
    // The cache will expire in 15 minutes
    'max-age': 15
  }
})
```

## Items

The item method accepts an item ID and returns a promise which resolves to an object containing price data about an item. The results of this function are cached.

```javascript
api
  .item(2) // Cannonballs have ID 2
  .then(cannonball => console.log(cannonball))
```
This example will print the following

    { overall: 190,
      buying: 190,
      buyingQuantity: 478081,
      selling: 190,
      sellingQuantity: 376310 }


## Graphs

Returns the last several updates to an item. These are not cached.

```javascript
const sixHoursAgo = new Date();
sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

api
  .graph({
    id: 2, // Cannonballs have ID 2
    interval: 30, // Get price updates in 30 minute intervals
    start: sixHoursAgo.getTime() // Get price history for the last 6 hours
  })
  .then(cannonball => console.log(cannonball))
```

## names

Return a list of item IDs and their corresponding names. The result is not cached, so it is recommended to use this method sparingly.

```javascript
api
  .names()
  .then(names => console.log(names))
```
