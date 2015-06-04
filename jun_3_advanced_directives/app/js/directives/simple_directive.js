'use strict';

module.exports = function(app) {
  app.directive('simpleDirective', function() {
    return {
      restrict: 'AC',
      template: '<h2>{{someVal}}</h2><input type="text" data-ng-model="someVal">',
      scope: {}
    };
  });
};
