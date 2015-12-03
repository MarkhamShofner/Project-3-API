var express = require("express");
var app = express();
var locationsController = require("./controllers/locationsController");

app.get('/locations', function(req, res){
  console.log("hi");
  res.send("hello");
});

// app.get("/compliments", locationsController.index);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
});
