// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields to the schema as needed
});

const User = mongoose.model("User", userSchema);

export default User;
