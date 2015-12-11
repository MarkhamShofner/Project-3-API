// requiring mongoose dependency
var mongoose = require('mongoose');
// var conn = mongoose.connect(process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/locations');

// instantiate a name space for our Schema constructor defined by mongoose.
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// defining schema for locations.
var LocationSchema = new Schema({
  name: String,
  lat: Number,
  long: Number,
  type: String,
  score: Number
});

// var User = new Schema({
// 	favorites: {[
// 		bizid: String	
// 	]}
// })

// setting models in mongoose utilizing schemas defined above, we'll be using
// these frequently throughout our app
mongoose.model("Location", LocationSchema);
