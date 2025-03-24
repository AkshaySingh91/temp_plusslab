import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.models.js';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error('Missing required Google OAuth credentials');
  process.exit(1);
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://plusslabs.onrender.com/api/auth/google/callback"
      : "http://localhost:3000/api/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails[0].value },
          { googleId: profile.id }
        ]
      });
      
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value
        });
      }
      
      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
