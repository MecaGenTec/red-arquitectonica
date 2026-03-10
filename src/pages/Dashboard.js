import React, { useState } from 'react';

const propiedadesIniciales = [
  { id: 1, titulo: 'Casa Moderna en Pedregal', tipo: 'venta', precio: '$4,500,000', estado: 'activa' },
  { id: 2, titulo: 'Departamento en Polanco', tipo: 'renta', precio: '$18,000/mes', estado: 'activa' },
  { id: 3, titulo: 'Residencia con Jardín', tipo: 'venta', precio: '$8,200,000', estado: 'pendiente' },
];

const Dashboard = ({ usuario, onLogout }) => {
  const [propiedades, setPropiedades] = useState(propiedadesIniciales);
  const [vista, setVista] = useState('inicio');
  const [form, setForm] = useState({ titulo: '', tipo: 'venta', precio: '', estado: 'activa' });
  const [editandoId, setEditandoId] = useState(null);

  const guardarPropiedad = () => {
    if (!form.titulo || !form.precio) return alert('Completa todos los campos');
    if (editandoId) {
      setPropiedades(propiedades.map(p => p.id === editandoId ? { ...form, id: editandoId } : p));
      setEditandoId(null);
    } else {
      setPropiedades([...propiedades, { ...form, id: Date.now() }]);
    }
    setForm({ titulo: '', tipo: 'venta', precio: '', estado: 'activa' });
    setVista('propiedades');
  };

  const editarPropiedad = (p) => {
    setForm({ titulo: p.titulo, tipo: p.tipo, precio: p.precio, estado: p.estado });
    setEditandoId(p.id);
    setVista('agregar');
  };

  const eliminarPropiedad = (id) => {
    if (window.confirm('¿Eliminar esta propiedad?')) {
      setPropiedades(propiedades.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold"><span className="text-red-400">RED</span> Arquitectónica</h1>
          <p className="text-gray-400 text-sm mt-1">Portal de Agentes</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'inicio', label: '🏠 Inicio' },
            { id: 'propiedades', label: '🏗️ Mis Propiedades' },
            { id: 'agregar', label: '➕ Agregar Propiedad' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setVista(item.id); setEditandoId(null); setForm({ titulo: '', tipo: 'venta', precio: '', estado: 'activa' }); }}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${vista === item.id ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-2">👤 {usuario?.nombre}</p>
          <button onClick={onLogout} className="w-full text-left text-gray-400 hover:text-red-400 text-sm transition">
            Cerrar sesión →
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-8">

        {/* INICIO */}
        {vista === 'inicio' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Bienvenido, {usuario?.nombre} 👋</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-700">
                <p className="text-gray-400 text-sm">Total Propiedades</p>
                <p className="text-4xl font-bold text-gray-800 mt-1">{propiedades.length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-700">
                <p className="text-gray-400 text-sm">Activas</p>
                <p className="text-4xl font-bold text-gray-800 mt-1">{propiedades.filter(p => p.estado === 'activa').length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
                <p className="text-gray-400 text-sm">Pendientes</p>
                <p className="text-4xl font-bold text-gray-800 mt-1">{propiedades.filter(p => p.estado === 'pendiente').length}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4">Actividad Reciente</h3>
              {propiedades.slice(0, 3).map(p => (
                <div key={p.id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <span className="text-gray-600">{p.titulo}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROPIEDADES */}
        {vista === 'propiedades' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mis Propiedades</h2>
              <button onClick={() => setVista('agregar')} className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
                + Agregar
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4">Propiedad</th>
                    <th className="text-left px-6 py-4">Tipo</th>
                    <th className="text-left px-6 py-4">Precio</th>
                    <th className="text-left px-6 py-4">Estado</th>
                    <th className="text-left px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {propiedades.map(p => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{p.titulo}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.tipo === 'venta' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {p.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{p.precio}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => editarPropiedad(p)} className="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
                        <button onClick={() => eliminarPropiedad(p.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AGREGAR / EDITAR */}
        {vista === 'agregar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editandoId ? 'Editar Propiedad' : 'Agregar Propiedad'}</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-lg space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-2">Título</label>
                <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700"
                  placeholder="Casa Moderna en..." />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Tipo</label>
                <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Precio</label>
                <input value={form.precio} onChange={e => setForm({...form, precio: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700"
                  placeholder="$3,500,000" />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Estado</label>
                <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
                  <option value="activa">Activa</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>
              <button onClick={guardarPropiedad} className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition">
                {editandoId ? 'Guardar Cambios' : 'Agregar Propiedad'}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;