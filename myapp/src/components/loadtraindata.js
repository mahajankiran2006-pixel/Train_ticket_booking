import React, { useState } from 'react';
import trainData from './trains.json'; // Adjust path as needed

export default function TrainTable() {
  const [trains, setTrains] = useState([]);

  const loadTrainData = () => {
    setTrains(trainData.trains || []);
  };

  return (
    <div className="container my-5">
      <h2>Railway Ticket Prices</h2>
      <button className="btn btn-primary mb-3" onClick={loadTrainData}>
        Load Train Data
      </button>

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
  );
}
