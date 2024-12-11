import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegisterPage';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import PageNotFound from './pages/PageNotFound'; // Import the PageNotFound component
// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check for the presence of the token
};

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Route for the registration page */}
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* Protected route for the home page */}
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          
          <Route path="/Page1" element={<ProtectedRoute element={<Page1 />} />} />
          
          <Route path="/Page2" element={<ProtectedRoute element={<Page2 />} />} />

          <Route path="/Page3" element={<ProtectedRoute element={<Page3 />} />} />
          
          {/* Fallback route for unmatched routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;