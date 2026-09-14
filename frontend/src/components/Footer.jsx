import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>MiniShop</h2>
          <p>
            Shop smart, discover more, and enjoy a simple
            shopping experience.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/forgot-password">Reset Password</Link>
        </div>

        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p>📧 support@minishop.com</p>
          <p>🛒 Happy Shopping!</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 MiniShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;