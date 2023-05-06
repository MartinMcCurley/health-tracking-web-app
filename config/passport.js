// config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'users.db', autoload: true });

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: '/auth/google/callback',
        callbackURL: 'http://health-tracking-web-app.herokuapp.com/auth/google/callback',

      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

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