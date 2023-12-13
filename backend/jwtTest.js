import jwt from 'jsonwebtoken';

// Your secret key for signing and verifying tokens
const secretKey = '5be1a651ed3902f12582e058d4b34277078d81443b41b38756e8418b5260c406';

// User data to include in the token payload
const userData = {
  username: 'testuser',
  email: 'testuser@example.com',
};

// Create a token
const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

console.log('Generated Token:', token);

// Verify the token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err.message);
  } else {
    console.log('Decoded Token:', decoded);
  }
});
