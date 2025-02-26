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
  console.log('Configuring Google OAuth with:');
  console.log('- Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
  console.log('- Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
  console.log('- Callback URL:', process.env.NODE_ENV === 'production' 
    ? (process.env.CALLBACK_URL || 'https://health-tracking-web-app-6e8c4e692779.herokuapp.com/auth/google/callback')
    : '/auth/google/callback');
  console.log('- Environment:', process.env.NODE_ENV);

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
        console.log('Google OAuth callback received for profile:', profile.id);
        
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          db.findOne({ googleId: profile.id }, (err, user) => {
            if (err) {
              console.error('Error finding user:', err);
              return done(err);
            }

            if (user) {
              // User exists
              console.log('Existing user found:', user._id);
              done(null, user);
            } else {
              // Create new user
              console.log('Creating new user for:', profile.displayName);
              db.insert(newUser, (err, user) => {
                if (err) {
                  console.error('Error creating user:', err);
                  return done(err);
                }
                console.log('New user created:', user._id);
                done(null, user);
              });
            }
          });
        } catch (error) {
          console.error('Exception in Google strategy:', error);
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user._id);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('Deserializing user:', id);
    db.findOne({ _id: id }, (err, user) => {
      if (err) {
        console.error('Error deserializing user:', err);
      } else if (!user) {
        console.error('User not found during deserialization:', id);
      } else {
        console.log('User deserialized successfully:', user._id);
      }
      done(err, user);
    });
  });
};