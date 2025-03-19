import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    testCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { 
      type: Number, 
      default: 0,  // Allow manual discount setting
      min: 0,
      max: 100
    },
    category: { type: String, required: true },
    goldPrice: { 
      type: Number,
      default: function() {
        // Calculate final price after regular discount
        const regularDiscountedPrice = this.price * (1 - this.discount/100);
        // Apply additional 20% gold discount on final price
        return regularDiscountedPrice * 0.8;
      }
    }
  },
  { timestamps: true }
);

// Recalculate goldPrice whenever price or discount changes
testSchema.pre("save", function (next) {
  const regularDiscountedPrice = this.price * (1 - this.discount/100);
  this.goldPrice = regularDiscountedPrice * 0.8;
  next();
});

const Test = mongoose.model("Test", testSchema);
export default Test;
