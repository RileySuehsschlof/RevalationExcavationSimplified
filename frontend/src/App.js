
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Correct import path for LoginPage.js
import EmployeeLoginPage from './pages/EmployeeLoginPage';  // Import EmployeeLoginPage
import Register from './pages/Register'; // Correct import path for Register.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
