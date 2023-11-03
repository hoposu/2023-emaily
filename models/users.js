const mongoose = require("mongoose");
// Destructuring: this is the same as const Schema = mongoose.Schema;
const { Schema } = mongoose;

// mongoose wants you to pre-define all the properties the records will have
// with the schema object
const userSchema = new Schema({
  googleId: String,
});

//.model command tells mongoose that we wnat to create a new collection (model class) named "users"
mongoose.model("users", userSchema);
