import React from "react";
import { Link } from "react-router-dom";

export default function UserPanel() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold text-primary">User Dashboard</h2>
        <div className="row">
          
          {/* Profile */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 text-center p-3 border-0 shadow-sm rounded-3">
              <i className="bi bi-person-circle fs-1 text-primary"></i>
              <h5 className="mt-3">My Profile</h5>
              <Link to="/MyProfile" className="btn btn-outline-primary mt-2">View</Link>

            </div>
          </div>

          {/* Booking History */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 text-center p-3 border-0 shadow-sm rounded-3">
              <i className="bi bi-ticket-detailed fs-1 text-success"></i>
              <h5 className="mt-3">My Bookings</h5>
              <Link to="/MyBooking" className="btn btn-outline-success mt-2">Check</Link>
            </div>
          </div>

          {/* Offers */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 text-center p-3 border-0 shadow-sm rounded-3">
              <i className="bi bi-gift fs-1 text-danger"></i>
              <h5 className="mt-3">Offers</h5>
              <Link to="/Offer" className="btn btn-outline-danger mt-2">Explore</Link>
            </div>
          </div>

          {/* Support */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 text-center p-3 border-0 shadow-sm rounded-3">
              <i className="bi bi-headset fs-1 text-warning"></i>
              <h5 className="mt-3">Support</h5>
              <Link to="/Helpus" className="btn btn-outline-warning mt-2">Get Help</Link>
            </div>
          </div>

          {/* Logout */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 text-center p-3 border-0 shadow-sm rounded-3">
              <i className="bi bi-box-arrow-right fs-1 text-dark"></i>
              <h5 className="mt-3">Logout</h5>
              <button 
                className="btn btn-dark mt-2"
                onClick={() => { window.location.href = "/Login"; }}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
