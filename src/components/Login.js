import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, setAuthenticated } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  // Eliminar el 'username' y el 'token' del localStorage
  localStorage.removeItem('username');
  localStorage.removeItem('token');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://back-reco-node.onrender.com/login', {
        username,
        password,
      });

      // Comprueba si la solicitud fue exitosa y contiene un token
      if (response.status === 200 && response.data.token) {
        // Guarda el token JWT en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);

        // Llama a la función de acción para establecer la autenticación
        setAuthenticated(authDispatch);

        // Navega a la página de Dashboard
        navigate('/list');
      } else {
        // Maneja el caso en el que la autenticación falla
        setError('Inicio de sesión fallido');
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="w-full md:max-w-md mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
