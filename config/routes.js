function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var locationsController = require('../controllers/locationsController');
var usersController = require('../controllers/usersController');
var passport = require("passport");
var Yelp = require("../models/yelp.js");


router.route('/')
  .get(locationsController.index);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.get("/yelp", function(req, res) {
  // See http://www.yelp.com/developers/documentation/v2/search_api
  // potential search param coordinates: {latitude: 38.9008765, longitude: -77.01328745},
  Yelp.search({
      term: 'bar',
      location: 'dc',
      limit: 3
    })
    .then(function(data) {
      res.json(data);
    });
});

module.exports = router;
