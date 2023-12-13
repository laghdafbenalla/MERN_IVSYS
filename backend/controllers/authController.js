// backend/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js"; // Import the env.js file


const JWT_SECRET = env.JWT_SECRET;

const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
};

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user.username);
        res.json({ token, redirect: '/dashboard' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.json({ message: `User ${username} registered successfully!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // You can add more methods as needed, such as logout or password reset.

};

export default authController;
