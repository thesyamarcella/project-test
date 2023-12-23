import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const navbarStyles = {
    position: 'fixed',
    top: visible ? 0 : '-100px',
    width: '100%',
    zIndex: 1000,
    transition: 'top 0.3s ease-in-out, opacity 0.5s ease-in-out',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
  };

  const navItems = [
    { name: 'Work', url: '/Work' },
    { name: 'About', url: '/About' },
    { name: 'Services', url: '/Services' },
    { name: 'Ideas', url: '/Ideas' },
    { name: 'Careers', url: '/Careers' },
    { name: 'Contact', url: '/Contact' },
  ];

  return (
    <>
      <nav style={navbarStyles} className="w-full bg-orange flex items-center justify-between px-32 py-1 text-white text-m">
        <NavLink to={'/'}>
          <img src={require('../assets/Logo.png').default} alt="logo" className="h-20 w-auto" />
        </NavLink>
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className={`pb-2 border-b-4 text-center ${location.pathname === item.url ? 'border-white' : 'border-transparent hover:border-white transition duration-300 ease-in'}`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Header;
