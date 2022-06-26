import React, { useState } from 'react';
import { Link } from '@reach/router';

const Icon = () => (
  <link rel="icon" type="image/png" sizes="32x32" href="/flower.png" />
);

const MenuItem = ({ children, icon = null, className = '', ...props }) => (
  <Link
    {...props}
    className={className}
    getProps={({ isPartiallyCurrent }) => ({
      className: isPartiallyCurrent ? `${className} nav-item--active` : '',
    })}
  >
    {icon}
    {children}
  </Link>
);

const Navbar = () => {
  const [current, setCurrent] = useState('mail');

  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <header>
      <nav>
        <MenuItem icon={<Icon />} to="/" className="nav-item--primary">
          Lilac
        </MenuItem>

        <div className="nav-item--stretch" />

        {/* <MenuItem to="/form">Form</MenuItem> */}
        <MenuItem to="/login">Login</MenuItem>
        <MenuItem to="/search">Search</MenuItem>
      </nav>
    </header>
  );
};

export default Navbar;
