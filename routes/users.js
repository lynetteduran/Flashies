/*ROUTE REQUIREMENTS SET AS VARIABLES*/
var express        = require('express'),
    router         = express.Router(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    User           = require('../models/user');

/*DECLARES REQUIREMENTS AS ROUTER UTILITIES*/
router.use(bodyParser.urlencoded({ extended: true }));
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
       res.format({
         html: function(){
           res.render('users/index', {
             title: 'All Users',
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
        res.format({
          html: function(){

                    debugger
            res.redirect('/users/show');
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
  res.render('users/new', { title: 'Add New User' });
});

/*GET USER ID VALIDATION*/
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
        console.log(err);
      } else {
        var userSince = User.userSince.toISOString();
        userSince = userSince.substring(0, userSince.indexOf('T'))
        res.format({
          html: function(){
            res.render('users/show', {
              "user" : user
            });
          },
          json: function(){
            res.json(user);
          }
        });
      }
    });
  });

module.exports = router;
