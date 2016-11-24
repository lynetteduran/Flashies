/*CREATES USER MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deck = require('./deck');

var UserSchema = new Schema ({
  userName: String,
  email: String,
  password: String,
  decks: [Deck.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
