import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="product-info">
        <p className="category">{product.category}</p>

        <h3>{product.name}</h3>

        <p className="description">
          {product.description || "No description available"}
        </p>

        <div className="product-bottom">
          <span className="price">₹{product.price}</span>

          <Link to={`/product/${product._id}`} className="view-button">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;