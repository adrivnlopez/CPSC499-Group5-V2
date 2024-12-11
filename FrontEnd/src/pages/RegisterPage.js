import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validate date of birth format
    const dobRegex = /^\d{2} [A-Z]{3} \d{4}$/;
    if (!dobRegex.test(dob)) {
      setError('Date of Birth must be in the format: DD MON YEAR (e.g., 10 AUG 2000)');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        dob,
      });
      setSuccess('Registration successful!');
      setError('');
      // Redirect to login page or another page
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register for UDIS</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Full name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="text"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="DD-MON-YEAR (e.g., 10 AUG 2000)"
          required
        />
        <button type="submit">Register</button>
        <p
          style={{
            textAlign: 'center',
            marginTop: '15px',
            cursor: 'pointer',
            color: '#007bff',
          }}
          onClick={() => navigate('/login')}
        >
          Back to Login
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;