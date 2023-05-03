// config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'users.db', autoload: true });

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = new User(
          profile.id,
          profile.displayName,
          profile.name.givenName,
          profile.name.familyName,
          profile.photos[0].value
        );

        try {
          db.findOne({ googleId: profile.id }, (err, user) => {
            if (err) return done(err);

            if (user) {
              // User exists
              done(null, user);
            } else {
              // Create new user
              db.insert(newUser, (err, user) => {
                if (err) return done(err);
                done(null, user);
              });
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    db.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};