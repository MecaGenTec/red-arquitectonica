import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Footer = () => {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.from('contactos').insert([form]);

    if (error) {
      setError('Hubo un error al enviar. Intenta de nuevo.');
    } else {
      setExito(true);
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
    }
    setLoading(false);
  };

  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* COLUMNA IZQUIERDA - INFO */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-red-500">RED</span>
              <span className="text-xl text-gray-300">Arquitectónica</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Somos una red de empresas comprometidas con la construcción sostenible,
              el diseño innovador y el bienestar de nuestra comunidad.
            </p>
            <p className="text-green-400 font-semibold mb-10">
              Inmobiliaria · Proyecto · Construcción
            </p>

            <h4 className="text-lg font-bold mb-4 text-white">Información de Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contacto@redarquitectonica.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+52 (55) 0000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Ciudad de México, México</span>
              </li>
            </ul>

            <div className="mt-10">
              <h4 className="text-lg font-bold mb-4 text-white">Navegación</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#inicio" className="hover:text-red-400 transition">Inicio</a></li>
                <li><a href="#nosotros" className="hover:text-red-400 transition">Nosotros</a></li>
                <li><a href="#servicios" className="hover:text-red-400 transition">Servicios</a></li>
                <li><a href="#propiedades" className="hover:text-red-400 transition">Propiedades</a></li>
                <li><a href="/login" className="hover:text-green-400 transition">Portal Agentes</a></li>
              </ul>
            </div>
          </div>

          {/* COLUMNA DERECHA - FORMULARIO */}
          <div>
            <h4 className="text-2xl font-bold mb-2 text-white">Contáctanos</h4>
            <p className="text-gray-400 mb-8">Déjanos tu mensaje y te respondemos a la brevedad.</p>

            {exito ? (
              <div className="bg-green-600 text-white p-6 rounded-xl text-center">
                <p className="text-xl font-bold mb-2">¡Mensaje enviado! ✅</p>
                <p className="text-green-100">Nos pondremos en contacto contigo pronto.</p>
                <button
                  onClick={() => setExito(false)}
                  className="mt-4 text-sm underline text-green-200 hover:text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Correo electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@correo.com"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+52 (55) 0000-0000"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">Mensaje *</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-900/30 px-4 py-2 rounded-lg">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-semibold text-lg transition disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          © 2024 RED Arquitectónica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;