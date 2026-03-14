import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, date } = location.state || {};

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goBack = () => navigate(-1);

  const handleBook = (train) => {
    console.log("Navigating to TicketBook with train:", train);
    navigate("/TicketBook", {
      state: {
        trainNumber: train.train_number,
        train_name: train.train_name,
        source: train.source,
        destination: train.destination,
        departure_time: train.departure_time,
        arrival_time: train.arrival_time,
        date,
      },
    });
  };

  useEffect(() => {
    console.log("Received state in ResultsPage:", { from, to, date });
    if (!from || !to || !date) {
      setError("Please select a valid 'From', 'To', and date.");
      setLoading(false);
      return;
    }

    const fetchTrains = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Sending search params:", { source: from, destination: to, date });
        const response = await axios.get("http://localhost:5000/api/trains/search-trains", {
          params: { source: from, destination: to, date },
        });
        console.log("Raw response data:", response.data);

        // FIX: Handle both array and object responses
        let trainsData;
        if (Array.isArray(response.data)) {
          trainsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          trainsData = response.data.data;
        } else if (response.data && response.data.message) {
          trainsData = response.data.data || [];
          setError(response.data.message || "No trains found for the selected route and date.");
        } else {
          trainsData = [];
          setError("Unexpected response format.");
        }
        // Filter valid trains
        const validTrains = trainsData.filter(
          (train) =>
            train.train_number &&
            train.train_name &&
            train.source &&
            train.destination &&
            train.departure_time &&
            train.arrival_time
        );
        console.log("Filtered valid trains:", validTrains);
        setTrains(validTrains);

        if (validTrains.length === 0 && !error) {
          setError("No valid trains found for the selected route and date.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.error || "Failed to load trains. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to, date]);

  if (!from || !to || !date) {
    return <p className="results-message">Please select a valid 'From', 'To', and date.</p>;
  }

  if (loading) return <p className="results-message">Loading trains...</p>;
  if (error) return <p className="results-message">Error: {error}</p>;

  return (
    <div className="results-page">
      <h2 className="results-title">Search Trains</h2>
      {trains.length === 0 && !loading && !error && (
        <p className="results-message">
          No trains found for the route from {from} to {to} on {date}. Please try a different route or date.
        </p>
      )}
      {trains.map((train, idx) => (
        <div className="results-card" key={idx}>
          <div className="results-header">
            <div className="results-left">
              <h5 className="results-train-name">
                {train.train_number} {train.train_name}
              </h5>
              <p className="results-train-days">
                Runs on: <span className="results-days">{train.days_running?.join(" ") || "N/A"}</span>
              </p>
            </div>
            <div className="results-center">
              <div className="results-journey-line">
                <div className="text-center">
                  <h6 className="results-time">
                    {train.source} <span>{train.departure_time}</span>
                  </h6>
                </div>
                <div className="position-relative flex-grow-1 mx-3">
                  <div className="results-line-bg"></div>
                  <div className="results-dot results-start-dot"></div>
                  <div className="results-dot results-end-dot"></div>
                  <div className="results-duration">Duration TBD</div>
                </div>
                <div className="text-center">
                  <h6 className="results-time">
                    {train.destination} <span>{train.arrival_time}</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="results-right">
              <button
                className="results-availability-btn"
                onClick={() => handleBook(train)}
                disabled={!train.train_number || !train.train_name}
              >
                BOOK
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="results-back-btn" onClick={goBack}>
        Back to Search
      </button>
    </div>
  );
}