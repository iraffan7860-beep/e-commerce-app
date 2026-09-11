import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.id
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const products = [];

    let totalAmount = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.product);

      if (product) {
        products.push({
          product: product._id,
          quantity: item.quantity
        });

        totalAmount =
          totalAmount + product.price * item.quantity;
      }
    }

    if (products.length === 0) {
      return res.status(400).json({
        message: "No valid products found"
      });
    }

    const order = await Order.create({
      user: req.user.id,
      products: products,
      totalAmount: totalAmount
    });

    await Cart.deleteMany({
      user: req.user.id
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: order
    });

  } catch (error) {
    console.log("Create order error:", error);
    console.log(error.stack);

    res.status(500).json({
      message: "Failed to place order"
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.log("Get orders error:", error);
    console.log(error.stack);

    res.status(500).json({
      message: "Failed to get orders"
    });
  }
};