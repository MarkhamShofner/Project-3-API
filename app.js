var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var locationsController = require("./controllers/locationsController");
var helperPizza = require("./helpers/first");

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res){
  res.render("index.html");
});

app.get("/locations", locationsController.index);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
  helperPizza.helper1();
});
