var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var locationsController = require('../controllers/locationsController');

router.route('/')
  .get(locationsController.index);

module.exports = router
