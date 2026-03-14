import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import regi1 from '../img/regi1.jpg';
import { Link } from "react-router-dom";

import flow from '../img/flow.png';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dob: '',
        country: '',
        terms: false,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // First Name & Last Name: Allow only alphabets
        if ((name === 'firstName' || name === 'lastName') && /[^a-zA-Z]/.test(value)) {
            return;
        }

        // Phone: Allow only digits and max 10 characters
        if (name === 'phone') {
            if (/[^0-9]/.test(value) || value.length > 10) {
                return;
            }
        }

        // Email: no character-level restriction here (validate later on submit or use HTML5 validation)

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };


            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.terms) {
            alert("Please accept terms to continue.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const { confirmPassword, terms, ...rest } = formData;

  const payload = {
  username: formData.username.trim(),
  firstName: formData.firstName.trim(),
  lastName: formData.lastName.trim(),
  email: formData.email.trim(),
  phone: formData.phone.trim(),
  password: formData.password,
  gender: formData.gender,
  dob: formData.dob,
  country: formData.country,
};


        try {
    const res = await fetch("http://localhost:5000/api/users/SignUp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

    let data;
try {
  data = await res.json();
} catch {
  alert("Server did not return valid JSON");
}

    if (!res.ok) {
        alert(data?.error || data?.msg || "Registration failed");
        return;
    }

    alert("✅ Registration successful!");
    navigate("/Login");
} catch (err) {
    console.error(err);
    alert("❌ Something went wrong: " + err.message);
}

    };


    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${regi1})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.4)', // light transparent bg for form area
                        maxWidth: '900px',
                        margin: '0 auto',
                        padding: '20px',
                        borderRadius: '10px',
                    }}
                >


                    <div className="signup-container-frame d-flex justify-content-center align-items-center">


                        <div className="signup-card-frame row mx-0">
                            <div className="signup-left-side col-md-5 d-flex flex-column">
                                <div className="signup-image-wrapper">
                                    <img src={flow} alt="Flow" className="signup-left-img" />
                                </div>
                                <div className="signup-note-frame">
                                    <p>1. According to IRCTC rules, you need to enter your IRCTC userID to continue with booking.</p>
                                    <p>2. IRCTC allows 6 bookings using one IRCTC userID per calendar month.</p>
                                    <p>3. Please enter valid details. If you enter wrong details, you will be in danger.</p>
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="card-body">
                                    <h3 className="text-center mb-4">Create Your Ixigo Account</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    placeholder='Enter First Name'
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    pattern="[A-Za-z]+"
                                                    style={{ color: 'black' }}
                                                />

                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    placeholder='Enter last Name'
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    pattern="[A-Za-z]+"
                                                    style={{ color: 'black' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                placeholder='Enter Username'
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder='Enter Email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                            />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                placeholder='Enter PhoneNo'
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                                maxLength="10"
                                                pattern="[0-9]{10}"
                                                title="Please enter a valid 10-digit phone number"
                                            />

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder='Enter Password'
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ color: 'black' }}
                                                    minLength="6"
                                                    title="Password must include a letter, a number, and a special character"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirmPassword"
                                                    placeholder='Enter Confirm Password'
                                                    style={{ color: 'black' }}
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    minLength="6"
                                                />                                 </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <select
                                                className="form-select"
                                                name="gender"

                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                            >
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                            />
                                            
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Country</label>
                                            <select
                                                className="form-select"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                                style={{ color: 'black' }}
                                            >
                                                <option value="">Select</option>
                                                <option value="india">India</option>
                                                <option value="usa">USA</option>
                                                <option value="uk">UK</option>
                                                <option value="canada">Canada</option>
                                            </select>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="terms"
                                                checked={formData.terms}
                                                onChange={handleChange}
                                                id="termsCheck"
                                            />
                                            <label className="form-check-label" htmlFor="termsCheck">
                                                I agree to the terms and conditions
                                            </label>
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            SignUp
                                        </button>
                                    </form>
                                    <div className="card-footer text-center mt-3">
                                        Already have an account? <Link to="/Login">Log in</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

