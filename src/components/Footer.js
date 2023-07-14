import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
    <div className="footer-copyright">
      <span className="copyright-symbol">&copy;</span>
      ImmoBee 2023
    </div>
    <Link className="footer-link" to="/contact">Contact us</Link>
    </footer>
  )
}

export default Footer;
