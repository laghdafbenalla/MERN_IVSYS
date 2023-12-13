// backend/index.js
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config as dotenvConfig } from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import env from "./config/env.js"; // Import the env.js file

import jwt from 'jsonwebtoken';



dotenvConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Middleware to handle the /user/profile endpoint
app.get('/user/profile', (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // TODO: Fetch user profile using the decoded information

    // If successful, send the user profile data
    res.json({ username: decoded.username, email: decoded.email });
  } catch (error) {
    console.error('Token verification error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }

    // Handle other authentication errors here

    res.status(401).json({ error: 'Authentication failed' });
  }
});


// Serve the React app
app.use(express.static(join(__dirname, "../frontend/build")));

// Database connection
mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Include authentication and user routes
app.use('/', authRoutes);
app.use('/user', userRoutes);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, "../frontend/build", "index.html"));
});

// Other routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome To MERN Stack Tutorial');
});

const PORT = process.env.PORT || 3000;

app.listen(env.PORT, () => {
    console.log(`App is listening on port: ${env.PORT}`);
});
