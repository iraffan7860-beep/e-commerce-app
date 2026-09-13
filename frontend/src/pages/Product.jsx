import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-app-v9zz.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <p>Explore our latest products.</p>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>

            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span className="no-image">🛍️</span>
              )}
            </div>

            <div className="product-info">
              <p className="category">{product.category}</p>

              <h3>{product.name}</h3>

              <p className="description">
                {product.description}
              </p>

              <div className="product-bottom">
                <span className="price">
                  ₹{product.price}
                </span>

                <Link
                  to={`/product/${product._id}`}
                  className="view-button"
                >
                  View Details
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;