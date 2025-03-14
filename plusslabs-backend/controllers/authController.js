import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginWithGoogle = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User does not exist. Please signup first." 
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Please login with Google"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign({ 
      id: user._id,
      role: user.role // Include role in token
    }, process.env.JWT_SECRET);
    
    res.cookie('token', token, { httpOnly: true });
    res.json({ success: true, user: { ...user._doc, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "Email already registered. Please login instead." 
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({ 
      success: true,
      message: "Signup successful! Please login to continue."
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ...existing code...
