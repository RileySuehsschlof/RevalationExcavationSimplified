import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo link">
          <div className="site-name">Revelation Excavation</div>
        </Link>


        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          &#9776;
        </button>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/register" className="link">
            <li className="nav-item">
              <div className="nav-link">Register</div>
            </li>
          </Link>
          <Link to="/login" className="link">
            <li className="nav-item">
              <div className="nav-link">Login</div>
            </li>
          </Link>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
