// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');
// var env = require('../env');

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

module.exports = yelp;
