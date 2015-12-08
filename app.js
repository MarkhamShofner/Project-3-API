var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var locationsController = require("./controllers/locationsController");
var seeds = require("./db/seeds");
var Yelp = require("./models/yelp.js");
// app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res){
  res.render("index.html");
});

app.get("/yelp", function(req,res) {
  // See http://www.yelp.com/developers/documentation/v2/search_api
  Yelp.search({ term: 'bar', location: 'dc' })
  .then(function (data) {
    res.json(data);
  });
});

var routes = require('./config/routes');
app.use(routes);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
});
