import React, { useState, useEffect } from "react";

export default function Userprofile() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const usersData = await res.json();
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${_id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user._id !== _id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="userprofile-container">
      <h1 className="heading">Admin Panel - User Registration Data</h1>
      {error && <div className="error-alert">{error}</div>}
      <div className="table-wrapper">
      <table className="ixigo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password (Hashed)</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10">No user data available</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id.substring(0, 8)}...</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>{user.country}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
