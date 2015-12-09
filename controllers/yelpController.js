var Yelp = require("../models/yelp.js");

var yelpController = {
  search: function (req, res) {
    Yelp.search({
      term: 'bar',
      ll: "38.999, -79.011",
      limit: 3
    })
    .then(function(data) {
      res.json(data);
    });
  }
};

module.exports = yelpController;
