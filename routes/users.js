/*ROUTE REQUIREMENTS SET AS VARIABLES*/
var express        = require('express'),
    router         = express.Router(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    User           = require('../models/user'),
    Deck           = require('../models/deck');

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

/*USER CRUD ACTIONS*/
router.route('/')
  /*GET USERS#INDEX*/
  .get(function(req, res, next){
    User.find({}, function (err, users){
      if (err){
      	return console.error(err);
      }
      else {
				console.log('GOT ALL USERS');
      	res.format({
        	html: function(){
          	res.render('users/index', {
							title: "All myDeck Players",
            	'users' : users
            });
        	},
         	json: function(){
          	res.json(users);
          	console.log(users);
         	}
       	});
      }
    });
  })
  /*POST USER*/
  .post(function(req, res){
    User.create(req.body, function(err, user){
      if (err){
        res.send(err);
      }
      else {
				console.log('CREATED USER ID: ' + user._id);
        res.format({
          html: function(){
            res.redirect('/users/' + user._id);
          },
          json: function(){
            res.json(user);
          }
        });
      }
    });
  });

/*GET NEW USER PAGE*/
router.get('/new', function(req, res){
	console.log("GOT CREATE NEW USER PAGE");
  res.render('users/new', { title: 'Sign-up!' });
});

/*USER ID VALIDATION FOR USER#SHOW,EDIT PAGE,UPDATE,AND DELETE*/
router.param('id', function(req, res, next, id) {
  User.findById(id, function (err, user) {
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

/*GET USER#SHOW*/
router.route('/:id')
  .get(function(req, res){
    User.findById(req.id, function (err, user){
      if (err){
        console.log("DOH!" + err);
      }
      else {
				console.log('GOT USER ID: ' + user._id);
        console.log(user)
        var userSince = user.userSince.toISOString();
        userSince = userSince.substring(0, userSince.indexOf('T'))
        res.format({
          html: function(){
            res.render('users/show', {
              "user" : user,
              "decks" : user.decks,
              "userSince" : userSince
            });
          },
          json: function(){
            res.json(user);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	/*GET USER#EDIT PAGE*/
  .get(function(req, res){
    User.findById(req.id, function(err, user){
      if (err){
        console.log(err);
      }
      else {
				console.log('GOT EDIT PAGE w/ USER ID: ' + user._id);
        res.format({
          html: function(){
            res.render('users/edit', {
              title  : "Don't ever change, ",
              "user" : user,
            });
          },
          json: function(){
            res.json(user);
          }
        });
      }
    });
	})
	/*UPDATE USER*/
	.put(function(req, res){
		User.findByIdAndUpdate(req.id, req.body, function(err, user){
			if (err){
				res.send("Oops, I guess you'll have to stay the same: " + err);
			}
			else {
				console.log('UPDATED USER ID: ' + user._id);
				res.format({
					html: function(){
						res.redirect("/users/" + user._id);
					},
					json: function(){
						res.json(user);
					}
				});
			}
		});
	})
	/*DELETE USER*/
	.delete(function (req, res){
		User.findByIdAndRemove(req.id, function (err, user){
			if (err){
				return console.error(err);
			}
			else {
				console.log('DELETED USER ID: ' + user._id);
				res.format({
					html: function(){
						res.redirect("/users");
					},
					json: function(){
						res.json({
							message : 'deleted',
							item : user
						});
					}
				});
			}
		});
	});

router.route('/:id/decks/new')
  .get(function(req, res){
    User.findById(req.id, function(err, user){
        if (err){
          console.log(err);
        }
        else {
  				console.log('GOT EDIT PAGE w/ USER ID: ' + user._id);
          res.format({
            html: function(){
              res.render('decks/new', {
                title  : "Create a new deck",
                "user" : user,
              });
            },
            json: function(){
              res.json(user);
            }
          });
        }
      });
  	})

  .post(function(req, res){
    Deck.create(req.body, function(err, deck) {
      if (err){
        res.send(err);
      }
      else {
        User.findById(req.id, function(err, user){
          console.log('HERE IS THE USER',user)
          if (err){
            res.send("Error finding user: " + err);
          }
          else {
            user.decks.push(deck);
            user.save(function(err, updatedUser) {
              if (err) {
                console.log(err);
              }
              res.format({
                html: function(){
                  res.redirect("/users/" + user._id)
                },
                json: function(){
                  res.json(updatedUser);
                }
              });
            });
          }
        });
      }
    });
  });

module.exports = router;
