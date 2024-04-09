import React, { useState } from 'react';
import Navbar from '../../Components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const errorMsg = {
  paddingTop: '5px',
  color: 'red',
  fontWeight: 'bold'
}

const Register = ({ onClose }) => {
  const navigate = useNavigate();
   const [user, setUser] = useState({username: '', email: '', password: '', confirmPass: ''});
   const [error, setError] = useState('');

  const handleRegister = (name, value) => {
     setUser((prevUser) => {
        return {
          ...prevUser,
          [name]: value
        }
     })
  };

  const handleSubmit = () => {
      console.log(user);

    if (!user.username.trim()) {
      setError('Username is required');
    } else if (!user.email.trim()) {
      setError('Email is required');
    } else if (!user.password.trim()) {
      setError('Password is required');
    } else if (!user.confirmPass.trim()) {
      setError('Confirm password is required');
    } else if (user.confirmPass && user.password !== user.confirmPass) {
      setError('Passwords do not match');
    } else {
      setError('');

      let userObj = {
        username: user.username,
        email: user.email,
        password: user.password
      }

      axios.post(`http://localhost:4000/auth/signup`, userObj)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data.sts === 1) {
          navigate('/login');
        } else {
          setError('An error occured while registering');
        }
          
      }).catch(err => {
        console.log(err);
        if (err.response.data.sts === -1) {
          setError(err.response.data.error);
        } 
      })
      
    }
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <span className="icon-close">
          <ion-icon name="close"></ion-icon>
        </span>
        <div className="form-box register">
          <h2>Register</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input
                type="text"
                required
                placeholder="Username"
                value={user.username}
                onChange={(e) => handleRegister('username', e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type="email"
                required
                placeholder="e-mail"
                value={user.email}
                onChange={(e) => handleRegister('email', e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                required
                placeholder="Password"
                value={user.password}
                onChange={(e) => handleRegister('password', e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                required
                placeholder="Confirm Password"
                value={user.confirmPass}
                onChange={(e) => handleRegister('confirmPass', e.target.value)}
                className="custom-input"
              />
            </div>
            <button type="button" className="btn" onClick={handleSubmit}>
              Register
            </button>
            {error && <div style={errorMsg}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;