'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

//services
require('./services/copy')(notesApp);
require('./services/rest_resource')(notesApp);

//controllers
require('./notes/controllers/notes_controller')(notesApp);

//directives
require('./directives/simple_directive')(notesApp);
