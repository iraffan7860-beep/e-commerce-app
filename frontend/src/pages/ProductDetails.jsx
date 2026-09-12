import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiFetch from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiFetch(`/api/products/${id}`);

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getProduct();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await apiFetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product._id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product added to cart");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (!product) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="details-page">
      <div className="details-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image large">No Image</div>
        )}
      </div>

      <div className="details-content">
        <p className="category">{product.category}</p>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{product.price}
        </p>

        <p className="details-description">
          {product.description || "No description available."}
        </p>

        <button
          onClick={addToCart}
          className="main-button"
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate("/")}
          className="back-button"
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;