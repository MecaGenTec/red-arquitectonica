import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import Propiedades from './components/Propiedades';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Home = () => (
  <div>
    <Navbar />
    <main>
      <Hero />
      <Nosotros />
      <Servicios />
      <Propiedades />
    </main>
    <Footer />
  </div>
);

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          usuario ? <Navigate to="/dashboard" /> : <Login onLogin={setUsuario} />
        } />
        <Route path="/dashboard" element={
          usuario ? <Dashboard usuario={usuario} onLogout={() => setUsuario(null)} /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;