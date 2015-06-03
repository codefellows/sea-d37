'use strict';

module.exports = function(app) {
  app.directive('newNoteFormDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/new_note_form.html',
      scope: {
        createNewNote: '&'
      },
      transclude: true
    };
  });
};
