import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Discount for non-Gold users
    category: { type: String, required: true },
    goldPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Auto-calculate Gold Membership Price (20% off)
testSchema.pre("save", function (next) {
  this.goldPrice = this.price * 0.8;
  next();
});

const Test = mongoose.model("Test", testSchema);
export default Test;
