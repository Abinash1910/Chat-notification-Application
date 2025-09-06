import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Add new message
router.post("/", async (req, res) => {
  const { user, text } = req.body;
  const msg = new Message({ user, text });
  await msg.save();
  res.json(msg);
});

export default router;
