import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false }, // Changed to not required
    dob: { type: Date, required: false }, // Changed to not required
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodType: { type: String, required: false }, // Changed to not required
    medicalHistory: [{ type: String }],
    pastTests: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        testName: { type: String, required: true },
        testDate: { type: Date, required: true },
        weight: { type: String },
        height: { type: String },
        muscleMass: { type: String },
        fatPercentage: { type: String },
        bloodPressure: { type: String },
        sugarLevels: { type: String },
        haemoglobin: { type: String },
        calcium: { type: String },
        cholesterol: { type: String },
        reportImages: [{ type: String }],
        billing: {
          originalAmount: { type: Number },
          finalAmount: { type: Number, required: true } // This will store the exact amount added
        }
      }
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
