// backend/routes/authRoutes.js
import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// POST /login
router.post('/login', authController.login);

// POST /register
router.post('/register', authController.register);

// You can add more authentication-related routes, such as logout or password reset.

export default router;
