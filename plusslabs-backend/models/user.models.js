import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { 
      type: String,
      required: function() {
        return !this.googleId; // Password only required if not using Google auth
      },
      select: true // Make sure password is included in queries
    },
    googleId: { type: String },
    avatar: { type: String },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
      required: true
    },
    membershipStatus: { type: String, enum: ["gold", "none"], default: "none" },
  },
  { timestamps: true }
);

// Remove the duplicate index
userSchema.index({ email: 1 }, { unique: true, sparse: true });

// Remove all existing middleware and add this simple pre-save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add password comparison method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
