
import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { setToken } from '../utils/auth';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const EmployeeLoginPage = () => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  // const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:5000/api/users/login', { emailOrUsername, password });

    //   setToken(response.data.token);//Saving the token
    //   setMessage('Login successful');
    // } catch (error) {
    //   setMessage('Invalid Username or Password')
    // }
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


  return (<>
    <Navbar />
    <div className="login-container">
      <div className="login-form-container">
        <h2>Employee Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="employeeNumber">Employee Number</label>
            <input
              type="text"
              id="employeeNumber"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              required
            />
          </div>
          {/* <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}

          {/* <div className="input-group">
            <label htmlFor="username">User Name</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div> */}

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
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default EmployeeLoginPage;
