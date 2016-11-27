var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDeck');

var User = require('./user');
var Deck = require('./deck');
var Card = require('./card');

module.exports.User = User;
module.exports.Deck = Deck;
module.exports.Card = Card;
