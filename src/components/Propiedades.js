import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Propiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPropiedades();
  }, []);

  const cargarPropiedades = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('propiedades')
      .select('*')
      .eq('estado', 'activa')
      .order('created_at', { ascending: false });
    if (!error) setPropiedades(data);
    setLoading(false);
  };

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
            <button key={f} onClick={() => setFiltro(f)}
              className={`px-6 py-2 rounded-full font-semibold capitalize transition ${
                filtro === f
                  ? 'bg-red-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-red-700 hover:text-red-700'
              }`}>
              {f === 'todas' ? 'Todas' : f === 'venta' ? 'En Venta' : 'En Renta'}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Cargando propiedades...</p>
          </div>
        )}

        {/* SIN PROPIEDADES */}
        {!loading && propiedadesFiltradas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏠</p>
            <p className="text-gray-400 text-lg">No hay propiedades disponibles por el momento.</p>
          </div>
        )}

        {/* TARJETAS */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedadesFiltradas.map(p => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">

                {/* IMAGEN */}
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  {p.fotos?.[0]
                    ? <img src={p.fotos[0]} alt={p.titulo} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">🏠</div>
                  }
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-bold ${
                    p.tipo === 'venta' ? 'bg-red-700' : 'bg-green-700'
                  }`}>
                    {p.tipo === 'venta' ? 'Venta' : 'Renta'}
                  </span>
                  {p.fotos?.length > 1 && (
                    <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      📷 {p.fotos.length}
                    </span>
                  )}
                </div>

                {/* INFO */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{p.titulo}</h3>
                  <p className="text-gray-400 text-sm mb-3">📍 {p.ubicacion}</p>
                  <p className="text-2xl font-bold text-red-700 mb-4">{p.precio}</p>

                  {/* DETALLES */}
                  <div className="flex gap-4 text-gray-500 text-sm border-t pt-4">
                    {p.habitaciones > 0 && <span>🛏 {p.habitaciones} hab.</span>}
                    {p.banos > 0 && <span>🚿 {p.banos} baños</span>}
                  </div>

                  {p.descripcion && (
                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">{p.descripcion}</p>
                  )}

                  <button className="mt-4 w-full bg-gray-800 hover:bg-red-700 text-white py-2 rounded-lg transition font-medium">
                    Ver Propiedad
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Propiedades;