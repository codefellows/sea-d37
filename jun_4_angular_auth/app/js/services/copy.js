'use strict';

module.exports = function(app) {
  app.factory('copy', function() {
    return function(objToCopy) {
      var obj = {}; 
      Object.keys(objToCopy).forEach(function(key) {
        obj[key] = objToCopy[key];
      });
      return obj;
    };
  });
};
