var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening on index...');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
