/*ROUTE REQUIREMENTS SET AS VARIABLES*/
var express        = require('express'),
    router         = express.Router(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    Deck           = require('../models/deck'),
    User           = require('../models/user');


/*DECLARES REQUIREMENTS AS ROUTER UTILITIES*/
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/*RETURNS MESSAGE ON CONSOLE WHEN SERVER RECEIVES DECK CRUD REQUEST,
  PROCEEDS TO RESPECTIVE REQUEST*/
router.use(function(req, res, next) {
  console.log('Something is happening on decks ...');
  next();

});

/*DECK ID VALIDATION FOR USER#SHOW,EDIT PAGE,UPDATE,AND DELETE*/
router.param('id', function(req, res, next, id) {
  Deck.findOne({'_id': id}, function (err, deck){
    if (err) {
      console.error(err);
      res.status(404);
      var err = new Error('Not Found');
      err.status = 404;
      res.format({
        html: function(){
          next(err);
         },
        json: function(){
          res.json({message : err.status  + ' ' + err});
         }
      });
    } else {
      req.id = id
      next();
    }
  });
});
/*GET DECKS#INDEX*/
router.route('/')
  .get(function(req, res, next){
    var allUserDecks = [];
    User.find({}, function(err, users){
      if (err) {
        console.log("error getting all users:", err)
      }
      else {
      users.forEach(function(user){
        user.decks.forEach(function(userDecks){
          allUserDecks.push(userDecks);
        });
      });
      res.format({
        html: function(){
          res.render('decks/index', {
  					title: "All the decks",
            'decks' : allUserDecks
          });
        },
        json: function(){
          res.json(decks);
        	console.log(decks);
        }
      });
     }
   });
 });

/*GET DECK#SHOW*/
router.route('/:id')
  .get(function(req, res){
    Deck.findOne({_id: req.id}, function (err, deck){
      if (err){
        console.log("DOH!" + err);
      }
      else {
        console.log(deck);
        res.format({
          html: function(){
            res.render('decks/show', {
              "deck" : deck
            });
          },
          json: function(){
            res.json(deck);
          }
        });
      }
    });
  });

module.exports = router
