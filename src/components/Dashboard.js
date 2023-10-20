import React from 'react';

const Dashboard = () => {
  // Aquí puedes recuperar la lista de vehículos desde tu servidor o almacenamiento local

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Pantalla Principal</h1>
      {/* Mapea la lista de vehículos y muestra tarjetas de vehículos aquí */}
    </div>
  );
};

export default Dashboard;