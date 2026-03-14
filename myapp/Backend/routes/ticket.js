import mongoose from "mongoose";

import express from "express";
import Ticket from "../models/Ticket.js";
import Booking from "../models/Booking.js"; // Use Booking model

const router = express.Router();

// Helper function to sanitize strings
const sanitizeString = (str) => {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, "");
};

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (dateStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
};

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ msg: "Server error fetching tickets" });
  }
});

// Fetch all bookings (renamed from /tickets to /bookings for clarity)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().lean(); // Fetch all bookings
    if (!bookings.length) {
      return res.status(404).json({ error: "No bookings available" });
    }
    console.log("Backend: Fetched bookings:", bookings.map(b => ({ id: b._id, train_name: b.train_name, status: b.status })));
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Backend: Error fetching bookings:", err.message); // Log exact error
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
});
// Create a new booking (unchanged)
router.post("/book-ticket", async (req, res) => {
  const {
    train_number,
    train_name,
    source,
    destination,
    departure_time,
    arrival_time,
    date,
    passengers,
    ticket_class,
    ticket_type,
  } = req.body;

  const sanitizedPayload = {
    train_number: sanitizeString(train_number),
    train_name: sanitizeString(train_name),
    source: sanitizeString(source),
    destination: sanitizeString(destination),
    departure_time: sanitizeString(departure_time),
    arrival_time: sanitizeString(arrival_time),
    date: sanitizeString(date),
    ticket_class: sanitizeString(ticket_class),
    ticket_type: sanitizeString(ticket_type || ""),
  };

  console.log("Backend: Received booking request:", sanitizedPayload);

  if (
    !sanitizedPayload.train_number ||
    !sanitizedPayload.train_name ||
    !sanitizedPayload.source ||
    !sanitizedPayload.destination ||
    !sanitizedPayload.departure_time ||
    !sanitizedPayload.arrival_time ||
    !sanitizedPayload.date ||
    !passengers ||
    !passengers.length ||
    !sanitizedPayload.ticket_class
  ) {
    const missingFields = [];
    if (!sanitizedPayload.train_number) missingFields.push("train_number");
    if (!sanitizedPayload.train_name) missingFields.push("train_name");
    if (!sanitizedPayload.source) missingFields.push("source");
    if (!sanitizedPayload.destination) missingFields.push("destination");
    if (!sanitizedPayload.departure_time) missingFields.push("departure_time");
    if (!sanitizedPayload.arrival_time) missingFields.push("arrival_time");
    if (!sanitizedPayload.date) missingFields.push("date");
    if (!passengers || !passengers.length) missingFields.push("passengers");
    if (!sanitizedPayload.ticket_class) missingFields.push("ticket_class");

    console.log("Backend: Validation failed - Missing fields:", missingFields);
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  if (!isValidDate(sanitizedPayload.date)) {
    console.log("Backend: Invalid date format:", sanitizedPayload.date);
    return res.status(400).json({ error: "Invalid date format: must be YYYY-MM-DD" });
  }

  const invalidPassenger = passengers.some((p) => {
    const ageNum = Number(p.age);
    if (!sanitizeString(p.name)) return true;
    if (isNaN(ageNum) || !Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 120) return true;
    if (!["Male", "Female", "Other"].includes(p.gender)) return true;
    return false;
  });
  if (invalidPassenger) {
    console.log("Backend: Validation failed - Invalid passenger details:", passengers);
    return res.status(400).json({
      error:
        "Invalid passenger details: name must be non-empty, age must be a positive integer (1-120), gender must be Male/Female/Other",
    });
  }

  // Note: Removed Ticket model check since we're using Booking; adjust logic if needed
  const ticket_price = 100 * passengers.length; // Example price; adjust based on your logic
  const existingBooking = await Booking.findOne({
    train_number: sanitizedPayload.train_number,
    date: sanitizedPayload.date,
    ticket_class: sanitizedPayload.ticket_class,
    passengers: {
      $all: passengers.map(p => ({
        name: sanitizeString(p.name),
        age: Number(p.age),
        gender: p.gender,
      })),
    },
  });
  if (existingBooking) {
    console.log("Backend: Duplicate booking detected:", existingBooking._id);
    return res.status(400).json({
      error: "Duplicate booking detected for the same train, date, class, and passengers",
    });
  }

  try {
    const booking = new Booking({
      train_number: sanitizedPayload.train_number,
      train_name: sanitizedPayload.train_name,
      source: sanitizedPayload.source,
      destination: sanitizedPayload.destination,
      departure_time: sanitizedPayload.departure_time,
      arrival_time: sanitizedPayload.arrival_time,
      date: sanitizedPayload.date,
      passengers: passengers.map(p => ({
        name: sanitizeString(p.name),
        age: Number(p.age),
        gender: p.gender,
      })),
      ticket_class: sanitizedPayload.ticket_class,
      ticket_type: sanitizedPayload.ticket_type || "",
      ticket_price,
      status: "pending",
    });

    await booking.save();
    console.log("Backend: Booking saved:", booking._id);
    res.status(201).json({
      message: "Booking created successfully",
      booking_id: booking._id,
      status: booking.status,
      ticket_price,
    });
  } catch (err) {
  console.error("Backend: Error updating booking status:", err);
  res.status(500).json({ error: "Server error while updating booking status" });
}

});

// Update booking status
router.put("/bookings/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(id); // needs mongoose import

    const booking = await Booking.findOneAndUpdate(
      { _id: objectId },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log("Backend: Booking status updated:", booking);
    res.status(200).json({ message: "Booking status updated", booking });
  } catch (err) {
    console.error("Backend: Error updating booking status:", err);
    res.status(500).json({ error: "Server error while updating booking status" });
  }
});

export default router;