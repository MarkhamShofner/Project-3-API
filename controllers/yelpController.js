var Yelp = require("../models/yelp.js");

var yelpController = {

  search: function(req, res) {
    var params = {
      term: 'bar',
      ll: "38.999, -79.011",
      limit: 3
    };
    Yelp.search(params)
    .then(function(data) {
      res.json(data);
    });
  }

};

module.exports = yelpController;
