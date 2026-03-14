import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch profile from backend
  useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your profile.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching profile with token:", token.substring(0, 10) + "...");
      const res = await axios.get("http://localhost:5000/api/users/MyProfile", {
  headers: { Authorization: `Bearer ${token}` },
});

      const userData = res.data.data || res.data;
      console.log("Profile data received:", userData);
      setUser(userData);
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dob: formatDateForInput(userData.dob),
        country: userData.country || "",
        gender: userData.gender || "",
        avatar: userData.avatar || null,
      });
      setError(null);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: null }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to update your profile.");
        return;
      }
      const { _id, __v, password, confirmPassword, ...updates } = formData;
      console.log("Sending updates:", updates);

      const res = await axios.put(
  "http://localhost:5000/api/profile/users/MyProfile", // add /profile here
  updates,
  { headers: { Authorization: `Bearer ${token}` } }
);

      console.log("Update response:", res.data);
      setUser(res.data.data || res.data);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dob: formatDateForInput(user?.dob),
      country: user?.country || "",
      gender: user?.gender || "",
      avatar: user?.avatar || null,
    });
    setEditMode(false);
    setError(null);
  };

  if (loading) {
    return <Container className="mt-5"><p>Loading profile...</p></Container>;
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Container>
    );
  }

  if (!user) {
    return <Container className="mt-5"><p>No profile data available.</p></Container>;
  }

  return (
    <Container className="mt-5 profile-page">
      <Card className="profile-card shadow-lg">
        <Row className="g-0">
          <Col md={4} className="profile-avatar-container text-center p-4">
            <img
              src={
                editMode
                  ? formData?.avatar || "https://placehold.co/150x150"
                  : user?.avatar || "https://placehold.co/150x150"
              }
              alt="User Avatar"
              className="img-fluid rounded-circle profile-avatar"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #007bff",
              }}
            />
            <h4 className="mt-3">
              {editMode
                ? `${formData?.firstName || ""} ${formData?.lastName || ""}`
                : `${user?.firstName || ""} ${user?.lastName || ""}`}
            </h4>
            <p>{editMode ? formData?.email || "" : user?.email || ""}</p>
            {editMode && (
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Change Avatar</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
              </Form.Group>
            )}
            <div className="profile-button-group mt-3">
              {!editMode ? (
                <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="success" onClick={handleSave}>Save</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                  {formData.avatar && <Button variant="danger" onClick={handleRemoveAvatar}>Remove Avatar</Button>}
                </>
              )}
            </div>
          </Col>
          <Col md={8}>
            <Card.Body className="p-4">
              <h5 className="mb-3">Profile Information</h5>
              {[
                { label: "First Name", name: "firstName", placeholder: "Enter First Name" },
                { label: "Last Name", name: "lastName", placeholder: "Enter Last Name" },
                { label: "Username", name: "username", placeholder: "User Name" },
                { label: "Email Address", name: "email", placeholder: "Enter Email" },
                { label: "Phone Number", name: "phone", placeholder: "Enter Phone No" },
                { label: "Date of Birth", name: "dob", placeholder: "yyyy-mm-dd", type: "date" },
                { label: "Country", name: "country", placeholder: "Enter Country" },
              ].map(({ label, name, placeholder, type = "text" }) => (
                <Row className="mb-3" key={name}>
                  <Col sm={4}><strong>{label}:</strong></Col>
                  <Col sm={8}>
                    {editMode ? (
                      <Form.Control
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={formData?.[name] ?? ""}
                        onChange={handleChange}
                      />
                    ) : (
                      name === "dob" ? formatDateForInput(user?.dob) : user?.[name] ?? ""
                    )}
                  </Col>
                </Row>
              ))}
              <Row className="mb-3">
                <Col sm={4}><strong>Gender:</strong></Col>
                <Col sm={8}>
                  {editMode ? (
                    <Form.Select
                      name="gender"
                      value={formData?.gender ?? ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  ) : (
                    user?.gender ?? ""
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}