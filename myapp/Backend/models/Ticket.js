import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  class: { type: String, required: true },
  type: { type: String, default: "" },
  price: { type: Number, required: true },
  status: { type: String, default: "Available", enum: ["Available", "NOT AVL"] },
}, { collection: "tickets" });

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
