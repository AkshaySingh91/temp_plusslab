import express from 'express';
import { protect, requireSuperAdmin } from '../middlewares/auth.js';
import User from '../models/user.models.js';

const router = express.Router();

// Get all users (super admin only)
router.get('/users', protect, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (super admin only)
router.put('/users/:userId/role', protect, requireSuperAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (super admin only)
router.delete('/users/:userId', protect, requireSuperAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Prevent super admin deletion
    const user = await User.findById(userId);
    if (user.role === 'superadmin') {
      return res.status(403).json({ message: "Cannot delete super admin user" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
