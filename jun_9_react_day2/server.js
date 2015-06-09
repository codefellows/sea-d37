'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var notesRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/notes_development');

app.use(express.static(__dirname + '/build'));

require('./routes/notes_routes')(notesRoutes);

app.use('/api', notesRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
