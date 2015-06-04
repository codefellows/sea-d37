'use strict';

module.exports = function(app) {
  app.directive('noteFormDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/note_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });
};
