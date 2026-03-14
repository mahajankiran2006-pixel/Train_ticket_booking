import React, { useState } from 'react';
import contact from '../img/contact.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios"; // NEW: Import axios

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState(""); // NEW: State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      console.log("Backend response:", response.data);

      alert("✅ Your message has been sent successfully!");
      setError(""); // Clear any previous errors

      // Clear form
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      // Navigate to home
      navigate("/");
    } catch (err) {
      console.error("Contact form error:", err);
      console.log("Full error details:", {
        message: err.message,
        status: err.response?.status,
        errorMessage: err.response?.data?.error || "No error message provided"
      });
      setError(`⚠️ Failed to send message: ${err.response?.data?.error || "Please try again."}`);
    }
  };

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container text-center">
        <h2 className="mb-4 display-5 custom-heading">Need Help with Ixigo Rail Booking</h2>
        <p className="text-secondary mb-5 lead fs-4">
          Ixigo Railways support is here for your IRCTC ticket booking queries. Reach us via phone, email, or the form below.
        </p>
        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
      </div>

      <div className="container">
        <div className="card border border-dark rounded shadow-sm overflow-hidden">
          <div className="card-body p-0">
            <div className="row gy-3 gy-md-4 gy-lg-0">
              {/* Left side: Contact Info */}
              <div
                className="col-12 col-lg-6 bsb-overlay background-position-center background-size-cover"
                style={{ "--bsb-overlay-opacity": 0.7, backgroundImage: `url(${contact})` }}
              >
                <div className="row align-items-lg-center justify-content-center h-100">
                  <div className="col-11 col-xl-10 py-4 py-xl-5">
                    <h2 className="h1 mb-3 text-light">Get in touch</h2>
                    <p className="lead fs-4 text-light opacity-75 mb-4 mb-xxl-5">
                      Having trouble booking your IRCTC ticket via Ixigo? We’re here to help.
                    </p>
                    <div className="mb-4 mb-xxl-5 d-flex">
                      <div className="me-4 text-primary">
                        <i className="bi bi-geo fs-3"></i>
                      </div>
                      <div>
                        <h4 className="mb-3 text-light">Address</h4>
                        <address className="mb-0 text-light opacity-75">
                          2nd Floor, Veritas Building, Behind Ibis Hotel, Sector 53, Golf Course Road, Gurgaon 122002, India
                        </address>
                      </div>
                    </div>
                    <div className="row mb-4 mb-xxl-5">
                      <div className="col-12 col-xxl-6 mb-3 mb-xxl-0">
                        <div className="d-flex">
                          <div className="me-4 text-primary">
                            <i className="bi bi-telephone-outbound fs-3"></i>
                          </div>
                          <div>
                            <h4 className="mb-3 text-light">Customer Care</h4>
                            <p className="mb-0">
                              <a href="tel:18001231234" className="link-light opacity-75">
                                1800‑123‑1234
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xxl-6">
                        <div className="d-flex">
                          <div className="me-4 text-primary">
                            <i className="bi bi-envelope-at fs-3"></i>
                          </div>
                          <div>
                            <h4 className="mb-3 text-light">Email Support</h4>
                            <p className="mb-0">
                              <a href="mailto:support@ixigo.com" className="link-light opacity-75">
                                support@ixigo.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <i className="bi bi-alarm fs-3"></i>
                      </div>
                      <div>
                        <h4 className="mb-3 text-light">Booking Hours</h4>
                        <div className="text-light opacity-75">
                          <p className="mb-1">
                            <strong>Booking:</strong> 00:20 AM – 11:45 PM
                          </p>
                          <p className="mb-0">
                            <strong>Maintenance:</strong> 11:45 PM – 12:20 AM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Form */}
              <div className="col-12 col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="form-control"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message <span className="text-danger">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      {error && <p className="text-danger">{error}</p>} {/* NEW: Display error */}
                      <div className="d-grid">
                        <input
                          type="submit"
                          name="submit"
                          className="btn btn-primary btn-lg"
                          value="Send Message"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}