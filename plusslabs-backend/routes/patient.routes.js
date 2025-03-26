import express from "express";
import Patient from "../models/patient.models.js";
import User from "../models/user.models.js"; // Add this import
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, requireSuperAdmin } from '../middlewares/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ➤ Add a new patient with images
router.post("/add", upload.array('reportImages', 5), async (req, res) => {
  try {
    const { selectedTests, ...otherData } = req.body;
    
    // Only check required fields
    if (!otherData.patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    if (!otherData.name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!otherData.phoneNumber) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    if (!otherData.gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    // Check if patientId already exists
    const existingPatient = await Patient.findOne({ patientId: otherData.patientId });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient ID already exists." });
    }

    // Handle image uploads
    let uploadedImages = [];
    if (req.files) {
      const uploadPromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'patient_reports'
        })
      );
      const results = await Promise.all(uploadPromises);
      uploadedImages = results.map(result => result.secure_url);
    }

    // Update billing calculation to use finalPrice from front-end
    let finalAmount = 0;

    if (selectedTests) {
      const testsArray = JSON.parse(selectedTests);
      testsArray.forEach(test => {
        finalAmount += parseFloat(test.finalPrice) || 0; // Use the exact price passed from frontend
      });
    }

    // Create new patient with tests including weight
    const newPatient = new Patient({
      ...otherData,
      pastTests: [{
        testName: otherData.testName,
        testDate: new Date(),
        weight: otherData.weight || undefined, // Add weight to test
        height: otherData.height || undefined, // Add height to test
        muscleMass: otherData.muscleMass || undefined, // Add muscle mass to test 
        fatPercentage: otherData.fatPercentage || undefined, // Add fat percentage to test
        bloodPressure: otherData.bloodPressure || undefined,
        sugarLevels: otherData.sugarLevels || undefined,
        haemoglobin: otherData.haemoglobin || undefined,
        calcium: otherData.calcium || undefined,
        cholesterol: otherData.cholesterol || undefined,
        reportImages: uploadedImages,
        billing: {
          finalAmount // Store only the final amount
        }
      }]
    });

    await newPatient.save();
    res.status(201).json({ 
      message: "Patient added successfully", 
      patient: newPatient 
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Get a patient by ID
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add a new route to get patient by email
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Delete a patient
router.delete("/:patientId", protect, requireSuperAdmin, async (req, res) => {
  try {
    const { patientId } = req.params;
    const deletedPatient = await Patient.findOneAndDelete({ patientId });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update addTest route to include weight
router.put("/addTest/:patientId", upload.array('reportImages', 5), async (req, res) => {
  try {
    const { patientId } = req.params;
    const { 
      testName, 
      weight, 
      height,
      muscleMass,
      fatPercentage,
      selectedTests,
      isGoldPrice // Add this to track gold price selection
    } = req.body;

    // First, check if patient exists
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Calculate billing
    let finalAmount = 0;

    if (selectedTests) {
      const testsArray = JSON.parse(selectedTests);
      testsArray.forEach(test => {
        finalAmount += parseFloat(test.finalPrice) || 0; // Use the exact price passed from frontend
      });
    }

    // Handle image uploads
    let uploadedImages = [];
    if (req.files) {
      const uploadPromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'patient_reports'
        })
      );
      const results = await Promise.all(uploadPromises);
      uploadedImages = results.map(result => result.secure_url);
    }

    // Update patient with new test
    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId },
      {
        $push: {
          pastTests: {
            testName,
            testDate: new Date(),
            weight,
            height,
            muscleMass,
            fatPercentage,
            bloodPressure: req.body.bloodPressure,
            sugarLevels: req.body.sugarLevels,
            haemoglobin: req.body.haemoglobin,
            calcium: req.body.calcium,
            cholesterol: req.body.cholesterol,
            reportImages: uploadedImages,
            billing: {
              finalAmount // Store only the final amount
            }
          }
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Test added successfully",
      patient: updatedPatient
    });
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add this new route to delete a specific test from patient history
router.delete("/:patientId/test/:testId", protect, requireSuperAdmin, async (req, res) => {
  try {
    const { patientId, testId } = req.params;
    
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Remove the specific test from pastTests array
    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId },
      { $pull: { pastTests: { _id: testId } } },
      { new: true }
    );

    res.status(200).json({
      message: "Test deleted successfully",
      patient: updatedPatient
    });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
