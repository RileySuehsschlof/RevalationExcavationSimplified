import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Correct import path for LoginPage.js
import EmployeeLoginPage from "./pages/EmployeeLoginPage"; // Import EmployeeLoginPage
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Quote from "./components/Quote";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/employee-login" element={<EmployeeLoginPage />} />
        </Routes>
      </Router>

      <Navbar />
      <Quote />
      <About />
      <Services />
      <Footer />
    </>
  );
}

export default App;
