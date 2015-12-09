var Yelp = require("../models/yelp.js");

var yelpController = {

  search: function(req, res) {
    // console.log(req.body);
    // var mule = req.body;
    // var params = {
    //   term: mule.term,
    //   // ll: backParams.latitude + backParams.longitude,
    //   limit: 3
    // };
    var params = {
      term: req.body.term,
      ll: "38.999, -79.011",
      // ll: req.body.latitude + ", " + req.body.longitude,
      limit: 3
    };
    console.log(params);
    Yelp.search(params)
      .then(function(data) {
        console.log("timer");
        res.json(data);
      });
    // res.json(params);
  }

};

module.exports = yelpController;
