import express from "express";
import Patient from "../models/patient.models.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ➤ Add a new patient with images
router.post("/add", upload.array('reportImages', 5), async (req, res) => {
  try {
    const { patientId, phoneNumber, dob, gender, bloodType, weight, medicalHistory, testName } = req.body;
    
    // Ensure patientId is provided manually
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required." });
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

    // Create new patient with images and test name
    const newPatient = new Patient({
      patientId,
      phoneNumber,
      dob,
      gender,
      bloodType,
      weight,
      medicalHistory: medicalHistory ? medicalHistory.split(',') : [],
      pastTests: [{
        testName,
        testDate: new Date(),
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

// ➤ Delete a patient
router.delete("/:patientId", async (req, res) => {
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

router.put("/addTest/:patientId", upload.array('reportImages', 5), async (req, res) => {
  try {
    const { patientId } = req.params;
    const { testName } = req.body;

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
            reportImages: uploadedImages
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

export default router;
