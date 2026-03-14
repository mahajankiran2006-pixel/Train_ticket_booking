
import React,{ useEffect, useState } from 'react';
/*Img Of scrolling */
import trainData from './trains.json';
import cityData from './cities.json';

import getconfirm from '../img/getconfirm.webp';
import authorized from '../img/authorized.webp';
import travel from '../img/travel.png';
import freecancel from '../img/freecancel.avif';
import instantrefund from '../img/instantrefund.webp';
import feevia from '../img/feevia.webp';
import customer from '../img/customer.webp';
/*img of cities */
import nagpur from '../img/nagpur.webp';
import kolkata from '../img/kolkata.jpg';
import mumbai from '../img/mumbai.jpg';
import udaipur from '../img/udaipur.webp';
import darjiling from '../img/darjiling.jpg';
import surat from '../img/surat.jpg';
import newdelhi from '../img/newdelhi.jpg';
import chennai from '../img/chennai.jpg';
import bangalore from '../img/bangalore.webp';

import jodhpur from '../img/jodhpur.jpg';
import delhi from '../img/delhi.jpg';


import lakhnow from '../img/lakhnow.webp';
import kashmir from '../img/kashmir.jpg';
import haidrabaad from '../img/haidrabaad.jpg';
import lehladakh from '../img/lehladakh.webp';
import ahemdabaad from '../img/ahemdabaad.jpg';
import jaipur from '../img/jaipur.webp';
import ujjain from '../img/ujjain.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import rixigo from '../img/rixigo.png';
import Toproute from './Toproute';
import Animate from './AnimationHome';

const cityImages = [
    nagpur, kolkata, mumbai, udaipur, darjiling, surat,
    newdelhi, chennai, bangalore, jodhpur, delhi, ahemdabaad,
    lakhnow, kashmir, haidrabaad, lehladakh, jaipur, ujjain
];


export default function Home() {
const [cities, setCities] = useState([]);
  const [trains, setTrains] = useState([]);

  const loadCityData = () => {
    setCities(cityData.mega_cities || []);
  };

  const loadTrainData = () => {
    setTrains(trainData.trains || []);
  };

  const fullCityList = [...cityImages, ...cityImages]; // To enable infinite scroll effect

  return (
    <>
      {/* Hero Image */}
      <div className="image-container">
        <img className="getconfirmimg" src={getconfirm} alt="get logo" />
      </div>
      <p className="w">Why Choose Ixigo ?</p>

      {/* Why Choose Us Scroll */}
      <div className="scroll-container">
        <div className="image-wrapper">
          <img src={authorized} alt="Authorized" className="scroll-image" />
          <img src={travel} alt="Travel" className="scroll-image" />
          <img src={freecancel} alt="Free Cancel" className="scroll-image" />
          <img src={instantrefund} alt="Instant Refund" className="scroll-image" />
          <img src={feevia} alt="Fee via" className="scroll-image" />
          <img src={customer} alt="Customer" className="scroll-image" />
        </div>
      </div>

      
      <div className="container-fluid my-5">
        <h2 className="s">Search For Cities ?</h2>
        <div className="scroll-container">
          <div className="scroll-track">
            {fullCityList.map((img, index) => (
              <div key={index} className="scroll-item">
                <img src={img} alt={`City ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
  <div className="container my-5">
      <div className="mb-3">
  <button className="btn btn-primary" onClick={loadCityData}>
    Load City Data
  </button>
</div>



      {/* City Data Table */}
      {cities.length > 0 && (
        <div className="my-4">
          <h2>City Data</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>City Name</th>
                <th>Trip Worth (INR)</th>
                <th>Popular Attractions</th>
                <th>Best Time to Visit</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td>{city.city_name}</td>
                  <td>₹{city.trip_worth}</td>
                  <td>{city.popular_attractions.join(', ')}</td>
                  <td>{city.best_time_to_visit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
<div className="mb-4">
  <button className="btn btn-success" onClick={loadTrainData}>
    Load Train Data
  </button>
</div>
      {/* Train Data Table */}
      {trains.length > 0 && (
        <div className="my-4">
          <h2>Train Data</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>General</th>
                <th>Sleeper</th>
                <th>Economy</th>
                <th>1AC</th>
                <th>2AC</th>
                <th>3AC</th>
                <th>First Class</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train, index) => (
                <tr key={index}>
                  <td>{train.train_name}</td>
                  <td>{train.route}</td>
                  <td>{new Date(train.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{new Date(train.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{train.price.general}</td>
                  <td>{train.price.sleeper}</td>
                  <td>{train.price.economy}</td>
                  <td>{train.price['1ac']}</td>
                  <td>{train.price['2ac']}</td>
                  <td>{train.price['3ac']}</td>
                  <td>{train.price.first_class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Toproute/>
    <div><Animate /></div>
      {/* Footer App Promotion */}
      <p className="d">Download For Seamless Experience</p>
      <div className="playstore">
        <img className="rixigo" src={rixigo} alt="rixigo app" />
      </div>
    </>
  );
}