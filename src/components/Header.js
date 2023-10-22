import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  let [username, setUsername] = useState(localStorage.getItem('username'));
  let [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    username = localStorage.getItem('username');
    token = localStorage.getItem('token');

    if (username && token) {
      setUsername(username);
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    setToken(null);
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
        {token && (
          <div className="md:flex">
            {token && username && (
              <ul className="flex space-x-4">
                <li>
                  <Link to="/list" className="cursor-pointer font-bold text-black-400 hover:text-gray">
                    Listado
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="cursor-pointer font-bold text-black-400 hover:text-gray">
                    Dashboard
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="cursor-pointer font-bold text-black-400 hover:text-gray"
                >
                  Cerrar
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
