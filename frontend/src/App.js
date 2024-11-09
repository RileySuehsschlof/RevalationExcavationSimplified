
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Correct import path for LoginPage.js
import EmployeeLoginPage from './pages/EmployeeLoginPage';  // Import EmployeeLoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
