import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loginWithGoogle, getProfile, login, signup } from '../controllers/authController.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
      res.cookie('token', token, { 
        httpOnly: true,
        secure: false, // set to true in production
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      res.redirect('http://localhost:5173/'); // Changed to redirect to home
    } catch (error) {
      res.redirect('http://localhost:5173/login');
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
