var Yelp = require("../models/yelp.js");

var yelpController = {
  search: function (req, res) {
    Yelp.search({
      term: 'bar',
      location: 'dc',
      limit: 3
    })
    .then(function(data) {
      res.json(data);
    });
  }
};

module.exports = yelpController;
