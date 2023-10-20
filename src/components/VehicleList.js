import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-reco-node.onrender.com/cars');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de vehículos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((brand) => (
        <div
          key={brand._id}
          className="relative p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <div className="text-xl font-semibold">{brand.nombre}</div>
          <div className="mt-4">
            {brand.modelos.map((modelo) => (
              <div key={modelo._id} className="mb-4 flex items-center justify-between">
                <div>
                  <img
                    src={modelo.img}
                    alt={modelo.nombre}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <span className="ml-2">{modelo.nombre}</span>
                </div>
                <div>
                  <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
                    Añadir a favoritos
                    <span className="ml-2">⭐</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
