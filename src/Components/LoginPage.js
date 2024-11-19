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
    <div className="flex w-screen h-screen">
      {/* Left Side - Wallpaper */}
      <div className="w-1/2 h-full">
        <img
          src={wallpaper}
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 h-full flex justify-center items-center bg-white">
        <div className="max-w-md w-full p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-600 mb-6">Please log in to your account</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;