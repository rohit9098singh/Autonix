import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    bodyType: { type: String, required: true },
    seats: Number,
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },
    featured: { type: Boolean, default: false },
    images: [String],
    // dealershipId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "DealershipInfo",
    //   required: true,
    // },
    order:Number
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
