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

/**EXPORTS USER MODEL SET-UP**/
module.exports = mongoose.model('User', userSchema);
