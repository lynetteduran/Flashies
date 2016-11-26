/*REQUIRE NODE MODULES*/
var express        = require('express');
var path           = require('path');
var http           = require('http');
var favicon        = require('serve-favicon');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var logger         = require('morgan');
var errorHandler   = require('errorhandler');
var static         = require('serve-static');

var app    = express();
var routes = require('./routes/index');
var users  = require('./routes/users');

/*SET-UP for ALL ENVIRONMENTS*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/*SET-UP for DEV ENVIRONMENT ONLY*/
if('development' == app.get('env')){
  app.use(errorHandler());
}

/*SET-UP SERVER PORT LISTENER*/
http.createServer(app).listen(app.get('port'), function (){
  console.log('Listening, I can hear you breathe... port ' + app.get('port'));
});
