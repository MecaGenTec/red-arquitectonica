import React from 'react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      
      {/* SECCION CONTACTO */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COLUMNA 1 - MARCA */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-red-500">RED</span>
              <span className="text-xl text-gray-300">Arquitectónica</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Somos una red de empresas comprometidas con la construcción sostenible, 
              el diseño innovador y el bienestar de nuestra comunidad.
            </p>
            <p className="text-green-400 font-semibold">
              Inmobiliaria · Proyecto · Construcción
            </p>
          </div>

          {/* COLUMNA 2 - ENLACES */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navegación</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#inicio" className="hover:text-red-400 transition">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-red-400 transition">Nosotros</a></li>
              <li><a href="#servicios" className="hover:text-red-400 transition">Servicios</a></li>
              <li><a href="#propiedades" className="hover:text-red-400 transition">Propiedades</a></li>
              <li><a href="/login" className="hover:text-green-400 transition">Portal Agentes</a></li>
            </ul>
          </div>

          {/* COLUMNA 3 - CONTACTO */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contacto</h4>
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
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Lun - Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2024 RED Arquitectónica®. Todos los derechos reservados.</p>
          <p>Desarrollado por <span className="text-green-400 font-semibold">MecaGenTec</span></p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;