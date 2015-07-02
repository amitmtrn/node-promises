/*jshint loopfunc: true */

module.exports = function(nodeLib) {

  var lib = require(nodeLib);
  var Q = require('q');

  for (var key in lib) {
    if (key.indexOf('Sync') === -1 &&
    lib[key].toString().indexOf('callback') > -1) {
      var paramsName = getParamNames(lib[key]);

      for (var i = 0; i <= paramsName.length; i++) {
        if (paramsName[i] && paramsName[i].indexOf('callback') > -1) {
          break;
        }
      }

      (function(key, asyncFunc, callbackIndex) {
        var newKey = key + 'Promise';
        asyncFunc[newKey] = function() {
          var args = Array.prototype.slice.call(arguments);
          var deferred = Q.defer();
          args[callbackIndex] = function() {
            deferred.resolve(arguments);
          };

          asyncFunc[key].apply(this, args);
          return deferred.promise;
        };
      }(key, lib, i));

    }
  }
  /**
  *
  * http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
  */
  function getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
    result = [];
    return result;
  }

  return lib;
};
