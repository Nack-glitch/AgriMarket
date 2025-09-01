import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "../App.css";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    const user = { id: "1", name: email.split("@")[0], email, userType: "buyer" };
    await login(user);
    navigate("/dashboard");
  };

  const handleSocialLogin = (platform) => {
    alert(`Login with ${platform} clicked!`);
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Left Side */}
        <div className="signin-side">
          <img
            className="bg-image"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
            alt="Farm Fresh"
          />

          {/* Feature Cards */}
          <div className="features-grid">
            <div className="feature-card">
              <span>🛒</span>
              <h4>Direct from Farmers</h4>
              <p>Buy fresh produce straight from local farmers.</p>
            </div>
            <div className="feature-card">
              <span>🌱</span>
              <h4>100% Organic</h4>
              <p>Support sustainable and healthy farming.</p>
            </div>
            <div className="feature-card">
              <span>🚚</span>
              <h4>Fast Delivery</h4>
              <p>Get products delivered quickly to your door.</p>
            </div>
            <div className="feature-card">
              <span>🌾</span>
              <h4>Sustainable Farming</h4>
              <p>Promote eco-friendly agricultural practices.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <h3>1000+</h3>
              <p>Farmers</p>
            </div>
            <div className="stat">
              <h3>5000+</h3>
              <p>Products</p>
            </div>
            <div className="stat">
              <h3>99%</h3>
              <p>Delivery Success</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="signin-form">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary" onClick={handleLogin}>Login</button>

          {/* Social Login */}
          <div className="social-login">
            <p>Or sign in with</p>
            <div className="social-buttons">
              <button className="btn-google" onClick={() => handleSocialLogin("Google")}>
                <FaGoogle size={20} />
              </button>
              <button className="btn-facebook" onClick={() => handleSocialLogin("Facebook")}>
                <FaFacebookF size={20} />
              </button>
              <button className="btn-whatsapp" onClick={() => handleSocialLogin("WhatsApp")}>
                <FaWhatsapp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
