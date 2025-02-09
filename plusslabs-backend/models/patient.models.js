import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodType: { type: String, required: true },
    weight: { type: Number, required: true },
    medicalHistory: [{ type: String }], // List of past conditions

    pastTests: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" }, // Links to Test model
        testDate: { type: Date, required: true },
        reportImages: [{ type: String }] // URLs of report images
      }
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;