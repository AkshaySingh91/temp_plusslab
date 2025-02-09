import mongoose from "mongoose";

const consultancySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    doctorNotes: { type: String, required: true },
    prescription: { type: String },
    reportImages: [{ type: String }], // URLs of reports
  },
  { timestamps: true }
);

const Consultancy = mongoose.model("Consultancy", consultancySchema);
export default Consultancy;
