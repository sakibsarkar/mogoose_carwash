import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", bookingSchema);
export default Slot;
