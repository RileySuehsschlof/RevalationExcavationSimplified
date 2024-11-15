import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';  // Importing the CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setToken } from '../utils/auth';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {


      const response = await axios.post('http://localhost:5000/api/users/login', { emailOrUsername, password });

      // localStorage.setItem('token', response.data.token);
      setToken(response.data.token);//Saving the token

      setMessage('Login succesful')

      //sends you to the page after login
      navigate('/');


    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed')
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {/* Input for Email or Username */}
            <div className="input-group">
              <label htmlFor="emailOrUsername">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password input */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* Error or success message */}
            {message && <p>{message}</p>}

            <button type="submit">Login</button>
          </form>
          <p className="employee-link">
            Employee? <Link to="/employee-login">Click here</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
