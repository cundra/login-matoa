// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import EditFoto from './Components/EditFoto';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditAbout from './Components/EditAbout';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/edit-photo"
            element={
              <>
                <Navbar />
                <EditFoto />
              </>
            }
          />
          <Route
            path="/edit-about"
            element={
              <>
                <Navbar />
                <EditAbout />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
