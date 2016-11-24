/*CREATES CARD MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema ({
  question: String,
  answer: String
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card
