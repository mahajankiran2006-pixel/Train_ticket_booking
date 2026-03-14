import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets/bookings");
      // Make sure bookings is always an array
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("⚠️ Failed to load bookings.");
      setBookings([]); // fallback
    } finally {
      setLoading(false);
    }
  };
  fetchBookings();
}, []);

  if (loading) return <p className="text-center p-4">Loading bookings...</p>;
  if (error) return <p className="text-center p-4 text-danger">{error}</p>;

  return (
    <div className="container bookings-container py-5">
      <h2 className="text-center mb-4 text-primary">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center p-4 text-muted">No bookings found.</div>
      ) : (
        <div className="row g-4">
          {bookings.map((ticket) => (
            <div className="col-md-6" key={ticket._id}>
              <div className="card booking-card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-dark mb-2">{ticket.train_name}</h5>
                  <p className="card-text booking-subtext">
                    <strong>Booking ID:</strong> {ticket._id}
                  </p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1">
                        <strong>From:</strong> {ticket.source}
                      </p>
                      <p className="mb-1">
                        <strong>To:</strong> {ticket.destination}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1">
                        <strong>Date:</strong> {ticket.date}
                      </p>
                      <p className="mb-1">
                        <strong>Time:</strong> {ticket.departure_time}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="mb-1">
                      <strong>Passengers:</strong>{" "}
                      {ticket.passengers?.length
                        ? ticket.passengers.map(p => `${p.name} (Age: ${p.age}, ${p.gender})`).join(", ")
                        : "No passengers"}
                    </p>
                  </div>
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <span
                      className={`badge px-3 py-2 ${
                        ticket.status === "confirmed"
                          ? "bg-success"
                          : ticket.status === "pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                    <small className="text-muted">
                      Class: {ticket.ticket_class} {ticket.ticket_type ? `(${ticket.ticket_type})` : ""} | Price: ₹{ticket.ticket_price || "N/A"}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}