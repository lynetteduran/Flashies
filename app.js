/*SERVER CONFIG*/

/**REQUIRE NODE MODULES**/
var express        = require('express');
var app            = express();
var path           = require('path');
var favicon        = require('serve-favicon');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var static         = require('serve-static');
var port           = process.env.PORT || 3000;

/**DATABASE AND ALL ROUTES REQUIREMENTS/SET-UP**/
var db     = require('./models/db');
var user   = require('./models/user');
var routes = require('./routes/index');
var users  = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

/**APPLICATION SET-UP**/
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**SET-UP SERVER PORT LISTENER**/
app.listen(port);
console.log('I can hear you breathe...on port:' + port);

/**EXPORTS EXPRESS APP SET-UP**/
module.exports = app;
