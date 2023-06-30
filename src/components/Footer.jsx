// componente Footer.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import '../styles/Footer.css'
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="rights-reserved">
          <span>Todos los derechos reservados &copy; 2023 Los Carros</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
