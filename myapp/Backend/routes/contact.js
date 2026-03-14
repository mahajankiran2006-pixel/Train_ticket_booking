import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// CREATE new contact
router.post("/", async (req, res) => {
  const { fullname, email, phone, subject, message } = req.body;

  if (!fullname || !email || !subject || !message) {
    const missingFields = [];
    if (!fullname) missingFields.push("fullname");
    if (!email) missingFields.push("email");
    if (!subject) missingFields.push("subject");
    if (!message) missingFields.push("message");
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }

  try {
    const contact = new Contact({ fullname, email, phone, subject, message });
    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully", contact_id: contact._id });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Server error while saving contact form" });
  }
});

// READ all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Server error while fetching contacts" });
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Server error while deleting contact" });
  }
});

export default router;
