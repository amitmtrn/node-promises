# node-promises

[![Join the chat at https://gitter.im/amitmtrn/node-promises](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/amitmtrn/node-promises?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


[![NPM version](https://img.shields.io/npm/v/node-promises.svg)](https://www.npmjs.com/package/node-promises)
[![Download stats](https://img.shields.io/npm/dm/node-promises.svg)](https://www.npmjs.com/package/node-promises)

[![NPM stats](https://nodei.co/npm/node-promises.svg?downloadRank=true&downloads=true)](https://www.npmjs.org/package/node-promises)


This module add promise version to all node module functions

Example:
```js
var nodePromise = require('node-promises');
var fs = nodePromise('fs');

fs.existsPromise(__filename)
.spread(function(exists) { //exists=true
  return fs.mkdirPromise(__dirname + '/test');
}).spread(function() {
  // test folder has been created
});
```

> since the promise return the argument array of the callback you should prefer use `spread` instead `then`
