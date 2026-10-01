import React from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { scrollTo } from '../../utilities';

const NavbarLink = ({ path, label, icon }) => {
  const location = useLocation();
  const isCurrentPage = location.pathname.startsWith(path);

  if (isCurrentPage) {
    return (
      <div className="navbar-link current-page" onClick={scrollTo}>
        {label}
        <i className={`fa-solid ${icon}`} />
      </div>
    );
  }

  return (
    <Link className="navbar-link" onClick={scrollTo} to={path}>
      {label}
      <i className={`fa-solid ${icon}`} />
    </Link>
  );
};

export default NavbarLink;
