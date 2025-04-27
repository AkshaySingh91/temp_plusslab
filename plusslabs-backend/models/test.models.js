import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    testCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false }, // Made optional
    price: { type: Number, required: true },
    discount: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 100
    },
    category: { type: String, required: false }, // Made optional
    goldPrice: { 
      type: Number,
      default: function() {
        return this.price * 0.8;
      }
    }
  },
  { timestamps: true }
);

// Add middleware to update goldPrice whenever price changes
testSchema.pre('save', function(next) {
  if (this.isModified('price')) {
    this.goldPrice = this.price * 0.8;
  }
  next();
});

const Test = mongoose.model("Test", testSchema);
export default Test;
