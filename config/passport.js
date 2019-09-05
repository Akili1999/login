const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("./../models");

  passport.use(new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      db.User.findOne({ username})
      .then(function(dbUser) {l
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        else if (!dbUser.validPassword(password)) {
          console.log("incorrect password")
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        console.log("checked")
        return done(null, dbUser);
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

module.exports = passport
