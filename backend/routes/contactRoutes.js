import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Send contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message"
    });
  }
});

// Get all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get messages"
    });
  }
});

export default router;