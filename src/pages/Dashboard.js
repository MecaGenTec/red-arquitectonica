import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SERVICIOS_OPCIONES = [
  'Acceso a discapacitados', 'Agua', 'Aire acondicionado', 'Alberca',
  'Area infantil', 'Asador', 'Balcon', 'Bodega', 'Calefaccion',
  'Caseta de vigilancia', 'Chimenea', 'Cisterna', 'Cocina equipada',
  'Cocina integrada', 'Cuarto de Servicio', 'Electricidad', 'Estacionamiento',
  'Gas', 'Gimnasio', 'Jardin', 'Recamara con Closet', 'Roof Garden',
  'Salon de uso multiple', 'Seguridad', 'Terraza', 'Permite mascotas'
];

const CERCA_OPCIONES = ['Avenida', 'Centro Comercial', 'Escuelas', 'Parques'];

const FORM_INICIAL = {
  titulo: '', tipo: 'venta', tipo_propiedad: 'casa', precio: '',
  direccion: '', ubicacion: '', latitud: '', longitud: '',
  habitaciones: '', medios_banos: '', banos: '', estacionamiento: '',
  area_construida: '', area_terreno: '', ano_construccion: '',
  conservacion: 'bueno', mantenimiento: '', descripcion: '',
  video_url: '', referencia: '', estado: 'activa',
  servicios: [], cerca_de: [],
  contacto_emails: [''], contacto_telefono: '', contacto_whatsapp: '',
  fotos: [], planos: []
};

const Dashboard = ({ usuario, onLogout }) => {
  const [propiedades, setPropiedades] = useState([]);
  const [vista, setVista] = useState('inicio');
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subiendoFotos, setSubiendoFotos] = useState(false);
  const [subiendoPlanos, setSubiendoPlanos] = useState(false);
  const [fotosPreview, setFotosPreview] = useState([]);
  const [planosPreview, setPlanosPreview] = useState([]);

  useEffect(() => { cargarPropiedades(); }, []);

  const cargarPropiedades = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('propiedades').select('*').order('created_at', { ascending: false });
    if (!error) setPropiedades(data);
    setLoading(false);
  };

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const toggleServicio = (servicio) => {
    setForm(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const toggleCercaDe = (item) => {
    setForm(prev => ({
      ...prev,
      cerca_de: prev.cerca_de.includes(item)
        ? prev.cerca_de.filter(c => c !== item)
        : [...prev.cerca_de, item]
    }));
  };

  const handleEmails = (index, value) => {
    const emails = [...form.contacto_emails];
    emails[index] = value;
    setForm(prev => ({ ...prev, contacto_emails: emails }));
  };

  const agregarEmail = () => setForm(prev => ({ ...prev, contacto_emails: [...prev.contacto_emails, ''] }));
  const eliminarEmail = (index) => setForm(prev => ({ ...prev, contacto_emails: prev.contacto_emails.filter((_, i) => i !== index) }));

  const handleSubirArchivos = async (e, tipo) => {
    const archivos = Array.from(e.target.files);
    const esFoto = tipo === 'fotos';
    const limite = esFoto ? 20 : 5;
    const actual = esFoto ? form.fotos.length : form.planos.length;

    if (archivos.length + actual > limite) {
      alert(`Máximo ${limite} ${esFoto ? 'fotos' : 'planos'}`);
      return;
    }

    esFoto ? setSubiendoFotos(true) : setSubiendoPlanos(true);
    const urls = [];

    for (const archivo of archivos) {
      const nombre = `${tipo}/${Date.now()}-${archivo.name}`;
      const { error } = await supabase.storage.from('propiedades').upload(nombre, archivo);
      if (!error) {
        const { data: urlData } = supabase.storage.from('propiedades').getPublicUrl(nombre);
        urls.push(urlData.publicUrl);
      }
    }

    if (esFoto) {
      setForm(prev => ({ ...prev, fotos: [...prev.fotos, ...urls] }));
      setFotosPreview(prev => [...prev, ...urls]);
      setSubiendoFotos(false);
    } else {
      setForm(prev => ({ ...prev, planos: [...prev.planos, ...urls] }));
      setPlanosPreview(prev => [...prev, ...urls]);
      setSubiendoPlanos(false);
    }
  };

  const eliminarFoto = (index) => {
    setForm(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== index) }));
    setFotosPreview(prev => prev.filter((_, i) => i !== index));
  };

  const eliminarPlano = (index) => {
    setForm(prev => ({ ...prev, planos: prev.planos.filter((_, i) => i !== index) }));
    setPlanosPreview(prev => prev.filter((_, i) => i !== index));
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

    setForm(FORM_INICIAL);
    setFotosPreview([]);
    setPlanosPreview([]);
    await cargarPropiedades();
    setVista('propiedades');
  };

  const editarPropiedad = (p) => {
    setForm({
      titulo: p.titulo || '', tipo: p.tipo || 'venta',
      tipo_propiedad: p.tipo_propiedad || 'casa', precio: p.precio || '',
      direccion: p.direccion || '', ubicacion: p.ubicacion || '',
      latitud: p.latitud || '', longitud: p.longitud || '',
      habitaciones: p.habitaciones || '', medios_banos: p.medios_banos || '',
      banos: p.banos || '', estacionamiento: p.estacionamiento || '',
      area_construida: p.area_construida || '', area_terreno: p.area_terreno || '',
      ano_construccion: p.ano_construccion || '', conservacion: p.conservacion || 'bueno',
      mantenimiento: p.mantenimiento || '', descripcion: p.descripcion || '',
      video_url: p.video_url || '', referencia: p.referencia || '',
      estado: p.estado || 'activa', servicios: p.servicios || [],
      cerca_de: p.cerca_de || [],
      contacto_emails: p.contacto_emails?.length ? p.contacto_emails : [''],
      contacto_telefono: p.contacto_telefono || '',
      contacto_whatsapp: p.contacto_whatsapp || '',
      fotos: p.fotos || [], planos: p.planos || []
    });
    setFotosPreview(p.fotos || []);
    setPlanosPreview(p.planos || []);
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
    setForm(FORM_INICIAL);
    setFotosPreview([]);
    setPlanosPreview([]);
    setEditandoId(null);
  };

  const inputClass = "w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 text-gray-700";
  const labelClass = "block text-gray-600 font-medium mb-2";
  const sectionTitle = (title) => (
    <div className="border-b border-gray-200 pb-2 mb-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
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
      <main className="flex-1 ml-64 p-8 overflow-y-auto">

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
              {!loading && propiedades.length === 0 && <p className="text-gray-400 text-sm">No hay propiedades aún.</p>}
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
                    <div className="h-48 bg-gray-200 relative">
                      {p.fotos?.[0]
                        ? <img src={p.fotos[0]} alt={p.titulo} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">🏠</div>}
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${p.tipo === 'venta' ? 'bg-red-700' : 'bg-green-700'}`}>{p.tipo}</span>
                      {p.fotos?.length > 1 && <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">📷 {p.fotos.length}</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{p.titulo}</h3>
                      <p className="text-gray-400 text-sm mb-2">📍 {p.ubicacion}</p>
                      <p className="text-red-700 font-bold text-lg mb-3">{p.precio}</p>
                      <div className="flex gap-3 text-gray-400 text-sm mb-4">
                        {p.habitaciones > 0 && <span>🛏 {p.habitaciones}</span>}
                        {p.banos > 0 && <span>🚿 {p.banos}</span>}
                        {p.estacionamiento > 0 && <span>🚗 {p.estacionamiento}</span>}
                        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${p.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.estado}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editarPropiedad(p)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition">Editar</button>
                        <button onClick={() => eliminarPropiedad(p.id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition">Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
                {propiedades.length === 0 && <p className="text-gray-400 col-span-3 text-center py-8">No hay propiedades aún.</p>}
              </div>
            )}
          </div>
        )}

        {/* AGREGAR / EDITAR */}
        {vista === 'agregar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editandoId ? 'Editar Propiedad' : 'Agregar Propiedad'}</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-3xl space-y-8">

              {/* INFORMACIÓN BÁSICA */}
              {sectionTitle('📋 Información Básica')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Título *</label>
                  <input value={form.titulo} onChange={e => handleChange('titulo', e.target.value)} className={inputClass} placeholder="Casa Moderna en..." />
                </div>
                <div>
                  <label className={labelClass}>Tipo de Operación</label>
                  <select value={form.tipo} onChange={e => handleChange('tipo', e.target.value)} className={inputClass}>
                    <option value="venta">Venta</option>
                    <option value="renta">Renta</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tipo de Propiedad</label>
                  <select value={form.tipo_propiedad} onChange={e => handleChange('tipo_propiedad', e.target.value)} className={inputClass}>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="casa_fraccionamiento">Casa en Fraccionamiento</option>
                    <option value="casa_condominio">Casa en Condominio</option>
                    <option value="local_comercial">Local Comercial</option>
                    <option value="oficina">Oficina</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Precio *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400 font-medium">$</span>
                    <input value={form.precio} onChange={e => handleChange('precio', e.target.value)} className={`${inputClass} pl-8`} placeholder="3,500,000" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Gastos de Mantenimiento</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400 font-medium">$</span>
                    <input value={form.mantenimiento} onChange={e => handleChange('mantenimiento', e.target.value)} className={`${inputClass} pl-8`} placeholder="2,500/mes" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Estado</label>
                  <select value={form.estado} onChange={e => handleChange('estado', e.target.value)} className={inputClass}>
                    <option value="activa">Activa</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Estado de Conservación</label>
                  <select value={form.conservacion} onChange={e => handleChange('conservacion', e.target.value)} className={inputClass}>
                    <option value="excelente">Excelente</option>
                    <option value="bueno">Bueno</option>
                    <option value="normal">Normal</option>
                    <option value="necesita_reforma">Necesita Reforma</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Año de Construcción</label>
                  <input value={form.ano_construccion} onChange={e => handleChange('ano_construccion', e.target.value)} className={inputClass} placeholder="2015" type="number" />
                </div>
                <div>
                  <label className={labelClass}>Número de Referencia</label>
                  <input value={form.referencia} onChange={e => handleChange('referencia', e.target.value)} className={inputClass} placeholder="REF-001" />
                </div>
              </div>

              {/* UBICACIÓN */}
              {sectionTitle('📍 Ubicación')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Dirección</label>
                  <input value={form.direccion} onChange={e => handleChange('direccion', e.target.value)} className={inputClass} placeholder="Calle, Número, Colonia" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Ciudad / Municipio</label>
                  <input value={form.ubicacion} onChange={e => handleChange('ubicacion', e.target.value)} className={inputClass} placeholder="Colonia, Ciudad" />
                </div>

              </div>

              {/* CARACTERÍSTICAS */}
              {sectionTitle('🏠 Características')}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { label: 'Habitaciones', key: 'habitaciones', placeholder: '3' },
                  { label: 'Baños', key: 'banos', placeholder: '2' },
                  { label: 'Medios Baños', key: 'medios_banos', placeholder: '1' },
                  { label: 'Cajones Estacionamiento', key: 'estacionamiento', placeholder: '2' },
                  { label: 'Área Construida (m²)', key: 'area_construida', placeholder: '120' },
                  { label: 'Área del Terreno (m²)', key: 'area_terreno', placeholder: '200' },
                ].map(f => (
                  <div key={f.key}>
                    <label className={labelClass}>{f.label}</label>
                    <input value={form[f.key]} onChange={e => handleChange(f.key, e.target.value)} className={inputClass} placeholder={f.placeholder} type="number" />
                  </div>
                ))}
              </div>

              {/* DESCRIPCIÓN */}
              {sectionTitle('📝 Descripción')}
              <div>
                <textarea value={form.descripcion} onChange={e => handleChange('descripcion', e.target.value)}
                  rows={5} placeholder="Describe la propiedad en detalle..."
                  className={`${inputClass} resize-none`} />
              </div>

              {/* SERVICIOS */}
              {sectionTitle('✅ Servicios')}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICIOS_OPCIONES.map(s => (
                  <label key={s} className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition ${form.servicios.includes(s) ? 'border-red-700 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={form.servicios.includes(s)} onChange={() => toggleServicio(s)} className="accent-red-700" />
                    <span className="text-sm text-gray-600">{s}</span>
                  </label>
                ))}
              </div>

              {/* CERCA DE */}
              {sectionTitle('📌 Cerca de')}
              <div className="flex gap-4 flex-wrap">
                {CERCA_OPCIONES.map(c => (
                  <label key={c} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition ${form.cerca_de.includes(c) ? 'border-red-700 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={form.cerca_de.includes(c)} onChange={() => toggleCercaDe(c)} className="accent-red-700" />
                    <span className="text-sm font-medium">{c}</span>
                  </label>
                ))}
              </div>

              {/* FOTOS */}
              {sectionTitle(`📷 Fotos (${fotosPreview.length}/20)`)}
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition ${subiendoFotos ? 'border-gray-300 bg-gray-50' : 'border-red-300 hover:border-red-500 hover:bg-red-50'}`}>
                <span className="text-3xl mb-2">📷</span>
                <span className="text-gray-500 text-sm">{subiendoFotos ? 'Subiendo fotos...' : 'Clic para agregar fotos (máx. 20)'}</span>
                <input type="file" multiple accept="image/*" onChange={e => handleSubirArchivos(e, 'fotos')} className="hidden" disabled={subiendoFotos || fotosPreview.length >= 20} />
              </label>
              {fotosPreview.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {fotosPreview.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt={`foto-${i}`} className="w-full h-24 object-cover rounded-lg" />
                      <button onClick={() => eliminarFoto(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center">✕</button>
                      {i === 0 && <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">Principal</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* PLANOS */}
              {sectionTitle(`📐 Planos (${planosPreview.length}/5)`)}
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition ${subiendoPlanos ? 'border-gray-300 bg-gray-50' : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                <span className="text-3xl mb-2">📐</span>
                <span className="text-gray-500 text-sm">{subiendoPlanos ? 'Subiendo planos...' : 'Clic para agregar planos (máx. 5)'}</span>
                <input type="file" multiple accept="image/*" onChange={e => handleSubirArchivos(e, 'planos')} className="hidden" disabled={subiendoPlanos || planosPreview.length >= 5} />
              </label>
              {planosPreview.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {planosPreview.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt={`plano-${i}`} className="w-full h-32 object-cover rounded-lg border border-blue-200" />
                      <button onClick={() => eliminarPlano(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center">✕</button>
                    </div>
                  ))}
                </div>
              )}

              {/* VIDEO */}
              {sectionTitle('🎥 Video')}
              <div>
                <label className={labelClass}>URL del Video (YouTube / Vimeo)</label>
                <input value={form.video_url} onChange={e => handleChange('video_url', e.target.value)} className={inputClass} placeholder="https://youtube.com/watch?v=..." />
              </div>

              {/* DATOS DE CONTACTO */}
              {sectionTitle('📞 Datos de Contacto')}
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Emails de Contacto</label>
                  {form.contacto_emails.map((email, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={email} onChange={e => handleEmails(i, e.target.value)} className={inputClass} placeholder="contacto@email.com" type="email" />
                      {form.contacto_emails.length > 1 && (
                        <button onClick={() => eliminarEmail(i)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">✕</button>
                      )}
                    </div>
                  ))}
                  <button onClick={agregarEmail} className="text-sm text-red-700 hover:text-red-800 font-medium">+ Agregar otro email</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Teléfono</label>
                    <input value={form.contacto_telefono} onChange={e => handleChange('contacto_telefono', e.target.value)} className={inputClass} placeholder="+52 (55) 0000-0000" />
                  </div>
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input value={form.contacto_whatsapp} onChange={e => handleChange('contacto_whatsapp', e.target.value)} className={inputClass} placeholder="+52 (55) 0000-0000" />
                  </div>
                </div>
              </div>

              {/* BOTÓN GUARDAR */}
              <button onClick={guardarPropiedad} disabled={subiendoFotos || subiendoPlanos}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-lg font-semibold text-lg transition disabled:opacity-50">
                {editandoId ? '💾 Guardar Cambios' : '➕ Agregar Propiedad'}
              </button>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;