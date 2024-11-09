import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';  // Importing the CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, for now, log the data (replace with your API call)
    console.log('Login for: ', { email }, 'with password: ', { password }, 'was successful.');
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
