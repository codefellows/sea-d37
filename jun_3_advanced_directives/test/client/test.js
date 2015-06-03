'use strict';

var expect = require('chai').expect;
var greet = require('../../app/js/greet');

describe('greet module', function() {
  it('should return a greeting', function() {
    expect(greet()).to.eql('hello world, from javascript');
  });
});
