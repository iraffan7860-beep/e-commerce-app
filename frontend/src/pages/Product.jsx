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
                <span>🛍️</span>
              )}
            </div>

            <h2>{product.name}</h2>

            <p className="category">{product.category}</p>

            <p>{product.description}</p>

            <h3>₹{product.price}</h3>

            <Link
              to={`/product/${product._id}`}
              className="view-button"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;