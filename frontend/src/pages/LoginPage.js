import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setToken } from '../utils/auth';
import { AuthContext } from '../utils/AuthContext';
import { jwtDecode } from 'jwt-decode';
import '../styles/login.css';  // Importing the CSS file

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      //sends the email/username and password to our backend api
      const response = await axios.post('http://localhost:5000/api/users/login', { emailOrUsername, password });

      const token = response.data.token;
      console.log('Received token:', token);
      setToken(token);//Saving the token

      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken); // Log the decoded token
        setUser({ username: decodedToken.username });
      } catch (decodingError) {
        console.error('Error decoding token:', decodingError);
      }

      setMessage('Login succesful, redirecting')

      //sends you to the page index after login
      setTimeout(() => {
        navigate('/');  // Redirect to main page after login
      }, 1500)

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
