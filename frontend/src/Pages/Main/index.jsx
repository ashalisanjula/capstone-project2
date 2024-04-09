import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import './index.css';
import Navbar from '../../Components/NavBar';

const Main = () => {

  const [showLogin, setShowLogin] = useState(false);

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLogin(!showLogin);
    setShowRegisterForm(false); 
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
    setShowLogin(false); 
  };

  const handleRegisterFormClose = () => {
    setShowRegisterForm(false);
  };

  return (
    <div className="app-container">
      <div className={`background ${showLogin || showRegisterForm ? 'blur' : ''}`}>
        <Navbar />
      </div>
      {showLogin && (
        <div className="login-container">
          <Login onRegisterClick={handleRegisterButtonClick} />
        </div>
      )}
      {showRegisterForm && (
        <div className="register-form-container">
          <Register onClose={handleRegisterFormClose} />
        </div>
      )}
    </div>
  );
};

export default Main;