// frontend/src/components/Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import './AuthComponent.css'; 


const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', { username, password });

      // Registration successful, you can redirect or update UI as needed
      console.log('Registration successful:', response.data);
      setError('');
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Username:</label>
          <input class="form__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input class="form__input"  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

export default Registration;
