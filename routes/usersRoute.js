var db = require('../models');

module.exports.index = function(req, res){
  db.User.find({}, function(err, allUsers){
  res.render('index', allUsers);
  });
};

// module.exports.create = function (req, res){
//   new User({
//     content: req.body.content
//   }).save(function(err,user,count){
//     res.redirect('/');
//   });
// };
