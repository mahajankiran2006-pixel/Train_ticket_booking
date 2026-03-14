import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import manimage from "../img/manimage.png";
import plantimage from "../img/plantimage.png";

export default function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Admin login error:", data);
        setError(data.msg || "Admin login failed. Please check your credentials.");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      console.log("Admin login successful:", data.admin);
      onAdminLogin?.();
      navigate("/AdminPanel"); // Fixed typo
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-man">
        <img src={manimage} alt="Admin Man" />
      </div>
      <div className="admin-computer-wrapper">
        <div className="admin-computer">
          <div className="admin-screen">
            <h3 className="text-center mb-4">Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-danger text-center">{error}</p>}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn admin-login-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div className="admin-stand"></div>
          <div className="admin-table">
            <div className="admin-plant">
              <img src={plantimage} alt="Plant" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}