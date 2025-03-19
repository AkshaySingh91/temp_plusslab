import express from "express";
import Test from "../models/test.models.js";
import { protect, requireSuperAdmin, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Only superadmin can add new tests
router.post("/add", protect, requireSuperAdmin, async (req, res) => {
  try {
    const { testCode, name, description, price, discount, category } = req.body;

    if (!testCode || !name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if testCode already exists
    const existingTest = await Test.findOne({ testCode });
    if (existingTest) {
      return res.status(400).json({ message: "Test code already exists." });
    }

    // ✅ Create and save the new test
    const newTest = new Test({
      testCode,
      name,
      description,
      price,
      discount: discount || 0,
      category,
    });

    await newTest.save();

    res.status(201).json({ message: "Test added successfully!", test: newTest });
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Public route to get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add route to get test by code
router.get("/code/:testCode", async (req, res) => {
  try {
    const test = await Test.findOne({ testCode: req.params.testCode });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin and superadmin can update tests
router.put("/update/:testId", protect, requireAdmin, async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.testId,
      req.body,
      { new: true }
    );
    res.json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Only superadmin can delete tests
router.delete("/:testId", protect, requireSuperAdmin, async (req, res) => {
  try {
    const { testId } = req.params;
    const deletedTest = await Test.findByIdAndDelete(testId);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting Test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
