var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var locationsController = require('../controllers/locationsController');
var usersController = require('../controllers/usersController');


router.route('/')
  .get(locationsController.index);

router.route('/signup')
  .get(usersController.getSignup)
  // .post(usersController.postSignup)

module.exports = router
