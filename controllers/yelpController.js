var Yelp = require("../models/yelp.js");

var yelpController = {

  search: function(req, res) {
    console.log(req.body);
    var params = {
      term: req.body.term,
      // ll: "38.999, -79.011",
      ll: "" + req.body.latitude + ", " + req.body.longitude + "",
      // ll: "38.999, -79.011",
      limit: 10
    };
    console.log(params);
    console.log(params.ll);
    Yelp.search(params)
      .then(function(data) {
        res.json(data);
      });
  }

};

module.exports = yelpController;
