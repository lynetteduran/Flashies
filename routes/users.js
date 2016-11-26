var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    db = require('../models');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

//GET ALL USERS
router.route('/').get(function(req, res, next) {
  db.User.find({}, function (err, users) {
    if (err) {
      return console.error(err);
    }
    else {//respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
    res.format({
      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
      html: function(){
        res.render('users/index', {
          title: 'All Users',
          "users" : users
        });
      },
      //JSON response will show all users in JSON format
      json: function(){
        res.json(users);
      }
    });
    }
});
});

// /* GET NEW USER PAGE. */
// router.get('/new', function(req, res) {
//     res.render('users/new', { title: 'Add New User' });
// });
// // module.exports.create = function (req, res){
// //   new User({
// //     content: req.body.content
// //   }).save(function(err,user,count){
// //     res.redirect('/');
// //   });
// // };
module.exports = router;
