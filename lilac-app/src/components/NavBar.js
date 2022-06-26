import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Button, Image, Space } from 'antd';
import Logo from "../resources/logo-removebg.png";

const Icon = () => (
  <link rel="icon" type="image/png" sizes="32x32" href={Logo} />
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
        <MenuItem to="/">
      <Image
      id = 'logo'
    width={90}
    src={Logo}
    preview= {false}
    />
    <a aria-current="page" class=" nav-item--active nav-item logo-item" href="/"><strong>Lilac</strong></a> 
    </MenuItem>
        <div className="nav-item--stretch" />

        {/* <MenuItem to="/form">Form</MenuItem> */}
        <a aria-current="page" class=" nav-item--active nav-item" href="/login">Login</a>  
        <a aria-current="page" class=" nav-item--active nav-item" href="/search">Search</a>      
      </nav>
    </header>
  );
};

export default Navbar;