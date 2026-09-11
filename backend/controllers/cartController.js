import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        quantity: 1
      });
    }

    res.status(201).json({
      message: "Product added to cart",
      cartItem
    });
  } catch (error) {
    console.log("Add to cart error:", error.message);

    res.status(500).json({
      message: "Failed to add product to cart"
    });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id
    }).populate("product");

    res.json(cart);
  } catch (error) {
    console.log("Get cart error:", error.message);

    res.status(500).json({
      message: "Failed to get cart"
    });
  }
};

// Update quantity
export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.json({
      message: "Cart updated successfully",
      cartItem
    });
  } catch (error) {
    console.log("Update cart error:", error.message);

    res.status(500).json({
      message: "Failed to update cart"
    });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    res.json({
      message: "Product removed from cart"
    });
  } catch (error) {
    console.log("Remove from cart error:", error.message);

    res.status(500).json({
      message: "Failed to remove product from cart"
    });
  }
};