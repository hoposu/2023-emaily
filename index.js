// out of the box, express does NOT know how to handle cookies
const cookieSession = require("cookie-session");
// to tell passport to make use of the cookies
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

// just need to make sure that this runs, so don't need to save as a variable
require("./models/users");
require("./services/passport");

//request comes in, request is sent to route handler
//cookie session: extracts cookie data
//pulls user id out of cookie data
//deserialize user: function we write to turn user id into a user
//user model instance added to req object as `req user`

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //configuration object expects two propoerties
    // how long cookie should last
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //key to encrypt cookie; anytime you make a key you should stick it in the key.js file
    // lets us provide multiple keys, so use an array
    keys: [keys.cookieKey],
  })
);
// when we require the authRoutes function, it reutrns a function in the .exports; and then with (app) we immediately call the function
require("./routes/authRoutes")(app);

// tell passport that it should make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
