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

// mongoose.connect('mongodb://localhost/local-authentication-with-passport');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// var Yelp = require("./models/yelp.js");
// app.set("view engine", "hbs");

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(session({ secret: 'project3-mapparty' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var routes = require('./config/routes');
app.use(routes);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
});
