import React from 'react';

const servicios = [
  {
    icono: '🏠',
    titulo: 'Inmobiliaria',
    descripcion: 'Conectamos compradores y vendedores con las mejores propiedades del mercado. Venta y renta de inmuebles residenciales y comerciales.',
    color: 'border-red-700'
  },
  {
    icono: '📐',
    titulo: 'Proyecto',
    descripcion: 'Diseño arquitectónico innovador y sustentable. Desarrollamos proyectos que integran tecnología verde y bienestar comunitario.',
    color: 'border-green-700'
  },
  {
    icono: '🏗️',
    titulo: 'Construcción',
    descripcion: 'Construcción de alta calidad con materiales sostenibles. Edificamos el futuro con responsabilidad ambiental y social.',
    color: 'border-red-700'
  },
  {
    icono: '♻️',
    titulo: 'Tecnología Verde',
    descripcion: 'Integramos soluciones energéticas limpias, paneles solares, sistemas de agua y materiales ecológicos en cada proyecto.',
    color: 'border-green-700'
  },
  {
    icono: '🤝',
    titulo: 'Red de Aliados',
    descripcion: 'Somos una comunidad de empresas comprometidas con el desarrollo sostenible. Juntos creamos más valor para nuestros clientes.',
    color: 'border-red-700'
  },
  {
    icono: '📊',
    titulo: 'Consultoría',
    descripcion: 'Asesoría integral en inversiones inmobiliarias, permisos de construcción y desarrollo de proyectos sustentables.',
    color: 'border-green-700'
  },
];

const Servicios = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TITULO */}
        <div className="text-center mb-16">
          <p className="text-green-700 font-semibold uppercase tracking-widest mb-2">Lo que ofrecemos</p>
          <h2 className="text-4xl font-bold text-gray-800">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-red-700 mx-auto mt-4"></div>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-8 shadow-md border-t-4 ${servicio.color} hover:shadow-xl transition duration-300 hover:-translate-y-1`}
            >
              <div className="text-5xl mb-4">{servicio.icono}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{servicio.titulo}</h3>
              <p className="text-gray-500 leading-relaxed">{servicio.descripcion}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Servicios;