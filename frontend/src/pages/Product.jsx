import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let url = "https://e-commerce-app-v9zz.onrender.com/api/products";

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, category]);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <p>Explore our latest products.</p>

      <div className="products-filter">
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

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
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

                <p className="description">{product.description}</p>

                <div className="product-bottom">
                  <span className="price">₹{product.price}</span>

                  <Link
                    to={`/product/${product._id}`}
                    className="view-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;