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
    const { patientId, name, phoneNumber, email, dob, gender, bloodType, weight, medicalHistory, testName , height, muscleMass, fatPercentage} = req.body;
    
    // Only check required fields
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    // Check if patientId already exists
    const existingPatient = await Patient.findOne({ patientId });
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

    // Create new patient with tests including weight
    const newPatient = new Patient({
      patientId,
      name,
      phoneNumber,
      email: email || undefined, // Only include if provided
      dob: dob || undefined, // Only include if provided
      gender,
      bloodType: bloodType || undefined, // Only include if provided
      medicalHistory: medicalHistory ? medicalHistory.split(',') : [],
      pastTests: [{
        testName,
        testDate: new Date(),
        weight: weight || undefined, // Add weight to test
        height: height || undefined, // Add height to test
        muscleMass: muscleMass || undefined, // Add muscle mass to test 
        fatPercentage: fatPercentage || undefined, // Add fat percentage to test
        reportImages: uploadedImages
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
      selectedTests 
    } = req.body;

    // Calculate total billing
    let originalAmount = 0;
    let finalAmount = 0;

    if (selectedTests) {
      const testsArray = JSON.parse(selectedTests);
      testsArray.forEach(test => {
        originalAmount += parseFloat(test.price) || 0;
        const afterDiscount = test.price * (1 - test.discount/100);
        finalAmount += afterDiscount;
      });
    }

    // Check if user has gold membership
    const patient = await Patient.findOne({ patientId });
    const user = await User.findOne({ email: patient.email });
    const isMembershipUser = user?.membershipStatus === 'gold';

    if (isMembershipUser) {
      finalAmount = finalAmount * 0.8; // Apply additional 20% membership discount
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

    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId },
      {
        $push: {
          pastTests: {
            testName,
            testDate: new Date(),
            weight,
            height,           // Add height field
            muscleMass,       // Add muscle mass field
            fatPercentage,    // Add fat percentage field
            reportImages: uploadedImages,
            billing: {
              originalAmount,
              discount: originalAmount - finalAmount,
              finalAmount,
              membershipDiscount: isMembershipUser
            }
          }
        }
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

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
