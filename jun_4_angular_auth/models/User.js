'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: { type: String, unique: true},
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password); 
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

userSchema.methods.owns = function(obj) {
  return obj.authorId === this._id;
};

module.exports = mongoose.model('User', userSchema);
