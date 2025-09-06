import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add new user
router.post("/", async (req, res) => {
  const { username, phoneNumber } = req.body;
  const user = new User({ username, phoneNumber });
  await user.save();
  res.json(user);
});

export default router;
