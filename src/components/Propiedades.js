import React, { useState } from 'react';

const propiedades = [
  {
    id: 1,
    titulo: 'Casa Moderna en Pedregal',
    tipo: 'venta',
    precio: '$4,500,000',
    ubicacion: 'Pedregal, CDMX',
    m2: 280,
    habitaciones: 4,
    banos: 3,
    imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
  },
  {
    id: 2,
    titulo: 'Departamento en Polanco',
    tipo: 'renta',
    precio: '$18,000/mes',
    ubicacion: 'Polanco, CDMX',
    m2: 120,
    habitaciones: 2,
    banos: 2,
    imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
  },
  {
    id: 3,
    titulo: 'Residencia con Jardín',
    tipo: 'venta',
    precio: '$8,200,000',
    ubicacion: 'Lomas de Chapultepec, CDMX',
    m2: 450,
    habitaciones: 5,
    banos: 4,
    imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
  },
  {
    id: 4,
    titulo: 'Oficina Corporativa',
    tipo: 'renta',
    precio: '$35,000/mes',
    ubicacion: 'Santa Fe, CDMX',
    m2: 200,
    habitaciones: 0,
    banos: 2,
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
  },
  {
    id: 5,
    titulo: 'Casa Sustentable',
    tipo: 'venta',
    precio: '$3,800,000',
    ubicacion: 'Coyoacán, CDMX',
    m2: 220,
    habitaciones: 3,
    banos: 2,
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
  },
  {
    id: 6,
    titulo: 'Loft en Condesa',
    tipo: 'renta',
    precio: '$14,500/mes',
    ubicacion: 'Condesa, CDMX',
    m2: 85,
    habitaciones: 1,
    banos: 1,
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
  },
];

const Propiedades = () => {
  const [filtro, setFiltro] = useState('todas');

  const propiedadesFiltradas = propiedades.filter(p => {
    if (filtro === 'todas') return true;
    return p.tipo === filtro;
  });

  return (
    <section id="propiedades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITULO */}
        <div className="text-center mb-12">
          <p className="text-green-700 font-semibold uppercase tracking-widest mb-2">Catálogo</p>
          <h2 className="text-4xl font-bold text-gray-800">Propiedades Disponibles</h2>
          <div className="w-20 h-1 bg-red-700 mx-auto mt-4"></div>
        </div>

        {/* FILTROS */}
        <div className="flex justify-center gap-4 mb-12">
          {['todas', 'venta', 'renta'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-6 py-2 rounded-full font-semibold capitalize transition ${
                filtro === f
                  ? 'bg-red-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-red-700 hover:text-red-700'
              }`}
            >
              {f === 'todas' ? 'Todas' : f === 'venta' ? 'En Venta' : 'En Renta'}
            </button>
          ))}
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedadesFiltradas.map(p => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">
              
              {/* IMAGEN */}
              <div className="relative h-52 overflow-hidden">
                <img src={p.imagen} alt={p.titulo} className="w-full h-full object-cover"/>
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-bold ${
                  p.tipo === 'venta' ? 'bg-red-700' : 'bg-green-700'
                }`}>
                  {p.tipo === 'venta' ? 'Venta' : 'Renta'}
                </span>
              </div>

              {/* INFO */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{p.titulo}</h3>
                <p className="text-gray-400 text-sm mb-3">📍 {p.ubicacion}</p>
                <p className="text-2xl font-bold text-red-700 mb-4">{p.precio}</p>
                
                {/* DETALLES */}
                <div className="flex gap-4 text-gray-500 text-sm border-t pt-4">
                  <span>📐 {p.m2} m²</span>
                  {p.habitaciones > 0 && <span>🛏 {p.habitaciones} hab.</span>}
                  <span>🚿 {p.banos} baños</span>
                </div>

                <button className="mt-4 w-full bg-gray-800 hover:bg-red-700 text-white py-2 rounded-lg transition font-medium">
                  Ver Propiedad
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Propiedades;