
import React from 'react';
import './LoginPage.css';
import wallpaper from '../Assets/wallpaper.jpg';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={wallpaper} alt="Login Illustration" />
      </div>
      <div className="login-form">
        <h2>Welcome</h2>
        <p className="subheading">Please log in to your account</p> 
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
