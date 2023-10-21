import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-white font-bold text-xl">
          <div className="w-46 h-12">
            <img
              src="https://elreferente.es/wp-content/uploads/2021/10/logo-recomotor-1.png"
              alt="Logo Recomotor"
              className="w-full h-full"
            />
          </div>
        </div>
        {token && username &&(
          <div className="text-white hidden md:flex">
            Usuario Conectado: {username}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
