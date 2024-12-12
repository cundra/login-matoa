
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import EditFoto from './Components/EditFoto';
import EditAbout from './Components/EditAbout';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
         
          <Route path="/" element={<LoginPage />} />
          
        
          <Route 
            path="/edit-photo" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EditFoto />
                </>
              </ProtectedRoute>
            } 
          />

          {/* Halaman Edit About */}
          <Route 
            path="/edit-about" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EditAbout />
                </>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
