import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="site-name">Revelation Excavation</a>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          &#9776;
        </button>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li className="nav-item">
            <a className="nav-link">Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
