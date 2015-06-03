'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', 'RESTResource', function($scope, resource) {
    var Note = resource('notes');
    $scope.errors = [];
    $scope.notes = [];

    $scope.getAll = function() {
      Note.getAll(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error retrieving notes'});
        $scope.notes = data;
      });
    };

    $scope.createNewNote = function() {
      var newNote = $scope.newNote;
      $scope.newNote = null;
      $scope.notes.push(newNote);
      Note.create(newNote, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save note: ' + newNote.noteBody});
        $scope.notes.splice($scope.notes.indexOf(newNote), 1, data);
      });
    };

    $scope.removeNote = function(note) {
      $scope.notes.splice($scope.notes.indexOf(note), 1);
      Note.remove(note, function(err) {
        if(err) {
          $scope.errors.push({msg: 'could not remove note: ' + note.noteBody});
        }
      });
    };

    $scope.saveNote = function(note) {
      note.editing = false;
      Note.save(note, function(data) {
          $scope.errors.push({msg: 'could not update note'});
      });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
