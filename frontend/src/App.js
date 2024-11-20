import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Correct import path for LoginPage.js
import EmployeeLoginPage from "./pages/EmployeeLoginPage"; // Import EmployeeLoginPage
import Register from './pages/RegisterPage'; // Correct import path for Register.js
import AdminPage from "./pages/AdminPage"; // Correct import path for Admin
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { AuthProvider } from './utils/AuthContext';  // Import the AuthProvider

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/employee-login" element={<EmployeeLoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </AuthProvider>

    </>
  );
}

export default App;
