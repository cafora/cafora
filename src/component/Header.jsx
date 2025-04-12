import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';

function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>

      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <Link to={"/"} className="navbar-brand">
              Cafora
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/about"} className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/choco"} className="nav-link">
                    Chocolates
                  </Link>
                </li>
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login/Register
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link to={"/contact"} className="nav-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
              <div className="quote_btn-container">
                <Link to={"/cart"} className="nav-link">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
                {isAuthenticated ? (
                  <div className="user-dropdown">
                    <i
                      className="fa fa-user"
                      aria-hidden="true"
                      onClick={() => setShowLogout(!showLogout)}
                      style={{ cursor: "pointer" }}
                    ></i>
                    {showLogout && (
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    )}
                  </div>
                ) : null}
              </div>

            </div>
          </nav>
        </div>
      </header>

    </>
  )
}

export default Header