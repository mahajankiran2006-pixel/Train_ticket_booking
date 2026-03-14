import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  train_number: { type: String, required: true },
  train_name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departure_time: { type: String, required: true },
  arrival_time: { type: String, required: true },
  date: { type: String, required: true },
  passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
  }],
  ticket_class: { type: String, required: true },
  ticket_type: { type: String },
  ticket_price: { type: Number },
  booking_date: { type: Date, default: Date.now },
  status: { type: String, default: "pending", enum: ["pending", "confirmed"] }
}, { collection: "bookings" });

const Booking = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);
export default Booking;