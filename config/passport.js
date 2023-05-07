// Import required packages and modules
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Datastore = require('nedb');

// Create or load users database file
const db = new Datastore({ filename: 'users.db', autoload: true });

// Configure and export passport Google authentication strategy
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Define new user data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // Check if user exists or create a new user
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

  // Serialize and deserialize user for session management
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    db.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
