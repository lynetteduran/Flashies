/*CREATES DECK MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Card = require('./card');

var deckSchema = new Schema({
  deckName: String,
  subject: String,
  cards: [Card.schema],
});

var Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
