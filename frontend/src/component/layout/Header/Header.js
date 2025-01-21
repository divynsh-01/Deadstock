import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import logo from "../../../images/logo.png"; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo and Brand Name */}
        <NavLink to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "30px", marginRight: "10px", marginBottom: "4.5px" }}
          />
        </NavLink>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Section: Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                aria-current="page" 
                to="/" 
                activeClassName="active" // Automatically adds 'active' class
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products" activeClassName="active">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
          </ul>

          {/* Right Section: Icons */}
          <div className="d-flex align-items-center">
            {/* Search Icon */}
            <NavLink className="nav-link me-3" to="/search">
              <i className="bi bi-search" style={{ fontSize: "1.5rem" }}></i>
            </NavLink>

            {/* Cart Icon */}
            <NavLink className="nav-link me-3" to="/cart">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
            </NavLink>

            {/* Profile Icon */}
            <NavLink className="nav-link" to="/login">
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
