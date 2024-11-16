// src/Components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Header */}
      <div className="bg-[#3C3C3C] text-white w-full p-4 fixed top-0 left-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin</h1>
        <div className="text-sm font-bold mr-6"> 
          <span>Admin</span>
        </div>
      </div>

      {/* Sidebar Navbar */}
      <div className="h-screen w-64 bg-[#3C3C3C] text-white fixed top-0 left-0 z-10">
  <ul className="p-4 space-y-4">
    <li className="mt-8"> {/* Tambahkan margin-top untuk menggeser ke bawah */}
      <Link to="/edit-photo" className="hover:text-gray-300">
        Edit Foto
      </Link>
    </li>
    <li>
      <Link to="/edit-about" className="hover:text-gray-300">
        Edit About
      </Link>
    </li>
    <li>
      <button onClick={handleLogout} className="w-full text-left hover:text-gray-300">
        Keluar
      </button>
    </li>
  </ul>
</div>


      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 p-4 mt-16">
        {/* Content here */}
      </div>
    </div>
  );
};

export default Navbar;
