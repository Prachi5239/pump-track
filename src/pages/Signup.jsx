import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Save user information in localStorage
    localStorage.setItem("pumpTrackUser", JSON.stringify(formData));

    alert(`Signup successful as ${formData.role}!`);

    // Redirect according to selected role
    if (formData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>⛽ Pump Track</h1>

        <h2>Create Account</h2>
        <p>Sign up to find fuel stations near you.</p>

        <form onSubmit={handleSignup}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Account Type</label>

            <div className="role-options">

              <label className="role-card">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />

                <span>
                  👤 <strong>User</strong>
                  <small>Find fuel stations and check availability</small>
                </span>
              </label>

              <label className="role-card">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />

                <span>
                  🛠️ <strong>Admin</strong>
                  <small>Manage stations and fuel availability</small>
                </span>
              </label>

            </div>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

