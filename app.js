var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var passport     = require('passport');
var flash = require('connect-flash');
var session    = require('express-session');
var mongoose     = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var hbs   = require("hbs");
var locationsController = require("./controllers/locationsController");
var seeds = require("./db/seeds");
var env = require('./env');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/local-authentication-with-passport')

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// var Yelp = require("./models/yelp.js");
// app.set("view engine", "hbs");

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(session({ 
	secret: process.env.passport_secret || env.passport_secret,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// test

var routes = require('./config/routes');
app.use(routes);

app.listen(process.env.PORT || 3000, function(){
  console.log("app listening at http://localhost:3000/");
});