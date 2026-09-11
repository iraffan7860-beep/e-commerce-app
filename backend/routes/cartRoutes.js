import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart
} from "../controllers/cartController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Get cart
router.get("/", auth, getCart);

// Add product
router.post("/", auth, addToCart);

// Update quantity
router.put("/:id", auth, updateCart);

// Remove product
router.delete("/:productId", auth, removeFromCart);

export default router;