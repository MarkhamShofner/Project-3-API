// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');
var env = require('../env');

var yelp = new Yelp({
  consumer_key: env.yelp.consumer_key,
  consumer_secret: env.yelp.consumer_secret,
  token: env.yelp.token,
  token_secret: env.yelp.token_secret,
});

module.exports = yelp;
