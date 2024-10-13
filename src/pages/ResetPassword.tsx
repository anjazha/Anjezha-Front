// Import required modules
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../functions/axiosInstance';

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const { token } = useParams<{ token: string }>(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in the URL
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, [token]);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      // Send POST request to the backend to reset password
      const response = await axiosInstance.patch('/auth/reset-password', {
        token,
        password,
      });

      // Display success message and redirect to login
      if (response.data.success) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
