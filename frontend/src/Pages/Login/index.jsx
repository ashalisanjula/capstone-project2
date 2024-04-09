import React from 'react';
import Navbar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../Features/authenticatedSlice.js'

const errorMsg = {
  paddingTop: '5px',
  color: 'red',
  fontWeight: 'bold'
}

const Login = ({ onRegisterClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({email: '', password: ''});
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setUser((user) => {
      return {
        ...user,
        [name]: value
      }
    })
    
  };

  const register = () => {
    navigate('/register');
  }

  const login = () => {
    if (!user.email.trim() && !user.password.trim()) {
      setError('Email and password cannot be empty');
    } else {
      setError('');
    }

    let userObj = {
       email: user.email,
       password: user.password
    }



     axios.post(`http://localhost:4000/auth/login`,  userObj)
     .then(res => {
      console.log(res);
      if (res.data.sts === 1) {
        localStorage.setItem("auth_token", res.data.user.token);
        dispatch(update(res.data.user));
        navigate('/recent_workplaces');
      } else {
        setError('An error occured while login');
      }
        
    }).catch(err => {
      console.log(err);
      if (err && err.response && err.response.data && err.response.data.sts === -1) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong - #1001');
      }
    })
    // navigate('/recent_workplaces');
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <span className="icon-close"><ion-icon name="close"></ion-icon></span>
        <div className="form-box login">
          <h2>Login</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" required placeholder="e-mail" className="custom-input" onChange={(e) => handleInputChange('email', e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required placeholder="password" className="custom-input" onChange={(e) => handleInputChange('password', e.target.value)}/>
            </div>
            <div className="remember-forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#!">Forgot Password?</a>
            </div>
            <button type="button" className="btn" onClick={login}>
              Login
            </button>
            {error && <div style={errorMsg}>{error}</div>}
            <div className="login-register">
              <p>
                Don't have an account?
                <button type="button" className="register-link" onClick={register}>
                  {' '}
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
