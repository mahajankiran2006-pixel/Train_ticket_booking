
import React from "react";
import { Link } from 'react-router-dom';
import { FaSubway, FaCog, FaWallet, FaQuestionCircle, FaShieldAlt, FaCreditCard, FaRupeeSign, FaBolt } from "react-icons/fa";
import loggedOut1 from '../img/loggedOut1.png';
import Hel from "./Hel";


function Tile({ icon, title, subtitle }) {
  return (
    <div className="tile">
      <div className="tile-icon">{icon}</div>
      <div>
        <div className="tile-title">{title}</div>
        <div className="tile-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}


export default function IxigoQuickGuide() {
  return (
    <>
      <div className="page amazing-border">
        <div className="left">
          <h2>Quick Guide</h2>
          <div className="tiles">
            <Tile icon={<FaSubway size={32} color="#2b74ff" />} title="Metro Ticket Booking" subtitle="Metro Tickets Made Simple" />
            <Tile icon={<FaCog size={32} color="#2b74ff" />} title="Account Settings" subtitle="Update email, phone no. or password" />
            <Tile icon={<FaWallet size={32} color="#2b74ff" />} title="ixigo money" subtitle="View ixigo money transaction details and rules" />
            <Tile icon={<FaQuestionCircle size={32} color="#2b74ff" />} title="Pre-booking Queries" subtitle="Facing issue while booking? Not able to book?" />
            <Tile icon={<><FaWallet size={32} color="#2b74ff" /><span className="max-badge"><FaBolt color="#2b74ff" /></span></>} title="ixigo money max" subtitle="Seamless instant refunds" />
            <Tile icon={<FaShieldAlt size={32} color="#2b74ff" />} title="ixigo assured" subtitle="Get free cancellation benefits" />
            <Tile icon={<FaCreditCard size={32} color="#2b74ff" />} title="ixigo AU Credit Card" subtitle="Your Gateway To Exclusive Perks" />
            <Tile icon={<FaRupeeSign size={32} color="#2b74ff" />} title="Manage Payment Methods" subtitle="Delete saved cards or link/delink wallets" />
          </div>
        </div>
      </div>

      <div className="right">
        <img src={loggedOut1} alt="logged" className="logged" />
        <div className="help-text">Need help with your recent booking?</div>
        <button
          onClick={() => window.location.href = './Login'}
          className="login-btn"
        >
          Log in Now
        </button>
      </div>
      <Hel />
    </>


  );
}