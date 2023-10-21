import React from 'react';

const Header = ({ isLoginPage = true }) => {
  // Obtener el valor de 'username' del localStorage
  const username = localStorage.getItem('username');

  return (
    <header className="bg-blue-500 p-4">
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
        {!isLoginPage && username && (
          <div className="text-white">
            Usuario Conectado: {username}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
