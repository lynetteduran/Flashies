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
  /*GET ALL USERS#INDEX*/
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
         }
       });
      }
    });
  })
  /*POST SINGLE USER*/
  .post(function(req, res){
    User.create(req.body, function(err, user){
      if (err){
        res.send(err);
      }
      else {
        res.format({
          html: function(){
            res.redirect('/users');
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

module.exports = router;
