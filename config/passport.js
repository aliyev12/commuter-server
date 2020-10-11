const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const models = require("../models");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Match User
        try {
          const user = await models.User.findOne({ where: { email } });
          // Math the user my email
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // Match the password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        } catch (error) {}
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await models.User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
