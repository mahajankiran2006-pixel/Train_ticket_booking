
import React, { useState } from 'react';
import cityData from './cities.json'; // ✅ Direct import

export default function CityTable() {
  const [cities, setCities] = useState([]);

  const loadCityData = () => {
    setCities(cityData.mega_cities || []);
  };

  return (
    <div className="container my-5">
      <h1>India's Mega Cities and Trip Worth</h1>
      <button className="btn btn-primary mb-3" onClick={loadCityData}>
        Load City Data
      </button>

      <table className="table table-bordered" id="city-table">
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
  );
}
