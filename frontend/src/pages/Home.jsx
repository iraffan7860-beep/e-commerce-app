import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getProducts = async () => {
    try {
      let url = " https://e-commerce-app-v9zz.onrender.com/api/products";

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (category) {
        params.append("category", category);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search, category]);

  return (
    <div className="home-page">

      {/* ---------- Hero ---------- */}

      <section className="hero">

        {/* Animated Background */}

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="sparkle sparkle-one">✦</div>
        <div className="sparkle sparkle-two">✦</div>
        <div className="sparkle sparkle-three">•</div>

        {/* Hero Content */}

        <div className="hero-content">

          <div className="trending-badge">
            🔥 Trending Now
          </div>

          <p className="hero-small">
            ✦ WELCOME TO MINISHOP
          </p>

          <h1>
            Shop What
            <br />
            <span>You Love.</span>
          </h1>

          <p className="hero-text">
            Discover amazing products, beautiful styles
            and everything you need in one place.
          </p>

          <div className="hero-buttons">

            <a href="#products" className="hero-button">
              Shop Now →
            </a>

            <Link
              to="/signup"
              className="hero-button-light"
            >
              Join Us
            </Link>

          </div>

          {/* Trust Badge */}

          <div className="trust-badge">

            <div className="trust-icon">
              ⭐
            </div>

            <div>
              <strong>4.9/5</strong>
              <span>Happy Customers</span>
            </div>

          </div>

        </div>

        {/* Hero Visual */}

        <div className="hero-visual">

          <div className="hero-circle circle-one"></div>
          <div className="hero-circle circle-two"></div>

          {/* Free Delivery */}

          <div className="floating-badge delivery-badge">
            🚚
            <div>
              <strong>Free Delivery</strong>
              <span>On selected orders</span>
            </div>
          </div>

          {/* Discount */}

          <div className="floating-badge discount-badge">
            ✨
            <div>
              <strong>Special Offer</strong>
              <span>Shop & Save</span>
            </div>
          </div>

          {/* Main Card */}

          <div className="shopping-card">

            <div className="shopping-icon">
              🛍️
            </div>

            <p>YOUR SHOPPING</p>

            <h2>Made Easy</h2>

            <div className="mini-line"></div>

            <span>
              Explore • Choose • Enjoy
            </span>

          </div>

          {/* Small Product Cards */}

          <div className="mini-product mini-one">
            <span>👟</span>
            <div>
              <strong>Fashion</strong>
              <small>Trending</small>
            </div>
          </div>

          <div className="mini-product mini-two">
            <span>🎧</span>
            <div>
              <strong>Electronics</strong>
              <small>Popular</small>
            </div>
          </div>

        </div>

      </section>

      {/* ---------- Products ---------- */}

      <section className="shop-section" id="products">

        <div className="section-heading">

          <div>
            <p className="small-title">
              OUR COLLECTION
            </p>

            <h2>Shop Now</h2>
          </div>

          <div className="filters">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Shoes">Shoes</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
            </select>

          </div>

        </div>

        {products.length === 0 ? (

          <div className="empty-products">
            <h3>No products found</h3>
            <p>Try another search or category.</p>
          </div>

        ) : (

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;