// reuire in the original passport modeule here
const passport = require("passport");

// => is a function
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //route handler referencing express app object, the method type request,
  // first argument is the path we want to handle,
  // the second is some code to be executed anytime request comes in of this request type
  app.get(
    "/auth/google",
    // passport, attempt to auth the user coming in on this route, and use google strategy
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //this second handler looks really similar to first - big difference is that the /callback, inside of the
  //url, there will be the code. Passport will see the code and know can exchance the code for the user profile.
  // 'google' string tells Google passport strategy
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    //function that passport automatically attaches to the req object
    //kills the cookie
    req.logout();
    //send back acknowledge user is logged out
    res.send(req.user);
  });

  // third route handler: whenever makes get request to the app with this route
  // second arg arrow function that is automatically called whenever makes get request
  // args to arrow funciton are req (incoming request) and res (outgoing response)
  app.get("/api/current-user", (req, res) => {
    console.log("here's the user " + req.user);
    res.send(req.user);
  });
};
