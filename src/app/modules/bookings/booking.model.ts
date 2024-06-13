import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    room: {
      type: Schema.Types.ObjectId,
      ref: 'room', 
      required: true
    },
    slots: {
      type: Schema.Types.ObjectId,
      ref: 'slot', 
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user', 
      required: true
    },
    date: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    isConfirmed: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true 
  });
  
  export const bookingModel = model<TBooking>('Booking', bookingSchema);