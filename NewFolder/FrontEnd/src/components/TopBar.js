import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopBar.css';

const TopBar = ({ title }) => {
  const navigate = useNavigate();
  const [overlayVisible, setOverlayVisible] = useState(false);

 
  const defaultAvatar = "/images/default_avatar.png"; // Default avatar 

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="top-bar">
      <h2 className="top-bar-title">{title}</h2>
      <img
        src={defaultAvatar} // Load the default avatar image
        alt="Avatar"
        className="top-bar-avatar"
        onClick={toggleOverlay}
      />
      {overlayVisible && (
        <div className="top-bar-overlay">
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={() => navigate('/help')}>Help</button> 
          <button onClick={handleLogout}>Logout</button> 
        </div>
      )}
    </header>
  );
};

export default TopBar;