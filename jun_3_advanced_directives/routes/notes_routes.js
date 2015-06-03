'use strict';

var Note = require('../models/Note');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json()); 

  router.get('/notes', function(req, res) {
    Note.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.post('/notes', function(req, res) {
    var newNote = new Note(req.body); 
    newNote.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.put('/notes/:id', function(req, res) {
    var updatedNote = req.body;
    delete updatedNote._id;

    Note.update({'_id': req.params.id}, updatedNote, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'}); 
    });
  });

  router.delete('/notes/:id', function(req, res) {
    Note.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'});
    });
  });
};
