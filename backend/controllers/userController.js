// backend/controllers/userController.js
import User from "../models/User.js";

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you have an _id field in your User model
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Exclude sensitive information like password before sending the response
      const userProfile = {
        username: user.username,
        // Add more fields as needed
      };

      res.json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // You can add more methods for user-related operations, such as updating profile information.

};

export default userController;
