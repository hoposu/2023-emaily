const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    //First argument is an object of configuration options
    {
      clientID: keys.GoogleClientID,
      clientSecret: keys.googleClientSecret,
      // route user is sent to after they grant permission in google server
      callbackURL: "/auth/google/callback",
    },
    //second argument is callback arrow function
    (accessToken, refreshToken, profile, done) => {
      // this query returns a promise, which is how we handle asynchronous code in javascript
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          //first argument is error object, the second argument is user record
          done(null, existingUser);
          console.log("existing user! " + existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
          // Now you can work with the saved user as 'savedUser'
          console.log("new user! " + user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  // done is a callback that we have to call when we've done some work with passport
  // NOTE: This id is NOT the id that we get from Google - this is the "_id" property in mongo - autogenerated uuid from mongo
  // good in case you want to support different oauth paths (is apple id, facebook id)
  // * Oauth's only purpose is to allow someone to sign in - after that, we use our own internal IDs
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
