import React from "react";
import offerimg1 from "../img/offerimg1.png";
import offerimg3 from "../img/offerimg3.png";
import offerimg5 from "../img/offerimg5.png"
import offerimg7 from "../img/offerimg7.png";
import offerimg4 from "../img/offerimg4.png";
import offerimg6 from "../img/offerimg6.png";
import offerimg2 from "../img/offerimg2.png";
import offerimg8 from "../img/offerimg8.png";
import offerimg9 from "../img/offerimg9.svg";



const offers = [
  {
    id: 1,
    title: "₹0 Payment Gateway Charges on train bookings via AU Credit Card",
    details: "No Offer Code Required",
    bank: "AU Bank",
    category: "Trains",
    expiry: "Tue, 30 Sep",
    img: offerimg7
  },
  {
    id: 2,
    title: "Lenskart Gold Membership T&Cs",
    details: "No Offer Code Required",
    bank: "Lenskart",
    category: "Eyewear",
    expiry: "Thu, 01 Jan",
    img: offerimg1
  },
  {
    id: 3,
    title: "Upto ₹200 CRED Cashback on train bookings",
    details: "No Offer Code Required",
    bank: "CRED",
    category: "Trains",
    img: offerimg6
  },
  {
    id: 4,
    title: "Ixigo Money Offer: Check PNR/Running Status & Earn ₹50 Ixigo Money",
    details: "No Offer Code Required",
    bank: "Ixigo",
    category: "App",
    img: offerimg4
  },
  {
    id: 5,
    title: "Pay ₹0 Payment Gateway On Train Bookings",
    details: "No Offer Code Required",
    bank: "UPI",
    category: "Trains",
    img: offerimg5
  },
  {
    id: 6,
    title: "Flat ₹100 Off on Flight Bookings",
    details: "Use Code: FLY100",
    bank: "All Banks",
    category: "Flights",
    expiry: "Wed, 25 Sep",
    img: offerimg8
  },
  {
    id: 7,
    title: "Extra ₹200 Cashback on Hotel Bookings via Paytm Wallet",
    details: "No Offer Code Required",
    bank: "Paytm",
    category: "Hotels",
    expiry: "Sun, 22 Sep",
    img: offerimg6
  },
  {
    id: 8,
    title: "Flat 10% Off on Bus Tickets",
    details: "Use Code: BUS10",
    bank: "All Banks",
    category: "Bus",
    expiry: "Fri, 20 Sep",
    img: offerimg7
  },
  {
    id: 9,
    title: "Special ₹50 Off for New Users",
    details: "Use Code: WELCOME50",
    bank: "All Banks",
    category: "All",
    img: offerimg9
  }
];

export default function OfferPage() {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-12 col-md-3 col-lg-2 mb-4">
          <div className="card shadow-sm p-3">
            <h6 className="fw-bold">Filters</h6>
            <hr />
            <p className="fw-bold">Popular Banks</p>

            <div className="d-flex align-items-center mb-2">
              <img src={offerimg8} alt="upi" className="me-2" width="40" />
              <span className="me-auto">UPI</span>
              <small className="text-muted">1 Offer</small>
              <input type="checkbox" className="ms-2" />
            </div>

            <div className="d-flex align-items-center mb-2">
              <img src={offerimg2} alt="cred" className="me-2" width="40" />
              <span className="me-auto">CRED</span>
              <small className="text-muted">1 Offer</small>
              <input type="checkbox" className="ms-2" />
            </div>

            <div className="d-flex align-items-center mb-2">
              <img src={offerimg7} alt="au" className="me-2" width="30" />
              <span className="me-auto">AU Bank</span>
              <small className="text-muted">1 Offer</small>
              <input type="checkbox" className="ms-2" />
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="col-12 col-md-9 col-lg-10">
          <h4 className="fw-bold mb-4">Available Offers</h4>
          <div className="row g-4">
            {offers.map((offer) => (
              <div key={offer.id} className="col-12 col-md-6 col-lg-4">
                <div className="card offer-card shadow-sm h-100">
                  <div className="offer-img position-relative">
                    <img
                      src={offer.img}
                      className="card-img-top"
                      alt={offer.title}
                    />
                    {offer.expiry && (
                      <span className="badge bg-dark expiry-badge position-absolute top-0 start-0 m-2">
                        Exp: {offer.expiry}
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    <span className="badge bg-primary me-2">{offer.category}</span>
                    {offer.bank && (
                      <span className="badge bg-secondary">{offer.bank}</span>
                    )}
                    <h6 className="mt-2 fw-bold">{offer.title}</h6>
                    <p className="text-muted small">{offer.details}</p>
                    <a
                      href="/"
                      className="text-decoration-none fw-bold text-primary"
                    >
                      Details →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
