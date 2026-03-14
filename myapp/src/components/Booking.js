import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,    // Running Status
  FaTicketAlt,       // PNR Status
  FaChair,           // Train Seat
  FaSearch,          // Search
  FaSubway,          // Station
  FaTrain,           // Platform & Express
  FaBolt,            // Tatkal
  FaUtensils,          // Order Food
  FaGift,
  FaRunning,
  FaDoorOpen, 
  FaDoorClosed,
  FaSuitcase,
  FaExchangeAlt,
  FaTags
} from "react-icons/fa";
import Text from './text.js';
const features = [
  { icon: <FaMapMarkerAlt />, label: "Running Status", live: true },
  { icon: <FaTicketAlt />, label: "PNR Status Enquiry" },
  { icon: <FaChair />, label: "Train Seat Availability" },
  { icon: <FaSearch />, label: "Search By Name/Number" },
  { icon: <FaSubway />, label: "Search By Station" },
  { icon: <FaTrain />, label: "Train Platform Locator" },
  { icon: <FaBolt />, label: "Tatkal Railway Reservation" },
  { icon: <FaTrain />, label: "Vande Bharat Express" },
  { icon: <FaUtensils />, label: "Order Food On Train" },
];
export default function BookingPage() {
const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [stations, setStations] = useState([]);
  const [filteredFrom, setFilteredFrom] = useState([]);
  const [filteredTo, setFilteredTo] = useState([]);
  const [fullRefundChecked, setFullRefundChecked] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get("http://localhost:5000/station")
      .then(res => {
        setStations(res.data);
        console.log("Fetched stations:", res.data);
      })
      .catch(err => {
        console.error("Failed to fetch stations:", err);
        setError("Failed to load station list. Please try again.");
      });
  }, []);


  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setFilteredFrom(
      value.trim() === "" ? [] :
      stations.filter(s => s.stationName?.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setFilteredTo(
      value.trim() === "" ? [] :
      stations.filter(s => s.stationName?.toLowerCase().includes(value.toLowerCase()))
    );
  };

  // const selectFromStation = (name) => {
  //   setFrom(name);
  //   setFilteredFrom([]);
  // };

  // const selectToStation = (name) => {
  //   setTo(name);
  //   setFilteredTo([]);
  // };
const selectStation = (name, type) => {
    if (type === 'from') {
      setFrom(name);
      setFilteredFrom([]);
    } else {
      setTo(name);
      setFilteredTo([]);
    }
  };

  const swapValues = (e) => {
    e.preventDefault();
    setFrom(to);
    setTo(from);
  };

 
//   const [fullRefundChecked, setFullRefundChecked] = useState(false);
//   const navigate = useNavigate();

//   const today = new Date().toISOString().split("T")[0];
// const [departureDate, setDepartureDate] = useState(today);
//   const getTomorrow = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split("T")[0];
//   };
//   const getDayAfterTomorrow = () => {
//     const dayAfter = new Date();
//     dayAfter.setDate(dayAfter.getDate() + 2);
//     return dayAfter.toISOString().split("T")[0];
//   };

const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getDayAfterTomorrow = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split("T")[0]; // Fixed bug
  };

const handleSubmit = (e) => {
  e.preventDefault();
      alert(`Search Details:
          From: ${from}
          To: ${to}
          Date: ${departureDate}
          Full Refund: ${fullRefundChecked ? 'Yes' : 'No'}`);
  if (!from.trim()) {
      setError("Please enter the 'From' station.");
      return;
    }

    if (!to.trim()) {
      setError("Please enter the 'To' station.");
      return;
    }

    if (!departureDate) {
      setError("Please select a departure date.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError("The 'From' and 'To' stations cannot be the same.");
      return;
    }
  const fromStation = stations.find(s => s.stationName.toLowerCase() === from.trim().toLowerCase());
    const toStation = stations.find(s => s.stationName.toLowerCase() === to.trim().toLowerCase());

    if (!fromStation) {
      setError("Invalid 'From' station. Please select a valid station from the dropdown.");
      return;
    }
    if (!toStation) {
      setError("Invalid 'To' station. Please select a valid station from the dropdown.");
      return;
    }

    const normalizedFrom = fromStation.stationName.replace(/\s*\([^)]*\)/g, '').trim();
    const normalizedTo = toStation.stationName.replace(/\s*\([^)]*\)/g, '').trim();

    console.log("Navigating with state:", { from: normalizedFrom, to: normalizedTo, date: departureDate });

    navigate("/ResultPage", {
      state: { from: normalizedFrom, to: normalizedTo, date: departureDate },
    });
  };
  
  return (
    <>
    <form className="train-search-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-box">
          <FaSuitcase size={15} color="brown" style={{ marginRight: '-18px' }} />
          <FaRunning size={30} color='blue'/>
          
          <FaTrain size={30} color="blue" />
          <input
  className="from"
  type="text"
  placeholder="From"
  value={from}
  onChange={handleFromChange}
  list='from-stations'
/>
<datalist id="from-stations">
    {stations.map((station, idx) => (
      <option key={idx} value={station.stationName} label={`${station.stationName} (${station.stationCode})`} />
    ))}
  </datalist>
        </div>
        <FaExchangeAlt 
  onClick={swapValues} 
  size={15} 
  style={{ marginLeft: '-19px', marginRight: '-20px' }} 
  color="grey" 
/>

        {/* <button onClick={swapValues}>Swap Values</button> */}
        <div className="input-box">
           <FaRunning size={30} color="blue" style={{ transform: 'scaleX(-1)' }} />
            <FaSuitcase size={15} color="brown" style={{ marginLeft: '-17px' }} />
           {/* <FaRunning size={30} color='blue' style={{ transform: 'scaleX(-1)' }} /> */}
           <FaTrain size={30} color="blue" />
            
          {/* <span className="material-icons">train</span> */}
          <input
          className='to'
            type="text"
            placeholder="To"
            value={to}
            onChange={handleToChange}
            required
            list="to-stations"
          />
<datalist id="to-stations">
              {filteredTo.map((station, idx) => (
                <option key={idx} value={station.stationName} label={`${station.stationName} (${station.stationCode})`} />
              ))}
            </datalist>
                      </div>

        <div className="input-box date">
          <label>Departure Date</label>
          <input
            type="date"
            value={departureDate}
            min={today}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <div className="tatkal-buttons">
            <button type="button" onClick={() => setDepartureDate(getTomorrow())}>
              Tomorrow<br /><span>Tatkal Open</span>
            </button>
            <button type="button" onClick={() => setDepartureDate(getDayAfterTomorrow())}>
              Day After<br /><span>Tatkal Open</span>
            </button>
          </div>
        </div>

        <button type="submit" className="search-btn">Search</button>
      </div >

      <div className="features-row">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={fullRefundChecked}
            onChange={() => setFullRefundChecked(!fullRefundChecked)}
          />
          Get a full train fare refund
        </label>

        <div className="features">
          <span>🔇 ₹0 cancellation fee</span>
          <span>•</span>
          <span>💸 Instant full train fare refunds</span>
          <span>•</span>
          <span>💬 24×7 premium customer support</span>
          <span>•</span>
          <span>📄 No documentation required</span>
        </div>
      </div>
    </form>
  
      <div className="offer-container">
        <Link to="/offer" className="offer-button">
          <FaTags className="offer-icon" />
          <span>View Offers</span>
        </Link>
      </div>
      <div className="ixigo-container">
        <h2>Explore More With ixigo</h2>
        <div className="ixigo-grid">
          {features.map((feature, index) => (
            <div className="ixigo-item" key={index}>
              <div className="ixigo-icon">
                {feature.live && <span className="live-badge">Live</span>}
                {feature.icon}
              </div>
              <div className="ixigo-label">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Text />
      </div>

    </>
 );
}

