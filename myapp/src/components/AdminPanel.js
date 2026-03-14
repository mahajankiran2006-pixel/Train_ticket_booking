import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTicketAlt,
  FaUserTie,
  FaTrain,
  FaComments,
  FaChartLine,
  FaSignOutAlt,
  FaEnvelope,
  FaLifeRing,
  FaBell,
  FaChartPie,
  FaTable,
  FaCity
} from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import admintrain from '../img/admintrain.jpg';
import UserTickets from "./userticket";
import Userprofile from "./userprofile";
import UserContact from "./usercontact.js";
import DbTables from "./dbtables.js";
import AddTrain from "./AddTrain.js";
import DashboardCharts from "./DashboardCharts.jsx";

export default function AdminDashboard({ onAdminLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalTrains: 0, totalUsers: 0, totalBookings: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(""); 


  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/AdminPanel");
      return;
    }

    // Fetch stats from backend
    fetch("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setStats(data);
        setError("");
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch stats error:", err);
        setError("Failed to load stats. Please refresh the page.");
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    onAdminLogout();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/Admin/AdminLogin");
  };

  if (loading) {
    return (
      <div className="ixigo-admin-dashboard">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ixigo-admin-dashboard">
      <aside className="ixigo-sidebar p-3">
        <h2 className="ixigo-sidebar-title d-flex align-items-center justify-content-center mb-4">
          <FaTrainSubway className="ixigo-train-icon me-2 text-primary" size={32} />
          <span>Ixigo Admin</span>
        </h2>
        <ul className="nav flex-column ixigo-sidebar-nav flex-grow-1">
          <li className="nav-item mb-2">
            <Link
  to="#"
  className="nav-link"
  onClick={(e) => {
    e.preventDefault();
    setActivePage("tickets"); // show tickets
  }}
>
  <FaTicketAlt className="me-2" /> User Tickets
</Link>
          </li>
          <li className="nav-item mb-2">
            <Link
    to="#"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault();
      setActivePage("profile"); // Only load profile
    }}
  >
    <FaUserTie className="me-2" /> User Profile
  </Link>
            
          </li>
          <li className="nav-item mb-2">
  <Link
    to="#"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault();
      setActivePage("addTrain");
    }}
  >
    <FaTrain className="me-2" />Train-Management
  </Link>
</li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link">
              <FaComments className="me-2" /> User Interaction
            </a>
          </li>
          <li className="nav-item mb-2">
            <Link
    to="#"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault();
      setActivePage("contact"); 
    }}
  >
              <FaEnvelope className="me-2" /> Contact Messages
            </Link>
          </li>
          
          <li className="nav-item mb-2">
      <Link
  to="#"
  className="nav-link"
  onClick={(e) => {
    e.preventDefault();
    setActivePage("dashboardcharts"); 
  }}
>
  <FaChartLine className="me-2" /> Reports
</Link>

          </li>
          <li className="nav-item mb-2">
  <Link
    to="#"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault();
      setActivePage("tables"); // Show DB tables in main panel
    }}
  >
    <FaTable className="me-2" /> All Tables
  </Link>
</li>

              
          <li className="nav-item mb-2">
            <a href="#" className="nav-link">
              <FaCity className="me-2" /> City
            </a>
          </li>
        </ul>
        <button
          className="btn btn-danger w-100 mt-auto d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </aside>
      <main className="ixigo-main p-4">
        <div className="ixigo-topbar d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm rounded">
          <h3 className="ixigo-dashboard-title m-0">
            <FaChartPie className="me-2 text-primary" /> Admin Panel Overview
          </h3>
          <div className="d-flex align-items-center">
            <input
              type="search"
              placeholder="Search..."
              className="form-control me-3"
            />
            <FaBell size={22} className="me-3 text-secondary cursor-pointer" />
            <button className="btn btn-primary rounded-pill px-3">
              Profile
            </button>
          </div>
        </div>
        {error && <p className="text-danger text-center mb-4">{error}</p>}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card ixigo-card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Trains</h6>
                <p className="display-6 fw-bold text-primary">{stats.totalTrains}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card ixigo-card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Users</h6>
                <p className="display-6 fw-bold text-success">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card ixigo-card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Bookings</h6>
                <p className="display-6 fw-bold text-warning">{stats.totalBookings}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
  <img className="admintrain" src={admintrain} alt="Admin Train Dashboard" />
</div>
    {activePage === "tickets" && <UserTickets />}
  {activePage === "profile" && <Userprofile />}
  {activePage === "contact" && <UserContact />}
    {activePage === "tables" && <DbTables />}
      {activePage === "addTrain" && <AddTrain />}
      {activePage === "dashboardcharts" && <DashboardCharts stats={stats} />}

      </main>
      
    </div>
  );
}