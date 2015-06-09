'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Note = require('../models/Note');

describe('notes REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new note', function(done) {
    chai.request('localhost:3000')
      .post('/api/notes')
      .send({noteBody: 'test note'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.noteBody).to.eql('test note');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get an array of notes', function(done) {
    chai.request('localhost:3000')
    .get('/api/notes')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);

      done(); 
    });
  });

  describe('needs an existing note to work with', function() {
    beforeEach(function(done) {
      var testNote = new Note({noteBody: 'test note'});
      testNote.save(function(err, data) {
        if(err) throw err;

        this.testNote = data;
        done();
      }.bind(this));
    });

    it('should be able to make a note in a beforeEach block', function() {
      expect(this.testNote.noteBody).to.eql('test note');
      expect(this.testNote).to.have.property('_id');
    });

    it('should update a note', function(done) {
      var id = this.testNote._id;
      chai.request('localhost:3000')
      .put('/api/notes/' + id)
      .send({noteBody: 'here is a new note'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a note', function(done) {
      chai.request('localhost:3000')
        .del('/api/notes/' + this.testNote._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  })
})
