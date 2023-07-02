import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <footer className="footer-container">
    <div className="footer-copyright">
      <span className="copyright-symbol">&copy;</span>
      ImmoBee 2023
    </div>
    {/* <Link className="footer-link" to="/contact">Contact us</Link> */}
    </footer>
  )
}

export default Footer;
