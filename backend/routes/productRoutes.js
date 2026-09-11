import express from "express";
import adminOnly from "../middleware/adminOnly.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProduct);

router.post("/", auth, adminOnly, createProduct);
router.put("/:id", auth, adminOnly, updateProduct);
router.delete("/:id", auth, adminOnly, deleteProduct);

export default router;