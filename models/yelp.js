// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');
// var env = require('../env');
// TODO - does the above line of code need to be active?

var yelp = new Yelp({
  consumer_key: env.yelp_consumer_key,
  consumer_secret: env.yelp_consumer_secret,
  token: env.yelp_token,
  token_secret: env.yelp_token_secret
  // TODO - make the keys accessible from both local servers, and deployed ones
  // consumer_key: process.env.yelp_consumer_key,
  // consumer_secret: process.env.yelp_consumer_secret,
  // token: process.env.yelp_token,
  // token_secret: process.env.yelp_token_secret
});

module.exports = yelp;
