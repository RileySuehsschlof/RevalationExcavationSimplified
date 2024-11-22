import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../utils/AuthContext';
import { removeToken } from '../utils/auth';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const handleLogout = () => {
    removeToken(); // Remove token from localStorage or wherever you store it
    setUser(null)
  };


  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Force re-render when `user` changes
  }, [user]);
  console.log(user);


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


        {/* if the user logged in display username */}
        {user ? (
          <div className="user-info">

            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>


              {/* should be replaced with link to user page */}
              <li className="nav-item">
                <button className="nav-link nav-button">{user.username}</button>
              </li>



              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link nav-button">Logout</button>
              </li>

            </ul>
          </div>
        ) : (
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
        )}

      </div>
    </nav>
  );
}

export default Navbar;
