import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    // Optional fields
    email: String,
    dob: Date,
    bloodType: String,
    medicalHistory: [String],
    // Make pastTests optional
    pastTests: [{
      testName: String,
      testDate: { type: Date, default: Date.now },
      weight: String,
      height: String,
      muscleMass: String,
      fatPercentage: String,
      bloodPressure: String,
      sugarLevels: String,
      haemoglobin: String, 
      calcium: String,
      cholesterol: String,
      reportImages: [String],
      billing: {
        finalAmount: Number
      }
    }]
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
