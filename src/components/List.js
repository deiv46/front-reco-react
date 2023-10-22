import React, { useEffect } from 'react';
import VehicleList from './VehicleList'; // Asegúrate de que la ruta sea correcta

const List = ({ refreshHeader }) => {
  useEffect(() => {
    refreshHeader();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Listado de coches</h1>
      <VehicleList /> {/* Agrega el componente VehicleList aquí */}
    </div>
  );
};

export default List;