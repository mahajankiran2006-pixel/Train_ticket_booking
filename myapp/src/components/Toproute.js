import React from "react";
import { Link } from "react-router-dom";
import GoaBeach from "../img/GoaBeach.jpg";
import Mumbai_Top from "../img/Mumbai_Top.avif";
import karnataka from "../img/karnataka.jpg";
import DelhiGate from "../img/DelhiGate.jpg";
import punetop from "../img/punetop.jpg";
import tamilnadu from "../img/tamilnadu.webp";
import howrah from "../img/howrah.jpg";
import HawaMahaltop from "../img/HawaMahaltop.jpg";

const routes = [
  { title: "Goa Trains", img: GoaBeach, from: ["Mumbai", "Bengaluru", "New Delhi", "Pune"] },
  { title: "Mumbai Trains", img: Mumbai_Top, from: ["Pune", "New Delhi", "Ahmedabad", "Surat"] },
  { title: "Bengaluru Trains", img: karnataka, from: ["Mumbai", "Chennai", "Delhi", "Hyderabad"] },
  { title: "New Delhi Trains", img: DelhiGate, from: ["Mumbai", "Jaipur", "Bengaluru", "Chandigarh"] },
  { title: "Pune Trains", img: punetop, from: ["Mumbai", "Delhi", "Bengaluru", "Nagpur"] },
  { title: "Chennai Trains", img: tamilnadu, from: ["Bengaluru", "Delhi", "Madurai", "Coimbatore"] },
  { title: "Kolkata Trains", img: howrah, from: ["Mumbai", "Delhi", "Bengaluru", "Guwahati"] },
  { title: "Jaipur Trains", img: HawaMahaltop, from: ["Mumbai", "New Delhi", "Jodhpur", "Kota"] },
];

export default function Toproute() {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Top Train Routes</h2>
      <div className="row g-3">
        {routes.map((route, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6">
            <Link to="/booking" className="text-decoration-none">
              <div className="card route-card h-100">
                {/* Image on top */}
                <div className="img-wrapper">
                  <img src={route.img} alt={route.title} className="route-img" />
                </div>
                {/* Text below */}
                <div className="card-body p-2 text-center">
                  <h6 className="fw-bold text-dark mb-1">{route.title}</h6>
                  <p className="mb-0 small text-muted">
                    From:{" "}
                    {route.from.map((city, i) => (
                      <span key={i}>
                        {city}
                        {i !== route.from.length - 1 && " • "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
