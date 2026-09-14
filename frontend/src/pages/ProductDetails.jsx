import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiFetch from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Get Product
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

  // Get Reviews
  const getReviews = async () => {
    try {
      const response = await apiFetch(`/api/reviews/${id}`);

      const data = await response.json();

      if (response.ok) {
        setReviews(data);
      }
    } catch (error) {
      console.log("Review Error:", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [id]);

  // Add to Cart
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

  // Add Review
  const submitReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      const response = await apiFetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product: id,
          rating,
          comment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Review added successfully");

      setComment("");
      setRating(5);

      getReviews();
    } catch (error) {
      console.log("Review Error:", error);
      alert("Something went wrong");
    }
  };

  if (!product) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
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

      {/* Reviews Section */}

      <section className="reviews-section">

        <div className="reviews-container">

          <h2>Customer Reviews ⭐</h2>

          {/* Add Review */}

          <div className="review-form-box">

            <h3>Write a Review</h3>

            <form onSubmit={submitReview}>

              <div className="star-rating">
                <p>Your Rating:</p>

                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={
                        star <= rating
                          ? "star active"
                          : "star"
                      }
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
              />

              <button
                type="submit"
                className="main-button"
              >
                Submit Review
              </button>

            </form>
          </div>

          {/* Reviews List */}

          <div className="reviews-list">

            <h3>What Customers Say</h3>

            {reviews.length === 0 ? (
              <p className="no-reviews">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((review) => (
                <div className="review-card" key={review._id}>

                  <div className="review-top">

                    <strong>
                      {review.user?.name || "Customer"}
                    </strong>

                    <div className="review-stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>

                  </div>

                  <p>{review.comment}</p>

                  <small>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>

                </div>
              ))
            )}

          </div>

        </div>

      </section>
    </>
  );
};

export default ProductDetails;