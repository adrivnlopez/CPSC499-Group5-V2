import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('email', email); // Save email if Remember Me is checked
        }
        localStorage.setItem('token', data.token);
        navigate('/home'); // Redirect to home page
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login to UDIS</h2>
        {error && <div className="error-message">{error}</div>}
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
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
        <button type="submit">Login</button>
        <p
          style={{
            textAlign: 'center',
            marginTop: '15px',
            cursor: 'pointer',
            color: '#007bff',
          }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </p>
        <p
          style={{
            textAlign: 'center',
            marginTop: '10px',
            cursor: 'pointer',
            color: '#007bff',
          }}
          onClick={() => navigate('/register')}
        >
          Register instead
        </p>
      </form>
    </div>
  );
};

export default LoginPage;