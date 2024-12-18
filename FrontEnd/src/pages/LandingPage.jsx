import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  // Automatically redirect to LoginPage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <h1 className="branding">UDIS</h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title">GymApp</h1>
        <p className="subtitle">
          Your personal gym management app. Redirecting to login page...
        </p>
        <img
          src="/images/LandingPage.png"
          alt="Illustration"
          className="main-illustration"
        />
      </main>
    </div>
  );
};
export default LandingPage;