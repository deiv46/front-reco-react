import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import List from './components/List';
import Header from './components/Header';

function App() {
  const refreshHeader = () => {
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list" element={<List refreshHeader={refreshHeader} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
