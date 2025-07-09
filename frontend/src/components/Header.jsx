import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <nav>
        <NavLink to="/library" className={({ isActive }) => isActive ? 'active' : ''}>
          Library
        </NavLink>
        {' | '}
        <NavLink to="/reading-list" className={({ isActive }) => isActive ? 'active' : ''}>
          Reading List
        </NavLink>
      </nav>
    </header>
  );
}
