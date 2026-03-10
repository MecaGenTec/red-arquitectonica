import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-800">RED</span>
          <span className="text-lg font-semibold text-gray-700">Arquitectónica</span>
        </div>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li><a href="#inicio" className="hover:text-red-800 transition">Inicio</a></li>
          <li><a href="#nosotros" className="hover:text-red-800 transition">Nosotros</a></li>
          <li><a href="#servicios" className="hover:text-red-800 transition">Servicios</a></li>
          <li><a href="#propiedades" className="hover:text-red-800 transition">Propiedades</a></li>
          <li><a href="#contacto" className="hover:text-red-800 transition">Contacto</a></li>
        </ul>

        {/* BOTON LOGIN */}
        <a href="/login" className="hidden md:block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition font-medium">
          Portal Agentes
        </a>

        {/* MENU HAMBURGUESA MOVIL */}
        <button 
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MENU MOVIL DESPLEGABLE */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-gray-700 font-medium">
          <a href="#inicio" className="hover:text-red-800">Inicio</a>
          <a href="#nosotros" className="hover:text-red-800">Nosotros</a>
          <a href="#servicios" className="hover:text-red-800">Servicios</a>
          <a href="#propiedades" className="hover:text-red-800">Propiedades</a>
          <a href="#contacto" className="hover:text-red-800">Contacto</a>
          <a href="/login" className="bg-green-700 text-white px-4 py-2 rounded-lg text-center">Portal Agentes</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;