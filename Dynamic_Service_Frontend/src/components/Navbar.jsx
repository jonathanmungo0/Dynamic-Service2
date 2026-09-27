import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';

const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/about', 'About Us'],
  ['/contact', 'Contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>
              {label}
            </NavLink>
          ))}
          <Link className="btn btn-primary nav-book" to="/book" onClick={() => setOpen(false)}>Book an Event</Link>
        </nav>
      </div>
    </header>
  );
}
