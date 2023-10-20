import React from 'react';

const Header = ({ username }) => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo de la Empresa</div>
        {username && (
          <div className="text-white">
            Usuario Conectado: {username}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;