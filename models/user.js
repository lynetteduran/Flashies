/*CREATES USER MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Deck = require('./deck');

var userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  userSince: { type: Date, default: Date.now },
  decks: [Deck.schema]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
