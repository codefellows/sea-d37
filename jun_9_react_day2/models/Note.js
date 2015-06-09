'use strict';

var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  author: String,
  noteBody: String
});

module.exports = mongoose.model('Note', noteSchema);
