'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller; 
  }));

  it('should be able to create a new controller', function() {
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.notesController = $ControllerConstructor('notesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/notes').respond(200, [{_id: '1', noteBody: 'test note'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.notes[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/api/notes').respond(500, {msg: 'server error'}) ;
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving notes');
    });

    it('should be able to save a new note', function() {
      $scope.newNote = {noteBody: 'test note'};
      $httpBackend.expectPOST('/api/notes').respond(200, {_id: '2', noteBody: 'test note'});
      $scope.createNewNote();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note'); 
      expect($scope.notes[0]._id).toBe('2');
      expect($scope.newNote).toBe(null);
    });

    it('should delete a note', function() {
      var note = {_id: '3', noteBody: 'test note'};
      $scope.notes.push(note);
      $httpBackend.expectDELETE('/api/notes/3').respond(200, {msg: 'success!'});

      expect($scope.notes.indexOf(note)).not.toBe(-1);
      $scope.removeNote(note);
      expect($scope.notes.indexOf(note)).toBe(-1);
      $httpBackend.flush(); 
      expect($scope.errors.length).toBe(0); 
    });

    it('should delete a note even on server error', function() {
      var note = {_id: '4', noteBody: 'test note'};
      $scope.notes.push(note);
      $httpBackend.expectDELETE('/api/notes/4').respond(500, {msg: 'wah wah'});

      expect($scope.notes.indexOf(note)).not.toBe(-1);
      $scope.removeNote(note);
      expect($scope.notes.indexOf(note)).toBe(-1);
      $httpBackend.flush(); 
      expect($scope.errors.length).toBe(1); 
      expect($scope.errors[0].msg).toBe('could not remove note: test note')
    });

  });
});
