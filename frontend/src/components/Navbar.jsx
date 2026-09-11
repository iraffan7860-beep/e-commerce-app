import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MiniShop
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>

        {token && <Link to="/cart">Cart</Link>}
        {token && <Link to="/orders">My Orders</Link>}
        {token ? (
          <button onClick={logout} className="nav-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup" className="signup-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;