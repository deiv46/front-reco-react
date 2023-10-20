import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-reco-node.onrender.com/cars');
        const responseData = response.data;
        const formattedData = responseData[0].marcas.map((marca) => ({
          _id: marca._id,
          nombre: marca.nombre,
          modelos: marca.modelos || [],
        }));
        setVehicles(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de vehículos:', error);
        setError('Error al cargar la lista de vehículos. Inténtalo de nuevo más tarde.');
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 3000); // Limpiar el error después de 3 segundos
      }
    };

    fetchData();
  }, []);

  const defaultVehicleImage = 'https://via.placeholder.com/150'; // URL de la imagen de vehículo por defecto

  const handleFavoriteClick = async (userId, carId) => {
    try {
      // Realiza una solicitud POST para marcar o desmarcar un coche como favorito
      const response = await axios.post('https://back-reco-node.onrender.com/addFavoriteCar', {
        userId: userId,
        carId: carId,
      });
      console.log(response.data); // Maneja la respuesta de la API aquí
    } catch (error) {
      console.error('Error al marcar/desmarcar el coche como favorito:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        vehicles.map((brand) => (
          <div
            key={brand.__id}
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
                    onClick={() => handleFavoriteClick(userId, modelo._id)}>
                    ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default VehicleList;
