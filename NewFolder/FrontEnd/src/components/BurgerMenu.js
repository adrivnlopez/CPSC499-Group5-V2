import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BurgerMenu.css'; // Add styles for the BurgerMenu

const BurgerMenu = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="burger-menu">
      <button className="burger-button" onClick={toggleMenu}>
        ☰
      </button>
      {menuVisible && (
        <div className="burger-menu-popup">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={() => navigate('/Page2')}>Page2</button>
          <button onClick={() => navigate('/Page3')}>Page3</button>
          <button onClick={() => navigate('/Page4')}>Page4</button>
          <button onClick={() => navigate('/Page5')}>Page5</button>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;