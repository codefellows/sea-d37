'use strict';

var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  authorId: {type: String, required: true},
  noteBody: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);
