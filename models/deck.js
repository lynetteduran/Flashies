/*CREATES DECK MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Card = require('./card');

var DeckSchema = new Schema ({
  deckName: String,
  subject: String,
  cards: [Card.schema],
});

var Deck = mongoose.model('Deck', DeckSchema);
module.exports = Deck;
