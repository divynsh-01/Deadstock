import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import logo from "../../../images/logo.png"; 


const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left side: Copyright */}
        <div className="d-flex align-items-center">
        {/* Middle: Logo */}
        <div className="text-center">
          <img
            src={logo}
            alt="Dead Stock Marketplace Logo"
            style={{ height: "30px", marginRight: "10px"}}          />
        </div>
          <p className="mb-0">&copy; 2024 Dead Stock Marketplace</p>
        </div>


        {/* Right side: Social Icons */}
        <div className="d-flex align-items-center">
          <a href="https://www.instagram.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.facebook.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
