var db = require('./models/db')

var sampleUsers = [];
sampleUsers.push({
  userName: 'Sherri',
  email: 'sherri@user.com',
  password: 'Sherri'
});
sampleUsers.push({
  userName: 'Chris',
  email: 'chris@user.com',
  password: 'Chris'
});
sampleUsers.push({
  userName: 'Teddy',
  email: 'teddy@user.com',
  password: 'Teddy'
});
sampleUsers.push({
  userName: 'Kenny',
  email: 'kenny@user.com',
  password: 'Kenny'
});
sampleUsers.push({
  userName: 'Bill',
  email: 'bill@user.com',
  password: 'Bill'
});
sampleUsers.push({
  userName: 'Natalia',
  email: 'natalia@user.com',
  password: 'Natalia'
});
sampleUsers.push({
  userName: 'Lily',
  email: 'lily@user.com',
  password: 'Lily'
});
sampleUsers.push({
  userName: 'Brandon',
  email: 'brandon@user.com',
  password: 'Brandon'
});
sampleUsers.push({
  userName: 'Toby',
  email: 'toby@user.com',
  password: 'Toby'
});
sampleUsers.push({
  userName: 'Ryan',
  email: 'ryan@user.com',
  password: 'Ryan'
});
sampleUsers.push({
  userName: 'Alivia',
  email: 'alivia@user.com',
  password: 'Alivia'
});
sampleUsers.push({
  userName: 'Lynette',
  email: 'lynette@user.com',
  password: 'Lynette'
});

var sampleDecks = [];
sampleDecks.push({
  deckName: 'math',
  subject: 'math'
});
sampleDecks.push({
  deckName: 'english',
  subject: 'english'
});
sampleDecks.push({
  deckName: 'science',
  subject: 'science'
});
sampleDecks.push({
  deckName: 'spanish',
  subject: 'spanish'
});
sampleDecks.push({
  deckName: 'chemistry',
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
