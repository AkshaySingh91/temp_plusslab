import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    status: { 
      type: String, 
      enum: ["active", "expired", "deactivated"], 
      default: "deactivated" 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deactivatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deactivationReason: String,
    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
