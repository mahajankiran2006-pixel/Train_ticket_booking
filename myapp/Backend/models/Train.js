import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  train_number: { type: String, required: true },
  train_name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departure_time: { type: String, required: true },
  arrival_time: { type: String, required: true },
  days_running: { type: [String], default: [] },
  date: { type: String } // Optional
}, { collection: 'searchTrains' }); // Explicitly set collection name

const Train = mongoose.models.searchTrains || mongoose.model("searchTrains", trainSchema);
export default Train;