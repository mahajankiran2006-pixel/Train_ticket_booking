import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Alert } from "react-bootstrap";
import { FaTicketAlt, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/Admin/AdminLogin");
      return;
    }

    fetch("http://localhost:5000/api/tickets/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch bookings error:", err);
        setError("Failed to load bookings. Please try again.");
        setLoading(false);
      });
  }, [navigate]);

  const handleDelete = (bookingId) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    if (window.confirm("Are you sure you want to delete this booking?")) {
      fetch(`http://localhost:5000/api/tickets/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error("Delete response:", res.status, res.statusText);
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then(() => {
          setTickets(tickets.filter((ticket) => ticket._id !== bookingId));
          setError("");
        })
        .catch((err) => {
          console.error("Delete booking error:", err);
          setError("Failed to delete booking. Check server logs.");
        });
    }
  };

  const handleEdit = (bookingId) => {
    navigate(`/admin/edit-ticket/${bookingId}`);
  };

  const handleConfirm = (bookingId) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    if (window.confirm("Are you sure you want to confirm this booking?")) {
      fetch(`http://localhost:5000/api/tickets/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmed" }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error("Confirm response:", res.status, res.statusText);
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
  setTickets(
    tickets.map((ticket) =>
      ticket._id === bookingId ? { ...ticket, status: data.booking.status } : ticket
    )
  );
  setError("");
})
        .catch((err) => {
          console.error("Confirm booking error:", err);
          setError("Failed to confirm booking. Check server logs.");
        });
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="d-flex justify-content-center align-items-center vh-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white">
          <h4 className="m-0">
            <FaTicketAlt className="me-2" /> User Tickets
          </h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {tickets.length === 0 ? (
            <p className="text-center">No bookings available.</p>
          ) : (
            <Table striped bordered hover responsive className="mt-3">
              <thead className="bg-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Train Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id.substring(0, 8)}...</td>
                    <td>{booking.train_name}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={
                          booking.status === "confirmed"
                            ? "text-success"
                            : booking.status === "pending"
                            ? "text-warning"
                            : "text-danger"
                        }
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(booking._id)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                      {booking.status === "pending" && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleConfirm(booking._id)}
                        >
                          <FaCheck /> Confirm
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}