import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth"); // redirect to auth page (sign in/register)
  };

  const handleExploreProducts = () => {
    navigate("/products"); // redirect to products page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Connect <span className="highlight">Farmers</span> &{" "}
            <span className="highlight">Buyers</span> Directly
          </h1>
          <p className="hero-subtitle">
            AgriMarket eliminates middlemen, ensuring farmers get fair prices and buyers get fresh, quality produce.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started →
            </button>
            <button className="btn btn-outline" onClick={handleExploreProducts}>
              Explore Products
            </button>
          </div>
          <div className="stats-container">
            <div className="stat">
              <p className="stat-number">500+</p>
              <p className="stat-label">Active Farmers</p>
            </div>
            <div className="stat">
              <p className="stat-number">2K+</p>
              <p className="stat-label">Happy Buyers</p>
            </div>
            <div className="stat">
              <p className="stat-number">10K+</p>
              <p className="stat-label">Orders Delivered</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1622385161916-27f0c8746f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
            alt="AgriMarket Hero"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose AgriMarket?</h2>
        <p className="section-subtitle">
          We connect farmers directly to buyers, revolutionizing the agricultural market.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <h3 className="feature-title">Direct Connection</h3>
            <p className="feature-desc">Buy and sell directly without middlemen.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <h3 className="feature-title">Quality Guaranteed</h3>
            <p className="feature-desc">All products are verified for quality and freshness.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚚</span>
            <h3 className="feature-title">Fast Delivery</h3>
            <p className="feature-desc">Receive fresh produce within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How AgriMarket Works</h2>
        <p className="section-subtitle">Simple steps to connect farmers and buyers</p>
        <div className="steps">
          <div className="step">
            <span className="step-icon">📝</span>
            <h3 className="step-title">1. Register</h3>
            <p className="step-desc">Sign up as a farmer or buyer to list or order products.</p>
          </div>
          <div className="step">
            <span className="step-icon">🛒</span>
            <h3 className="step-title">2. Browse & Order</h3>
            <p className="step-desc">Explore fresh produce and order directly from farmers.</p>
          </div>
          <div className="step">
            <span className="step-icon">🚚</span>
            <h3 className="step-title">3. Get Delivered</h3>
            <p className="step-desc">Receive produce delivered directly to your doorstep.</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleExploreProducts}>
          View All Products →
        </button>
      </section>
    </div>
  );
};

export default Home;
