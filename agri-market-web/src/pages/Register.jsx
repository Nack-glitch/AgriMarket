import React, { useState } from "react";
import FarmerDb from "./FarmerDb";
import ClientDb from "./ClientDb";
import "../App.css"; // make sure to include modern CSS

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "buyer",
    farmName: "",
    location: "",
    phone: "",
  });

  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Full name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (formData.userType === "farmer") {
      if (!formData.farmName) tempErrors.farmName = "Farm name is required";
      if (!formData.location) tempErrors.location = "Location is required";
    }
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    const newUser = { ...formData, id: Date.now().toString() };
    setUser(newUser);
  };

  if (user) {
    return user.userType === "farmer" ? (
      <FarmerDb user={user} />
    ) : (
      <ClientDb user={user} />
    );
  }

  return (
    <div className="register-page modern-register">
      <div className="register-left">
  <img
    src="https://www.grainbow.fr/wp-content/uploads/2022/12/Header-Agrimarket-1024x768.png"
    alt="AgriMarket"
  />
  <div className="register-info">
    <h2>Join <span className="highlight">AgriMarket</span></h2>
    <p>
      Connect with local farmers or become a buyer. Enjoy fresh produce,
      transparent prices, and fast delivery directly from farms.
    </p>
  </div>
</div>


      <div className="register-right">
        <div className="register-container">
          <h2>Create Your Account</h2>

          <div className="user-type-toggle">
            <button
              className={formData.userType === "buyer" ? "active" : ""}
              onClick={() => setFormData({ ...formData, userType: "buyer" })}
            >
              🛒 Buyer
            </button>
            <button
              className={formData.userType === "farmer" ? "active" : ""}
              onClick={() => setFormData({ ...formData, userType: "farmer" })}
            >
              🚜 Farmer
            </button>
          </div>

          {/* Form Fields */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {formData.userType === "farmer" && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Farm Name"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
                {errors.farmName && <span className="error">{errors.farmName}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                {errors.location && <span className="error">{errors.location}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button className="btn-primary" onClick={handleRegister}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
