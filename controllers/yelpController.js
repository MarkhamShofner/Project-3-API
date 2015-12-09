var Yelp = require("../models/yelp.js");

var yelpController = {

  search: function(req, res) {
    // console.log(req.body);
    // console.log(req.body.data);
    // var mule = req.body;
    // var params = {
    //   term: mule.term,
    //   // ll: backParams.latitude + backParams.longitude,
    //   limit: 3
    // };
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
