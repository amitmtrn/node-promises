# node-promises

This module add promise version to all node module functions

Example:
```js
var nodePromise = require('./index.js');
var fs = nodePromise('fs');

fs.existsPromise(__filename)
.then(function(data) {
  console.log(data);
  return fs.mkdirPromise(__dirname + '/test');
}).then(function(data) {
  console.log(data);
});
```

TODO:
* write tests
