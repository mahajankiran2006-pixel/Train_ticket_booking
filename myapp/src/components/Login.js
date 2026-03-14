import React, { useState } from 'react';
import R from '../img/R.png';
import trbooikng from '../img/trbooikng.png';
import loginPageimg from '../img/loginPageimg.jpg';
import { useNavigate } from "react-router-dom";   
import { Link } from 'react-router-dom';

export default function Loginixi({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login error:", data);
        setError(data.msg || "Login failed");
        setIsSubmitting(false);
        return;
      }

      // Save token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login successful:", data.user);
      onLogin?.();
      navigate("/MyProfile");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginPageimg" style={{ backgroundImage: `url(${loginPageimg})` }}>
        <div className="login-overlay">
          <div className="login-main">
            <h1 className="login-heading">
              Log in for a seamless experience
              <hr className="login-divider" />
            </h1>

            <div className="login-form-group">
              <label className="login-label" htmlFor="username">Username</label>
              <input
                className="login-input"
                type="text"
                placeholder="Enter Name"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <br /><br />
              <label className="login-label" htmlFor="password">Password</label>
              <input
                className="login-input"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <br /><br />
              <span className="login-error">{error}</span>
            </div>

           <input
              className="login-submit"
              type="submit"
              value={isSubmitting ? "Logging in..." : "Login"}
              disabled={isSubmitting}
            />
            <div className='noacc'>
 <p style={{ fontSize:'18px', textAlign: 'center', color: 'white', marginTop: '20px' }}>
  If you don't have an account, please 
  <Link className='sign' to="/SignUp" style={{ color: '#66afe9', textDecoration: 'underline', marginLeft: '5px' }}>
    SignUp
  </Link> first.
</p>
           </div>
          </div>
        </div>
      </div>
    </form>
  );
}