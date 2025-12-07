// src/components/SigninHeroPanel.jsx
export default function SigninHeroPanel() {
  return (
    <div className="hero-content">
      <h2 className="brand-logo"> BarkKart</h2>
      <h1 className="hero-title">
        Welcome back <br />
        <span className="highlight">Nationalian.</span>
      </h1>
      <p className="hero-desc">
        Log in to manage your orders, check your sales, and discover new items in the marketplace.
      </p>
      <div className="features">
        <div className="feature-item">
          <div className="circle"></div>
          <div className="feature-text">
            <strong>Track Orders</strong>
            <span>Real-time updates on your purchases.</span>
          </div>
        </div>
        <div className="feature-item">
          <div className="circle"></div>
          <div className="feature-text">
            <strong>Seller Dashboard</strong>
            <span>Monitor your revenue and inventory</span>
          </div>
        </div>
      </div>
      <div className="copyright">
        © 2025 BarkKart. Information Assurance and Security Project.
      </div>
    </div>
  );
}