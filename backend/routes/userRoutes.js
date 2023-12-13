// backend/routes/userRoutes.js
import express from "express";
import userController from "../controllers/userController.js";
import authenticateJWT from "../utils/authentication.js";

const router = express.Router();

// GET /user/profile
router.get('/profile', authenticateJWT, userController.getUserProfile);

// You can add more routes for user-related features, such as updating profile information.

export default router;
