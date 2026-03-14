import express from "express";
import Train from "../models/Train.js";

const router = express.Router();

router.get("/search-trains", async (req, res) => {
  try {
    let { source, destination, date } = req.query;
    console.log("Received query params:", { source, destination, date });

    if (!source || !destination) {
      console.log("Missing required parameters");
      return res.status(400).json({ error: "Source and destination are required" });
    }

    // Normalize for regex (handle spaces and variations like Alipurduar)
    const sourceRegex = new RegExp(source.trim().replace(/\s+/g, "\\s*"), "i");
    let destRegexStr = destination.trim().replace(/\s+/g, "\\s*");
    destRegexStr = destRegexStr.replace(/Alipurduar/g, "Alipur\\s*Duar|Alipurduar\\s*Jn");
    const destRegex = new RegExp(destRegexStr, "i");

    // Build query: date optional
    let query = {
      source: sourceRegex,
      destination: destRegex
    };
    // Only include date if provided and you plan to add it to DB later
    if (date && false) { // Disable date for now since DB lacks it
      query.date = date;
    }

    console.log("MongoDB query:", query);

    // Log all documents for debugging
    const allTrains = await Train.find({}).lean();
    console.log("All trains in collection:", allTrains.map(t => ({
      train_number: t.train_number,
      source: t.source,
      destination: t.destination,
      date: t.date
    })));

    const trains = await Train.find(query).lean();
    console.log("Fetched trains:", trains.map(t => ({
      train_number: t.train_number,
      train_name: t.train_name,
      source: t.source,
      destination: t.destination,
      date: t.date
    })));

    if (!trains.length) {
      console.log("No trains found for query");
      return res.status(200).json({ 
        message: "No trains found for the selected route" + (date ? ` on ${date}` : ""), 
        data: [] 
      });
    }

    res.status(200).json({ data: trains });
  } catch (err) {
    console.error("Backend: Error fetching trains:", {
      message: err.message,
      stack: err.stack || 'No stack trace'
    });
    res.status(500).json({ error: "Server error while fetching trains" });
  }
});

export default router;