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
    console.log('Login attempt:', { email });

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User does not exist. Please signup first." 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password verification:', { isMatch, role: user.role });

    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign({ 
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 
    });

    // Return role info in response
    res.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      redirectTo: user.role === 'superadmin' ? '/super-admin' : '/'
    });
  } catch (error) {
    console.error('Login error:', error);
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
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('name email role avatar'); // Explicitly select avatar field
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ...existing code...
