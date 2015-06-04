'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

app.use(express.static(__dirname + '/build'));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

var notesRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/notes_development');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/notes_routes')(notesRoutes);
require('./routes/auth_routes')(usersRoutes, passport);

app.use('/api', notesRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
