import express from "express";

import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Get reviews for a product
router.get("/:productId", getReviews);

// Add review - Login required
router.post("/", auth, addReview);

export default router;