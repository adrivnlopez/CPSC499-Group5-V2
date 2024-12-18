import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;