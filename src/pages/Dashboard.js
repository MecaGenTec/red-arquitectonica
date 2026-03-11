import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Dashboard = ({ usuario, onLogout }) => {
  const [propiedades, setPropiedades] = useState([]);
  const [vista, setVista] = useState('inicio');
  const [form, setForm] = useState({ titulo: '', tipo: 'venta', precio: '', ubicacion: '', m2: '', habitaciones: '', banos: '', estado: 'activa' });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPropiedades();
  }, []);

  const cargarPropiedades = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('propiedades').select('*').order('created_at', { ascending: false });
    if (!error) setPropiedades(data);
    setLoading(false);
  };

  const guardarPropiedad = async () => {
    if (!form.titulo || !form.precio) return alert('Completa título y precio');
    if (editandoId) {
      await supabase.from('propiedades').update(form).eq('id', editandoId);
      setEditandoId(null);
    } else {
      await supabase.from('propiedades').insert([form]);
    }
    setForm({ titulo: '', tipo: 'venta', precio: '', ubicacion: '', m2: '', habitaciones: '', banos: '', estado: 'activa' });
    await cargarPropiedades();
    setVista('propiedades');
  };

  const editarPropiedad = (p) => {
    setForm({ titulo: p.titulo, tipo: p.tipo, precio: p.precio, ubicacion: p.ubicacion || '', m2: p.m2 || '', habitaciones: p.habitaciones || '', banos: p.banos || '', estado: p.estado });
    setEditandoId(p.id);
    setVista('agregar');
  };

  const eliminarPropiedad = async (id) => {
    if (window.confirm('¿Eliminar esta propiedad?')) {
      await supabase.from('propiedades').delete().eq('id', id);
      await cargarPropiedades();
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
            <button key={item.id} onClick={() => { setVista(item.id); setEditandoId(null); setForm({ titulo: '', tipo: 'venta', precio: '', ubicacion: '', m2: '', habitaciones: '', banos: '', estado: 'activa' }); }}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${vista === item.id ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-2">👤 {usuario?.nombre || usuario?.email}</p>
          <button onClick={onLogout} className="w-full text-left text-gray-400 hover:text-red-400 text-sm transition">Cerrar sesión →</button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-8">

        {/* INICIO */}
        {vista === 'inicio' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Bienvenido 👋</h2>
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
              <h3 className="font-bold text-gray-700 mb-4">Propiedades Recientes</h3>
              {loading ? <p className="text-gray-400">Cargando...</p> : propiedades.slice(0, 5).map(p => (
                <div key={p.id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <span className="text-gray-600">{p.titulo}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.estado}</span>
                </div>
              ))}
              {!loading && propiedades.length === 0 && <p className="text-gray-400 text-sm">No hay propiedades aún. ¡Agrega la primera!</p>}
            </div>
          </div>
        )}

        {/* PROPIEDADES */}
        {vista === 'propiedades' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mis Propiedades</h2>
              <button onClick={() => setVista('agregar')} className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">+ Agregar</button>
            </div>
            {loading ? <p className="text-gray-400">Cargando...</p> : (
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
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.tipo === 'venta' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{p.tipo}</span></td>
                        <td className="px-6 py-4 text-gray-600">{p.precio}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.estado}</span></td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => editarPropiedad(p)} className="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
                          <button onClick={() => eliminarPropiedad(p.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {propiedades.length === 0 && <p className="text-center text-gray-400 py-8">No hay propiedades. ¡Agrega la primera!</p>}
              </div>
            )}
          </div>
        )}

        {/* AGREGAR / EDITAR */}
        {vista === 'agregar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editandoId ? 'Editar Propiedad' : 'Agregar Propiedad'}</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-lg space-y-5">
              {[
                { label: 'Título', key: 'titulo', placeholder: 'Casa Moderna en...' },
                { label: 'Precio', key: 'precio', placeholder: '$3,500,000' },
                { label: 'Ubicación', key: 'ubicacion', placeholder: 'Colonia, Ciudad' },
                { label: 'M²', key: 'm2', placeholder: '120' },
                { label: 'Habitaciones', key: 'habitaciones', placeholder: '3' },
                { label: 'Baños', key: 'banos', placeholder: '2' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-gray-600 font-medium mb-2">{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700"
                    placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="block text-gray-600 font-medium mb-2">Tipo</label>
                <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Estado</label>
                <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
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