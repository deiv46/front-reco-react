import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://back-reco-node.onrender.com/userCars/getDataDashboard';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
  }, []);

  if (!isDataLoaded) {
    return <div>Cargando...</div>;
  }

  const { cochesPorUsuario, rankingMarcas, rankingModelos } = data;
  const cochesData = Object.entries(cochesPorUsuario);

  // Ordenar el ranking de marcas y modelos de forma descendente (mayor a menor)
  const sortedMarcas = Object.entries(rankingMarcas).sort((a, b) => b[1] - a[1]);
  const sortedModelos = Object.entries(rankingModelos).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2 text-center">N. de favoritos por usuario</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-200 shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Coches</th>
            </tr>
          </thead>
          <tbody>
            {cochesData.map(([usuario, { coches, numCoches }]) => (
              <tr key={usuario}>
                <td className="p-2">{usuario}</td>
                <td className="p-2">{numCoches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">Ranking de Marcas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-200 shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Veces seleccionada</th>
            </tr>
          </thead>
          <tbody>
            {sortedMarcas.map(([marca, numCoches]) => (
              <tr key={marca}>
                <td className="p-2">{marca}</td>
                <td className="p-2">{numCoches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">Ranking de Modelos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-200 shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-2">Modelo</th>
              <th className="p-2">Veces seleccionado</th>
            </tr>
          </thead>
          <tbody>
            {sortedModelos.map(([modelo, numCoches]) => (
              <tr key={modelo}>
                <td className="p-2">{modelo}</td>
                <td className="p-2">{numCoches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
