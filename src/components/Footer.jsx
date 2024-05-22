import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
    <div className="footer-copyright">
      <span className="copyright-symbol">&copy;</span>
      ImmoBee {currentYear}
    </div>
    <div>
      <img src="/bee-2.png" className="footer-bee" alt="" />
      <Link className="footer-link" to="/contact">Contact us</Link>
    </div>
    </footer>
  )
}

export default Footer;
