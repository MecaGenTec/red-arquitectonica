import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Dashboard = ({ usuario, onLogout }) => {
  const [propiedades, setPropiedades] = useState([]);
  const [vista, setVista] = useState('inicio');
  const [form, setForm] = useState({
    titulo: '', tipo: 'venta', precio: '', ubicacion: '',
    habitaciones: '', banos: '', estado: 'activa',
    descripcion: '', video_url: '', fotos: []
  });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subiendoFotos, setSubiendoFotos] = useState(false);
  const [fotosPreview, setFotosPreview] = useState([]);

  useEffect(() => {
    cargarPropiedades();
  }, []);

  const cargarPropiedades = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('propiedades').select('*').order('created_at', { ascending: false });
    if (!error) setPropiedades(data);
    setLoading(false);
  };

  const handleFotos = async (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length + (form.fotos?.length || 0) > 20) {
      alert('Máximo 20 fotos por propiedad');
      return;
    }
    setSubiendoFotos(true);
    const urls = [];
    const previews = [];

    for (const archivo of archivos) {
      const nombre = `${Date.now()}-${archivo.name}`;
      const { error } = await supabase.storage
        .from('propiedades')
        .upload(nombre, archivo);

      if (!error) {
        const { data: urlData } = supabase.storage
          .from('propiedades')
          .getPublicUrl(nombre);
        urls.push(urlData.publicUrl);
        previews.push(urlData.publicUrl);
      }
    }

    setForm(prev => ({ ...prev, fotos: [...(prev.fotos || []), ...urls] }));
    setFotosPreview(prev => [...prev, ...previews]);
    setSubiendoFotos(false);
  };

  const eliminarFoto = (index) => {
    setForm(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== index) }));
    setFotosPreview(prev => prev.filter((_, i) => i !== index));
  };

  const guardarPropiedad = async () => {
    if (!form.titulo || !form.precio) return alert('Completa título y precio');
    const datos = { ...form };

    if (editandoId) {
      await supabase.from('propiedades').update(datos).eq('id', editandoId);
      setEditandoId(null);
    } else {
      await supabase.from('propiedades').insert([datos]);
    }

    setForm({ titulo: '', tipo: 'venta', precio: '', ubicacion: '', habitaciones: '', banos: '', estado: 'activa', descripcion: '', video_url: '', fotos: [] });
    setFotosPreview([]);
    await cargarPropiedades();
    setVista('propiedades');
  };

  const editarPropiedad = (p) => {
    setForm({
      titulo: p.titulo, tipo: p.tipo, precio: p.precio,
      ubicacion: p.ubicacion || '', habitaciones: p.habitaciones || '',
      banos: p.banos || '', estado: p.estado,
      descripcion: p.descripcion || '', video_url: p.video_url || '',
      fotos: p.fotos || []
    });
    setFotosPreview(p.fotos || []);
    setEditandoId(p.id);
    setVista('agregar');
  };

  const eliminarPropiedad = async (id) => {
    if (window.confirm('¿Eliminar esta propiedad?')) {
      await supabase.from('propiedades').delete().eq('id', id);
      await cargarPropiedades();
    }
  };

  const resetForm = () => {
    setForm({ titulo: '', tipo: 'venta', precio: '', ubicacion: '', habitaciones: '', banos: '', estado: 'activa', descripcion: '', video_url: '', fotos: [] });
    setFotosPreview([]);
    setEditandoId(null);
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
            <button key={item.id} onClick={() => { setVista(item.id); resetForm(); }}
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
      <main className="flex-1 p-8 overflow-y-auto">

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
                  <div className="flex items-center gap-3">
                    {p.fotos?.[0] && <img src={p.fotos[0]} alt={p.titulo} className="w-10 h-10 rounded-lg object-cover" />}
                    <span className="text-gray-600">{p.titulo}</span>
                  </div>
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
              <button onClick={() => { resetForm(); setVista('agregar'); }} className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">+ Agregar</button>
            </div>
            {loading ? <p className="text-gray-400">Cargando...</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {propiedades.map(p => (
                  <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* FOTO */}
                    <div className="h-48 bg-gray-200 relative">
                      {p.fotos?.[0]
                        ? <img src={p.fotos[0]} alt={p.titulo} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">🏠</div>
                      }
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${p.tipo === 'venta' ? 'bg-red-700' : 'bg-green-700'}`}>{p.tipo}</span>
                      {p.fotos?.length > 1 && <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">📷 {p.fotos.length}</span>}
                    </div>
                    {/* INFO */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{p.titulo}</h3>
                      <p className="text-gray-400 text-sm mb-2">📍 {p.ubicacion}</p>
                      <p className="text-red-700 font-bold text-lg mb-3">{p.precio}</p>
                      <div className="flex gap-3 text-gray-400 text-sm mb-4">
                        {p.habitaciones > 0 && <span>🛏 {p.habitaciones}</span>}
                        {p.banos > 0 && <span>🚿 {p.banos}</span>}
                        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.estado}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editarPropiedad(p)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition">Editar</button>
                        <button onClick={() => eliminarPropiedad(p.id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition">Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
                {propiedades.length === 0 && <p className="text-gray-400 col-span-3 text-center py-8">No hay propiedades. ¡Agrega la primera!</p>}
              </div>
            )}
          </div>
        )}

        {/* AGREGAR / EDITAR */}
        {vista === 'agregar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editandoId ? 'Editar Propiedad' : 'Agregar Propiedad'}</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">

              {/* CAMPOS BÁSICOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Título *', key: 'titulo', placeholder: 'Casa Moderna en...' },
                  { label: 'Precio *', key: 'precio', placeholder: '$3,500,000' },
                  { label: 'Ubicación', key: 'ubicacion', placeholder: 'Colonia, Ciudad' },
                  { label: 'Habitaciones', key: 'habitaciones', placeholder: '3' },
                  { label: 'Baños', key: 'banos', placeholder: '2' },
                  { label: 'Video URL (YouTube/Vimeo)', key: 'video_url', placeholder: 'https://youtube.com/...' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-gray-600 font-medium mb-2">{f.label}</label>
                    <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700"
                      placeholder={f.placeholder} />
                  </div>
                ))}
              </div>

              {/* TIPO Y ESTADO */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Tipo</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
                    <option value="venta">Venta</option>
                    <option value="renta">Renta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Estado</label>
                  <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700">
                    <option value="activa">Activa</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              {/* DESCRIPCIÓN */}
              <div>
                <label className="block text-gray-600 font-medium mb-2">Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  rows={4} placeholder="Describe la propiedad en detalle..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 resize-none" />
              </div>

              {/* FOTOS */}
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Fotos ({fotosPreview.length}/20)
                </label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition
                  ${subiendoFotos ? 'border-gray-300 bg-gray-50' : 'border-red-300 hover:border-red-500 hover:bg-red-50'}`}>
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-gray-500 text-sm">
                    {subiendoFotos ? 'Subiendo fotos...' : 'Clic para agregar fotos (máx. 20)'}
                  </span>
                  <input type="file" multiple accept="image/*" onChange={handleFotos}
                    className="hidden" disabled={subiendoFotos || fotosPreview.length >= 20} />
                </label>

                {/* PREVIEW FOTOS */}
                {fotosPreview.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {fotosPreview.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt={`foto-${i}`} className="w-full h-24 object-cover rounded-lg" />
                        <button onClick={() => eliminarFoto(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          ✕
                        </button>
                        {i === 0 && <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">Principal</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={guardarPropiedad}
                disabled={subiendoFotos}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50">
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