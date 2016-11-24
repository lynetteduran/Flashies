/*DATABASE*/
var db = require('./models');

/*REQUIRE NODE MODULES*/
var express        = require( 'express' );
var http           = require( 'http' );
var path           = require( 'path' );
var engine         = require( 'ejs-locals' );
var favicon        = require( 'serve-favicon' );
var cookieParser   = require( 'cookie-parser' );
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var logger         = require( 'morgan' );
var errorHandler   = require( 'errorhandler' );
var static         = require( 'serve-static' );

var app    = express();
var routes = require('./routes');

/*SET-UP for ALL ENVIRONMENTS*/
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( favicon( __dirname + '/public/favicon.ico' ));
app.use( logger( 'dev' ));
app.use( methodOverride());
app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : true }));
app.use( static( path.join( __dirname, 'public' )));

/*SET-UP for DEV ENVIRONMENT ONLY*/
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

/*SET-UP SERVER PORT LISTENER*/
http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
