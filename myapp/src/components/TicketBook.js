import React, { useState, useEffect } from "react";
import { Train, CreditCard, UserMinus, UserPlus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function TicketBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainNumber, train_name, source, destination, departure_time, arrival_time, date } = location.state || {};

  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("TicketBook.js: Received location.state:", location.state);
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets/tickets");
        setTickets(response.data.map((t, index) => ({ ...t, id: index + 1 })));
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("⚠️ Failed to load ticket classes.");
      }
    };
    fetchTickets();
  }, []);

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }]);
  };

  const removePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };

  const handleChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleContinue = async () => {
  const hasPassenger = passengers.some(
    (p) => p.name.trim() !== "" && p.age !== "" && p.gender !== ""
  );
  if (!hasPassenger) {
    setError("⚠️ Please add at least one valid passenger.");
    return;
  }

  if (!selectedTicket || !selectedTicket.class) {
    setError("⚠️ Please select a valid ticket class.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    setError("⚠️ Please log in to book tickets.");
    return;
  }

  const payload = {
    train_number: trainNumber,
    train_name,
    source,
    destination,
    departure_time,
    arrival_time,
    date,
    passengers,
    ticket_class: selectedTicket.class,
    ticket_type: selectedTicket.type || "",
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/tickets/book-ticket",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Booking response:", response.data);

    setError("");
    navigate("/Payment", {
      state: {
        passengers,
        selectedTicket,
        booking_id: response.data.booking_id,
        status: response.data.status,
        trainNumber,
        trainName: train_name,
        from: source,
        to: destination,
        date,
        ticket_price: selectedTicket.price * passengers.length,
      },
    });
  } catch (err) {
    console.error("Booking error:", err.response?.data || err.message);
    setError("⚠️ Failed to create booking: " + (err.response?.data?.error || "Server error"));
  }
};

  const getTicketClassName = (ticketClass) => {
    const classMap = {
      General: "booking-ticket-general",
      Sleeper: "booking-ticket-sleeper",
      "Tatkal Sleeper": "booking-ticket-tatkal-sleeper",
      "3AC": "booking-ticket-3ac",
      "Tatkal 3AC": "booking-ticket-tatkal-3ac",
      "2AC": "booking-ticket-2ac",
      "Tatkal 2AC": "booking-ticket-tatkal-2ac",
      "1AC": "booking-ticket-1ac",
      "Tatkal 1AC": "booking-ticket-tatkal-1ac",
    };
    return classMap[ticketClass] || "booking-ticket-card";
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">
        <Train size={28} className="booking-icon" />
        Ticket Booking Summary
      </h2>
      <div className="booking-train-details">
        <h4>
          {trainNumber || "N/A"} {train_name || "Unknown Train"}
        </h4>
        <p>
          {source || "N/A"} ({departure_time || "N/A"}) → {destination || "N/A"} ({arrival_time || "N/A"})
        </p>
        <p>Date: {date || "N/A"}</p>
      </div>

      <div className="booking-passenger-card">
        <div className="booking-passenger-header">
          <span>👥 Passenger Details</span>
          <button className="booking-add-btn" onClick={addPassenger}>
            <UserPlus size={16} /> Add Passenger
          </button>
        </div>
        <div className="booking-passenger-body">
          {passengers.map((p, i) => (
            <div className="booking-passenger-row" key={i}>
              <div className="booking-passenger-input">
                <input
                  type="text"
                  className="booking-input"
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                />
              </div>
              <div className="booking-passenger-input">
                <input
                  type="number"
                  className="booking-input"
                  placeholder="Age"
                  value={p.age}
                  min={1}
                  onChange={(e) => handleChange(i, "age", e.target.value)}
                />
              </div>
              <div className="booking-passenger-input">
                <select
                  className="booking-select"
                  value={p.gender}
                  onChange={(e) => handleChange(i, "gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="booking-passenger-action">
                {passengers.length > 1 && (
                  <button
                    className="booking-remove-btn"
                    onClick={() => removePassenger(i)}
                  >
                    <UserMinus size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h4 className="booking-ticket-title">🎟️ Available Classes</h4>
      <div className="booking-ticket-row">
        {tickets.map((t) => (
          <div className="booking-ticket-col" key={t.id}>
            <div
              className={`booking-ticket-card ${getTicketClassName(t.class)} ${selectedTicket?.id === t.id ? "booking-ticket-selected" : ""}`}
              onClick={() => setSelectedTicket(t)}
            >
              <div className="booking-ticket-body">
                <h5 className="booking-ticket-class">{t.class}</h5>
                {t.type && <p className="booking-ticket-type">{t.type}</p>}
                <h6 className="booking-ticket-price">₹{t.price || "N/A"}</h6>
                <span className={`booking-ticket-status ${t.status === "NOT AVL" ? "booking-status-unavailable" : "booking-status-available"}`}>
                  {t.status || "Available"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="booking-error">{error}</p>}

      <div className="booking-continue">
        <button className="booking-continue-btn" onClick={handleContinue}>
          <CreditCard size={16} /> Continue to Payment
        </button>
      </div>
    </div>
  );
}