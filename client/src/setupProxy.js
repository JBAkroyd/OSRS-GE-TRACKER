const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/runescape/item', { target: 'http://localhost:5000/' }),
  proxy('/runescape/items', { target: 'http://localhost:5000/' }));
};

 // module.exports = function(app) {
 //   app.use(
 //     proxy('/api', { target: 'http://localhost:3002/' }),
 //     proxy('/*.svg', { target: 'http://localhost:5000/' }),
 //    );
 //  };
