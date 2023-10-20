import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const userName = localStorage.getItem('username');

  const fetchData = useCallback(async () => {
    try {
      const params = {
        userName: userName,
      };
      const response = await axios.get('https://back-reco-node.onrender.com/cars', { params });
      const responseData = response.data;
      const formattedData = responseData[0].marcas.map((marca) => ({
        _id: marca._id,
        nombre: marca.nombre,
        modelos: marca.modelos || [],
      }));
      setVehicles(formattedData);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar la lista de vehículos. Inténtalo de nuevo más tarde.');
      setTimeout(() => {
        setError(null);
      }, 3000); // Ocultar el error después de 3 segundos
      setLoading(false);
    }
  }, [userName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultVehicleImage = 'https://via.placeholder.com/150';

  const handleFavoriteClick = async (carId) => {
    try {
      const response = await axios.post('https://back-reco-node.onrender.com/userCars/addFavoriteCar', {
        userName: userName,
        carId: carId,
      });

      // Maneja la respuesta de la API aquí
      if (response.data.message) {
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess(null);
        }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
      }

      // Vuelve a consultar la lista de coches después de la acción
      fetchData();
    } catch (error) {
      setError('Error al marcar/desmarcar el coche como favorito');
      setTimeout(() => {
        setError(null);
      }, 3000); // Ocultar el error después de 3 segundos
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {loading ? (
        <div className="text-center text-gray-600 text-xl">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl bg-red-200 p-4 rounded-lg shadow-md">
          {error}
        </div>
      ) : (
        vehicles.map((brand) => (
          <div
            key={brand._id}
            className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="text-2xl font-semibold mb-4">{brand.nombre}</div>
            {brand.modelos.map((modelo) => (
              <div key={modelo._id} className="mb-4 relative">
                <img
                  src={modelo.img || defaultVehicleImage}
                  alt={modelo.nombre}
                  className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-60 text-white p-4 w-full rounded-b-lg">
                  <div className="text-left">{modelo.nombre}</div>
                  <button className="absolute top-2 right-2 text-white rounded-full p-2 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-gold-300 hover:to-gold-500"
                    onClick={() => handleFavoriteClick(modelo._id)}>
                    ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {success && (
        <div className="fixed bottom-0 right-0 p-4 m-4 bg-green-500 text-white text-xl rounded-lg shadow-md">
          {success}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
