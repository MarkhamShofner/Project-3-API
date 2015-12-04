// requiring mongoose dependency
var mongoose = require('mongoose');

// instantiate a name space for our Schema constructor defined by mongoose.
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


// defining schema for locations.
var LocationSchema = new Schema({
  name: String,
  lat: Integer,
  long: Integer,
  type: String,
  score: Integer
});

// setting models in mongoose utilizing schemas defined above, we'll be using
// these frequently throughout our app
mongoose.model("Location", LocationSchema);
