import React from 'react';

const servicios = [
  {
    icono: '🏠',
    titulo: 'Venta y Renta de Inmuebles',
    descripcion: 'Comercializamos propiedades residenciales y comerciales. Te ayudamos a encontrar el inmueble ideal o a vender/rentar el tuyo al mejor precio.',
    color: 'border-red-700'
  },
  {
    icono: '📋',
    titulo: 'Avalúos y Opiniones de Valor',
    descripcion: 'Determinamos el valor real de tu propiedad en el mercado actual con criterios profesionales y certificados.',
    color: 'border-green-700'
  },
  {
    icono: '⚖️',
    titulo: 'Protección Jurídica para Rentas',
    descripcion: 'Resguardamos tus intereses legales en contratos de arrendamiento, garantizando seguridad jurídica para arrendadores y arrendatarios.',
    color: 'border-red-700'
  },
  {
    icono: '🏢',
    titulo: 'Administración de Inmuebles',
    descripcion: 'Gestionamos tu propiedad de forma integral: cobranza, mantenimiento, contratos y atención a inquilinos.',
    color: 'border-green-700'
  },
  {
    icono: '📊',
    titulo: 'Asesoría Legal y Fiscal',
    descripcion: 'Orientación especializada en aspectos legales y fiscales relacionados con la compra, venta y renta de inmuebles.',
    color: 'border-red-700'
  },
  {
    icono: '🏦',
    titulo: 'Gestión de Créditos',
    descripcion: 'Asesoría y gestoría de créditos bancarios, Autofinanciamiento, INFONAVIT, FOVISSSTE y PEMEX para hacer realidad tu patrimonio.',
    color: 'border-green-700'
  },
  {
    icono: '🔍',
    titulo: 'Búsqueda de Inmuebles',
    descripcion: 'Encontramos la propiedad que se adapta a tus necesidades y presupuesto. Ahorra tiempo con nuestra búsqueda personalizada.',
    color: 'border-red-700'
  },
  {
    icono: '🏗️',
    titulo: 'Proyecto, Construcción y Mantenimiento',
    descripcion: 'Diseño arquitectónico, construcción y mantenimiento de inmuebles residenciales y comerciales con altos estándares de calidad.',
    color: 'border-green-700'
  },
  {
    icono: '🎓',
    titulo: 'Certificación Federal de Asesor',
    descripcion: 'Nuestros asesores están certificados ante CONOCER (Certificación Inmobiliaria Federal EC01 10.01) en la comercialización de inmuebles.',
    color: 'border-red-700'
  },
  {
    icono: '💰',
    titulo: 'Inversiones en Remates Bancarios',
    descripcion: 'Te asesoramos en la adquisición de propiedades en remate bancario, maximizando tu inversión con el menor riesgo posible.',
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