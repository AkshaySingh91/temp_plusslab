import express from "express";
import Test from "../models/test.models.js";

const router = express.Router();

// ✅ Route to add a new test
router.post("/add", async (req, res) => {
  try {
    const { name, description, price, discount, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // ✅ Create and save the new test
    const newTest = new Test({
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

// ✅ Route to get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
