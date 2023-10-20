import React from 'react';
import VehicleList from './VehicleList'; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <VehicleList /> {/* Agrega el componente VehicleList aquí */}
    </div>
  );
};

export default Dashboard;
