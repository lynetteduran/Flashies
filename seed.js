var db = require('./models/db')

var sampleUsers = [];
sampleUsers.push({
  userName: 'user1',
  email: 'user1@user.com',
  password: 'user1'
});
sampleUsers.push({
  userName: 'user2',
  email: 'user2@user.com',
  password: 'user2'
});
sampleUsers.push({
  userName: 'user3',
  email: 'user3@user.com',
  password: 'user3'
});
sampleUsers.push({
  userName: 'user4',
  email: 'user4@user.com',
  password: 'user4'
});
sampleUsers.push({
  userName: 'user5',
  email: 'user5@user.com',
  password: 'user5'
});

var sampleDecks = [];
sampleDecks.push({
  deckName: 'deck1',
  subject: 'math'
});
sampleDecks.push({
  deckName: 'deck2',
  subject: 'english'
});
sampleDecks.push({
  deckName: 'deck3',
  subject: 'science'
});
sampleDecks.push({
  deckName: 'deck4',
  subject: 'spanish'
});
sampleDecks.push({
  deckName: 'deck5',
  subject: 'chemistry'
});

var sampleCards = [];
sampleCards.push({
  question: 'question1',
  answer: 'answer1'
});
sampleCards.push({
  question: 'question2',
  answer: 'answer2'
});
sampleCards.push({
  question: 'question3',
  answer: 'answer3'
});
sampleCards.push({
  question: 'question4',
  answer: 'answer4'
});
sampleCards.push({
  question: 'question5',
  answer: 'answer5'
});

sampleUsers.forEach(function(user){
  user.decks = sampleDecks;
});
db.User.remove({}, function(err, users){
  db.User.create(sampleUsers, function(err, users){
    if (err) { return console.log('ERROR', err); }
    console.log('all users:', users);
    console.log('created', users.length, 'users');
    process.exit();
  });
});

sampleDecks.forEach(function(deck){
  deck.cards = sampleCards;
});
db.Deck.remove({}, function(err, decks){
  db.Deck.create(sampleDecks, function(err, decks){
    if (err) { return console.log('ERROR', err); }
    console.log('all decks:', decks);
    console.log('created', decks.length, 'decks');
  });
});

db.Card.remove({}, function(err, cards){
  db.Card.create(sampleCards, function(err, cards){
    if (err) { return console.log('ERROR', err); }
    console.log('all cards:', cards);
    console.log('created', cards.length, 'cards');
  });
});
