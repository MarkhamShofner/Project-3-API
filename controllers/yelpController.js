var Yelp = require("../models/yelp.js");

var yelpController = {

  search: function(req, res) {
    console.log(req.body);
    var params = {
      term: req.body.term,
      // ll: "" + req.body.latitude + ", " + req.body.longitude + "",
      bounds: req.body.sw_lat + "," + req.body.sw_long + "|" + req.body.ne_lat + "," + req.body.ne_long,
      limit: 20,
      sort: 1
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
