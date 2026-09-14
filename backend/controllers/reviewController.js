import Review from "../models/Review.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    if (!product || !rating || !comment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const review = await Review.create({
      product,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log("Add Review Error:", error.message);

    res.status(500).json({
      message: "Failed to add review",
    });
  }
};

// Get Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.log("Get Reviews Error:", error.message);

    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};