import React, { useState } from "react";
import "./add.css";
export default function AddTrain() {
  const [formData, setFormData] = useState({
    train_number: "",
    train_name: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    days_running: [],
    date: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (e) => {
    const { options } = e.target;
    const selectedDays = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedDays.push(options[i].value);
    }
    setFormData((prev) => ({ ...prev, days_running: selectedDays }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // Get token stored in localStorage
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Not authorized");
      return;
    }

    try {
      // ✅ Send Authorization header here
      const res = await fetch("http://localhost:5000/api/admin/addTrain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- THIS IS WHERE YOU ADD IT
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to add train");

      setSuccess("Train added successfully!");
      setFormData({
        train_number: "",
        train_name: "",
        source: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        days_running: [],
        date: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-train-container">
  <h2>Add New Train</h2>
  {success && <p className="success-message">{success}</p>}
  {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="train_number" placeholder="Train Number" value={formData.train_number} onChange={handleChange} required />
        <input type="text" name="train_name" placeholder="Train Name" value={formData.train_name} onChange={handleChange} required />
        <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
        <input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
        <input type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} required />
        <select multiple name="days_running" value={formData.days_running} onChange={handleDaysChange}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
}
