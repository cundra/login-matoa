// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Periksa token di localStorage

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Jika token ada, render komponen anak
  return children;
};

export default ProtectedRoute;
