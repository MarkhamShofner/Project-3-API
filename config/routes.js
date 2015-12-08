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


router.route('/')
  .get(locationsController.index);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

// router.route("/logout")
//   .get(usersController.getLogout)

// router.route("/secret")
//   .get(authenticatedUser, usersController.secret)

module.exports = router;
