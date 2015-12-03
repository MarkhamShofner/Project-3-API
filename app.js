var express = require("express");
var app = express();
var locationsController = require("./controllers/locationsController");

app.get("/", function(req, res){
  res.render("index.html");
});

// app.get("/locations", locationsController.index);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
});
