import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import wallpaper from '../Assets/wallpaper.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Simpan token di localStorage
        const { access_token } = response.data.data;
        localStorage.setItem('token', access_token);
  
        // Redirect ke halaman edit-photo
        navigate('/edit-photo');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-full">
        <img src={wallpaper} alt="Wallpaper" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center bg-white">
        <div className="max-w-md w-full p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-600 mb-6">Please log in to your account</p>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
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
