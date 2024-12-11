import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../components/TopBar';
import BurgerMenu from '../components/BurgerMenu';
import Card from '../components/Card';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login'); // Redirect if token is missing
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Set user data
      } catch (err) {
        console.error('Error fetching user data:', err.response?.data || err.message);
        setError('Unable to fetch user data. Redirecting to login...');
        localStorage.removeItem('token');
        navigate('/login'); // Redirect on error
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="homepage-container">
      <TopBar title="HOME" />
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <>
          <h1 className="welcome-title">Hello, {user.name}!</h1>
          <Card
            RichMedia='/images/Default_Digital_ID.svg'
            //variant="tag"
            tag="Digital ID"
            title="State ID"
            subtitle= {
              <>
                <p>Name: {user.name}</p>
                <p>ID #: {user.GymID}</p>
              </>
            }
            //innnerDescription={user.email}
            details={
              <>
                <p>DOB: {user.DOB}</p>
                <p>Location: {user.GymLocation}</p>

                <img
                  src="/images/Default_QRcode.jpg"
                  alt=""
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </>
            }
            buttonText="Expand"
          />
          <BurgerMenu/>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;