import React from "react";
import { useNavigate } from "react-router-dom";

export default function HelpSupport() {
  const navigate = useNavigate();

  return (
    <div className="hs-container bg-white py-4 px-3 px-md-5">
      <h1 className="hs-title text-center mb-4">Help & Support</h1>
      <p className="hs-intro text-muted text-center mb-5">
        Welcome to the Help & Support section.
      </p>

      <div className="hs-question-section mb-5">
        <h2 className="hs-subtitle mb-3">Asked The Questions</h2>
        <ul className="hs-list">
          <li>
            <strong>How do I show in my profile?</strong><br />
            Go to the navbar and click "My Profile".
          </li>
          <li>
            <strong>How can I contact support?</strong><br />
            Email us at <a href="mailto:support@ixigo.com">support@ixigo.com</a>
          </li>
          <li>
            <strong>Where can I find my bookings?</strong><br />
            Navigate to "My Bookings" from the top menu.
          </li>
        </ul>
      </div>

      <div className="hs-contact-section text-center">
        <h2 className="hs-subtitle mb-3">Contact Support</h2>
        <p className="text-muted mb-2">Still need help?</p>
        <a href="/ContactUs" className="btn btn-outline-primary hs-contact-link">
          Contact Us
        </a>
      </div>
    </div>
  );
}
