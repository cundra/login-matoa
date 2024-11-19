// src/Components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wallpaper from '../Assets/wallpaper.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
   
    if (email === 'user@example.com' && password === 'password123') {
      navigate('/edit-photo');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        <img src={wallpaper} alt="Login Illustration" className="object-cover w-full h-full" />
      </div>
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg ml-20">
        <h2 className="text-xl font-semibold mb-2">Welcome</h2>
        <p className="text-sm text-gray-600 mb-4">Please log in to your account</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
