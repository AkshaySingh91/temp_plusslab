import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Patient/Test/Consultancy ID
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
export default AdminLog;
