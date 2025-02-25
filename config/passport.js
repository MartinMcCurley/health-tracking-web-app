const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Datastore = require('nedb');
const path = require('path');
const db = new Datastore({ 
  filename: path.join(__dirname, '..', 'users.db'), 
  autoload: true,
  inMemoryOnly: process.env.NODE_ENV === 'production' // Use in-memory storage for production (Heroku)
});

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV === 'production' 
          ? (process.env.CALLBACK_URL || 'https://health-tracking-web-app-6e8c4e692779.herokuapp.com/auth/google/callback')
          : '/auth/google/callback',
        proxy: true // Trust proxy - needed for Heroku
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
          done(error, null);
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