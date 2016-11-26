/*CREATES CARD MODEL*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema ({
  question: String,
  answer: String
});

module.exports = mongoose.model('Card', cardSchema);
