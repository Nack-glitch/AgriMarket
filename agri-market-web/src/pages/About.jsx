import React from "react";
import "../App.css"; // reuse your main CSS

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero about-hero">
        <div className="hero-text">
          <h1 className="hero-title">
            About <span className="highlight">AgriMarket</span>
          </h1>
          <p className="hero-subtitle">
            AgriMarket is a revolutionary platform connecting <strong>farmers</strong> directly
            with <strong>buyers</strong>. We remove middlemen, ensure fair prices for farmers,
            and deliver fresh, high-quality produce straight to your doorstep.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://play-lh.googleusercontent.com/FemCAqUfRCW-hzwl8pFV08IOgc23i2ukJk4bZilVXLQuzxzHt4ujzzs5kt3GWF__7O4"
            alt="About AgriMarket"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features about-features">
        <h2 className="section-title">Why Choose <span className="highlight">AgriMarket</span>?</h2>
        <p className="section-subtitle">
          We empower farmers, ensure fresh produce, and provide fast delivery directly to buyers.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <h3 className="feature-title">Direct Connection</h3>
            <p className="feature-desc">Connect directly with farmers and buyers without middlemen.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <h3 className="feature-title">Quality Assurance</h3>
            <p className="feature-desc">All products are verified for freshness and top quality.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚚</span>
            <h3 className="feature-title">Fast Delivery</h3>
            <p className="feature-desc">Fresh produce delivered directly from farms within 24 hours.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌱</span>
            <h3 className="feature-title">Support Local</h3>
            <p className="feature-desc">Empower local farmers and strengthen community livelihoods.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="how-it-works about-mission">
        <h2 className="section-title">Our Mission</h2>
        <p className="step-desc">
          To transform agriculture through transparency and direct connections between producers and consumers,
          improving both livelihoods and food quality. We aim to create a sustainable ecosystem where farmers thrive
          and buyers enjoy the best produce.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works about-how">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Simple steps to connect farmers and buyers</p>
        <div className="steps">
          <div className="step">
            <span className="step-icon">📝</span>
            <h3 className="step-title">1. Register</h3>
            <p className="step-desc">Sign up as a farmer or buyer to start listing or ordering products.</p>
          </div>
          <div className="step">
            <span className="step-icon">🛒</span>
            <h3 className="step-title">2. Browse & Order</h3>
            <p className="step-desc">Explore fresh produce and order directly from farmers in your area.</p>
          </div>
          <div className="step">
            <span className="step-icon">🚚</span>
            <h3 className="step-title">3. Get Delivered</h3>
            <p className="step-desc">Receive fresh produce delivered safely to your doorstep.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
