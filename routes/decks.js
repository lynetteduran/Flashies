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

/*RETURNS MESSAGE ON CONSOLE WHEN SERVER RECEIVES USER CRUD REQUEST,
  PROCEEDS TO RESPECTIVE REQUEST*/
router.use(function(req, res, next) {
  console.log('Something is happening...');
  next();
});

/*GET DECKS#INDEX*/
router.route('/')
  .get(function(req, res, next){
    var allUserDecks = [];
    User.find({}, function(err, users){
      if (err) {
        console.log("error getting all users:", err)
      }
      else{
      users.forEach(function(user){
        console.log(user.decks);
        user.decks.forEach(function(userDecks){
          console.log(userDecks);
          allUserDecks.push(userDecks);
          console.log(allUserDecks);
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

module.exports = router
