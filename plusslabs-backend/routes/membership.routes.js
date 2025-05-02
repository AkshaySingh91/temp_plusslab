import express from 'express';
import { protect, requireSuperAdmin } from '../middlewares/auth.js';
import Membership from '../models/membership.models.js';
import User from '../models/user.models.js';

const router = express.Router();

const deactivateExpiredMemberships = async () => {
  try {
    const now = new Date();
    const expiredMemberships = await Membership.find({
      status: 'active',
      endDate: { $lt: now }
    });

    for (const membership of expiredMemberships) {
      await Membership.findByIdAndUpdate(membership._id, {
        status: 'expired',
        lastModified: now
      });

      await User.findByIdAndUpdate(membership.userId, {
        membershipStatus: 'none'
      });
    }
  } catch (error) {
    console.error('Error deactivating expired memberships:', error);
  }
};

router.post('/activate', protect, requireSuperAdmin, async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.body;
    
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid date format" 
      });
    }

    // Create or update membership with discount info
    const membership = await Membership.findOneAndUpdate(
      { userId },
      {
        $set: {
          status: 'active',
          startDate: start,
          endDate: end,
          activatedBy: req.user._id,
          lastModified: now,
          discountPercentage: 20,
          discountType: 'gold'
        }
      },
      { upsert: true, new: true }
    );

    // Update user status
    await User.findByIdAndUpdate(userId, 
      { membershipStatus: 'gold' },
      { new: true }
    );

    res.json({ 
      success: true,
      message: "Membership activated successfully",
      membership
    });

  } catch (error) {
    console.error('Membership activation error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to activate membership"
    });
  }
});

router.post('/deactivate', protect, requireSuperAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Update membership status
    await Membership.findOneAndUpdate(
      { userId },
      {
        $set: {
          status: 'deactivated',
          deactivatedBy: req.user._id,
          lastModified: new Date()
        }
      }
    );

    // Update user status
    await User.findByIdAndUpdate(userId, { membershipStatus: 'none' });

    res.json({ 
      success: true,
      message: "Membership deactivated successfully"
    });

  } catch (error) {
    console.error('Membership deactivation error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to deactivate membership"
    });
  }
});

router.get('/status', protect, async (req, res) => {
  try {
    await deactivateExpiredMemberships();
    
    const membership = await Membership.findOne({ 
      userId: req.user._id,
      status: 'active'
    });

    if (!membership) {
      return res.json({ 
        active: false,
        message: 'No active membership found'
      });
    }

    // Check if membership is expired
    const now = new Date();
    const endDate = new Date(membership.endDate);
    
    if (endDate <= now) {
      await Membership.findByIdAndUpdate(membership._id, { status: 'expired' });
      await User.findByIdAndUpdate(req.user._id, { membershipStatus: 'none' });
      
      return res.json({ 
        active: false,
        message: 'Membership has expired'
      });
    }

    res.json({
      active: true,
      startDate: membership.startDate,
      endDate: membership.endDate,
      message: 'Active membership found'
    });

  } catch (error) {
    console.error('Membership status check error:', error);
    res.status(500).json({ 
      active: false,
      message: error.message 
    });
  }
});

// Add this new route
router.get('/user/:userId', protect, requireSuperAdmin, async (req, res) => {
  try {
    const membership = await Membership.findOne({ 
      userId: req.params.userId,
      status: 'active'
    });

    if (!membership) {
      return res.json({ 
        active: false,
        message: 'No active membership found'
      });
    }

    const now = new Date();
    const endDate = new Date(membership.endDate);
    
    res.json({
      active: endDate > now,
      startDate: membership.startDate,
      endDate: membership.endDate
    });
  } catch (error) {
    res.status(500).json({ 
      active: false,
      message: error.message 
    });
  }
});

setInterval(deactivateExpiredMemberships, 1000 * 60 * 60); // Check every hour
deactivateExpiredMemberships(); // Run immediately on server start

export default router;
