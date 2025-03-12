import express from "express";
import Patient from "../models/patient.models.js";
const router = express.Router();

// ➤ Add a new patient
router.post("/add", async (req, res) => {
  try {
    const { patientId, dob, gender, bloodType, weight, medicalHistory } = req.body;

    // Ensure patientId is provided manually
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    // Check if patientId already exists
    const existingPatient = await Patient.findOne({ patientId });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient ID already exists." });
    }

    const newPatient = new Patient({
      patientId,
      dob,
      gender,
      bloodType,
      weight,
      medicalHistory,
      pastTests: [],
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient added successfully", patient: newPatient });
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

export default router;
