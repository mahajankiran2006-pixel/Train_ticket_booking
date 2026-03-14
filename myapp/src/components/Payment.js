import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard } from "lucide-react";
import axios from "axios";

export default function PaymentMethod({ onPaymentSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainNumber, trainName, from, to, date, passengers, selectedTicket, booking_id, status, ticket_price } = location.state || {};

  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    upi: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    wallet: "",
    walletId: "",
    bank: "",
    netbankingId: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleWalletSelect = (wallet) => {
    setFormData({ ...formData, wallet, walletId: "" });
  };

  const validate = () => {
    setError("");
    if (!selected) {
      setError("⚠️ Please select at least one payment method.");
      return false;
    }
    if (selected === "upi") {
      if (!formData.upi.match(/^[\w.-]+@[\w.-]+$/)) {
        setError("Enter a valid UPI ID (e.g., name@upi).");
        return false;
      }
    }
    if (selected === "card") {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        setError("Enter a valid 16-digit card number.");
        return false;
      }
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        setError("Enter expiry as MM/YY.");
        return false;
      }
      if (!formData.cvv.match(/^\d{3}$/)) {
        setError("Enter a valid 3-digit CVV.");
        return false;
      }
      if (!formData.cardName.trim()) {
        setError("Enter cardholder name.");
        return false;
      }
    }
    if (selected === "wallet") {
      if (!formData.wallet) {
        setError("Select a wallet first.");
        return false;
      }
      if (!formData.walletId.match(/^\d{10}$/)) {
        setError(`Enter a valid 10-digit mobile number for ${formData.wallet}.`);
        return false;
      }
    }
    if (selected === "netbanking") {
      if (!formData.bank) {
        setError("Select a bank.");
        return false;
      }
      if (!formData.netbankingId.match(/^[a-zA-Z0-9]{5,15}$/)) {
        setError("Enter a valid Netbanking ID (5-15 characters).");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await axios.put(`http://localhost:5000/api/tickets/bookings/${booking_id}/status`, {
          status: "confirmed",
        });
        alert(`✅ Payment Successful for ${trainName} (${trainNumber}) from ${from} to ${to} on ${date}!`);
        if (onPaymentSuccess) onPaymentSuccess();
        navigate("/MyBooking", {
          state: { trainNumber, trainName, from, to, date, passengers, selectedTicket, booking_id, status: "confirmed", ticket_price },
        });
      } catch (err) {
        console.error("Payment error:", err);
        setError("⚠️ Failed to confirm payment: " + (err.response?.data?.error || "Server error"));
      }
    }
  };

  const pricePerPassenger = ticket_price && passengers?.length ? Math.round(ticket_price / passengers.length) : "N/A";
  const totalPrice = ticket_price || "N/A";

  return (
    <div className="payment-container">
      <h2 className="payment-title">
        <CreditCard size={28} className="payment-icon" />
        Payment Options
      </h2>
      {trainNumber && (
        <div className="payment-booking-details">
          <h4>Booking Summary</h4>
          <p>{trainName} ({trainNumber}) from {from} to {to} on {date}</p>
          <p>Class: {selectedTicket?.class} {selectedTicket?.type ? `(${selectedTicket.type})` : ""}</p>
          <p>Passengers: {passengers?.map(p => p.name).join(", ")}</p>
          <p>Price per Passenger: ₹{pricePerPassenger}</p>
          <p>Total Amount: ₹{totalPrice}</p>
          <p>Status: {status || "Pending"}</p>
        </div>
      )}
      <div className="payment-row">
        <div className="payment-options-col">
          <ul className="payment-options">
            <li
              className={`payment-option-item ${selected === "upi" ? "payment-option-active" : ""}`}
              onClick={() => setSelected("upi")}
            >
              <i className="bi bi-upc-scan payment-option-icon"></i> UPI
            </li>
            <li
              className={`payment-option-item ${selected === "card" ? "payment-option-active" : ""}`}
              onClick={() => setSelected("card")}
            >
              <i className="bi bi-credit-card-2-front payment-option-icon"></i> Card
            </li>
            <li
              className={`payment-option-item ${selected === "wallet" ? "payment-option-active" : ""}`}
              onClick={() => setSelected("wallet")}
            >
              <i className="bi bi-wallet2 payment-option-icon"></i> Wallet
            </li>
            <li
              className={`payment-option-item ${selected === "netbanking" ? "payment-option-active" : ""}`}
              onClick={() => setSelected("netbanking")}
            >
              <i className="bi bi-bank payment-option-icon"></i> Net Banking
            </li>
          </ul>
        </div>
        <div className="payment-form-col">
          <div className="payment-form">
            {selected === "upi" && (
              <div>
                <label className="payment-label">Enter UPI ID</label>
                <input
                  type="text"
                  className="payment-input"
                  placeholder="example@upi"
                  value={formData.upi}
                  onChange={(e) => handleChange("upi", e.target.value)}
                />
              </div>
            )}
            {selected === "card" && (
              <div>
                <label className="payment-label">Card Number</label>
                <input
                  type="text"
                  className="payment-input"
                  placeholder="1234567812345678"
                  value={formData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  maxLength={16}
                />
                <div className="payment-row">
                  <div className="payment-col">
                    <label className="payment-label">Expiry</label>
                    <input
                      type="text"
                      className="payment-input"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="payment-col">
                    <label className="payment-label">CVV</label>
                    <input
                      type="password"
                      className="payment-input"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleChange("cvv", e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
                <label className="payment-label">Cardholder Name</label>
                <input
                  type="text"
                  className="payment-input"
                  placeholder="Cardholder Name"
                  value={formData.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                />
              </div>
            )}
            {selected === "wallet" && (
              <div>
                <label className="payment-label">Select Wallet</label>
                <div className="payment-wallet-buttons">
                  <button
                    className={`payment-wallet-btn ${formData.wallet === "Paytm" ? "payment-wallet-selected" : ""}`}
                    onClick={() => handleWalletSelect("Paytm")}
                  >
                    Paytm
                  </button>
                  <button
                    className={`payment-wallet-btn ${formData.wallet === "PhonePe" ? "payment-wallet-selected" : ""}`}
                    onClick={() => handleWalletSelect("PhonePe")}
                  >
                    PhonePe
                  </button>
                  <button
                    className={`payment-wallet-btn ${formData.wallet === "Amazon Pay" ? "payment-wallet-selected" : ""}`}
                    onClick={() => handleWalletSelect("Amazon Pay")}
                  >
                    Amazon Pay
                  </button>
                  <button
                    className={`payment-wallet-btn ${formData.wallet === "Google Pay" ? "payment-wallet-selected" : ""}`}
                    onClick={() => handleWalletSelect("Google Pay")}
                  >
                    Google Pay
                  </button>
                </div>
                {formData.wallet && (
                  <div>
                    <label className="payment-label">Enter {formData.wallet} Mobile Number</label>
                    <input
                      type="text"
                      className="payment-input"
                      placeholder="10-digit mobile"
                      value={formData.walletId}
                      onChange={(e) => handleChange("walletId", e.target.value)}
                      maxLength={10}
                    />
                  </div>
                )}
              </div>
            )}
            {selected === "netbanking" && (
              <div>
                <label className="payment-label">Select Bank</label>
                <select
                  className="payment-select"
                  value={formData.bank}
                  onChange={(e) => handleChange("bank", e.target.value)}
                >
                  <option value="">-- Select Bank --</option>
                  <option>SBI</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Bank</option>
                </select>
                {formData.bank && (
                  <div>
                    <label className="payment-label">Enter Netbanking ID</label>
                    <input
                      type="text"
                      className="payment-input"
                      placeholder="User ID / Customer ID"
                      value={formData.netbankingId}
                      onChange={(e) => handleChange("netbankingId", e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            {error && <p className="payment-error">{error}</p>}
            <button className="payment-submit-btn" onClick={handleSubmit}>
              <CreditCard size={16} /> Proceed to Pay
            </button>
          </div>
        </div>
      </div>
      <button className="payment-back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}