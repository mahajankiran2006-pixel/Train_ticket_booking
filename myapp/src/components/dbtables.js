// DbTables.js
import React from "react";
import "./dbtables.css";

export default function DbTables() {
  const tables = {
    admins: ["_id", "username", "email", "password", "createdAt", "__v"],
    bookings: [
      "_id", "train_number", "train_name", "source", "destination",
      "departure_time", "arrival_time", "booking_date", "ticket_class",
      "ticket_type", "ticket_price", "passengers", "status", "createdAt",
    ],
    contacts: ["_id", "fullname", "email", "phone", "subject", "message", "createdAt"],
    searchTrains: [
      "_id", "train_number", "train_name", "source", "destination",
      "departure_time", "arrival_time", "days_running", "stops",
    ],
    tickets: ["_id", "class", "price", "status", "type", "createdAt"],
    users: [
      "_id", "firstName", "lastName", "username", "email", "password",
      "dob", "gender", "phone", "country", "createdAt", "updatedAt", "__v",
    ],
  };

  return (
    <div className="db-container">
      <h2 className="db-title">All Database Tables</h2>
      {Object.entries(tables).map(([tableName, headers]) => (
        <div key={tableName} className="db-table-wrapper">
          <h3 className="db-table-name">{tableName}</h3>
          <div className="db-table-scroll">
            <table className="db-table">
              <thead className="db-table-head">
                <tr>
                  {headers.map(header => (
                    <th key={header} className="db-th">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {headers.map(header => (
                    <td key={header} className="db-td">
                      {/* Empty */}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
