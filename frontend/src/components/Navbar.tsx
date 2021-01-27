import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../features/auth/selectors';

export const Navbar: React.FC = () => {
  const user = useSelector(getUser);

  return (
    <nav>
      <div className="navbar">
        <NavLink to="/" className="brand-logo">
          SOME LOGO
        </NavLink>
        <ul className="">
          <li cy-data="">
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to={user.id === 0 ? '/login' : '/logout'}>
              {user.id === 0 ? 'Login' : 'Logout'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
