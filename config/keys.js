// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // we are in production, return prod set of  keys
} else
  [
    // we are in development, return dev keys
  ];
