import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loginWithGoogle, getProfile, login, signup } from '../controllers/authController.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

const FRONTEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://plusslabs.com'
  : 'http://localhost:5173';

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
      res.cookie('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production, false in dev
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      res.redirect(FRONTEND_URL);
    } catch (error) {
      res.redirect(`${FRONTEND_URL}/login`);
    }
  }
);

router.post('/signup', signup);

router.post('/login', login);

router.get('/profile', protect, getProfile);

router.get('/dashboard', protect, requireAdmin, (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
  });
});

export { router as default };
