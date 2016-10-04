var compression = require('compression');
var express = require('express'),
    app = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'), //Cookies (for auth)
    bodyParser = require('body-parser'), //Get info from html forms
    async = require('async'),
	cron = require('node-cron');
var minifyHTML = require('express-minify-html');


//app.all(/.*/, function(req, res, next) {
//  var host = req.header("host");
//  if (host.match(/^www\..*/i)) {
/*    next();
  } else {
    res.redirect(301, "http://www." + host);
  }
});*/


var ua = require('universal-analytics');
var visitor = ua('UA-84938825-1');

app.all(/.*/, function(req, res, next) {
    visitor.pageview(req.originalUrl).send();
    next();
});

//Passport setup
require('./app/passport.js')(passport);
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  false
    }
}));
app.use(compression());
//Express setup
app.use("/assets", express.static(__dirname + "/assets",{
        maxAge: 2592000000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
}));
//Express setup
app.use("/prod", express.static(__dirname + "/prod",{
        maxAge: 2592000000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
}));

app.use("/favicon.ico", express.static(__dirname + "/favicon.ico",{
        maxAge: 2592000000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//Session setup
app.use(passport.initialize());
app.use(passport.session());

require('./app/cron.js')(cron);

require('./app/routes.js')(app, passport, async);

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));