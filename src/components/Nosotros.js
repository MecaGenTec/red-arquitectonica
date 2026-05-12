import React, { useState } from 'react';
import oficinaExterior from '../assets/Oficinas Red Arq.png';
import oficinaInterior1 from '../assets/Interior Oficinas Red Arq.jpeg';
import oficinaInterior2 from '../assets/Interior Oficinas Red Arq2.jpeg';

const Nosotros = () => {
  const [fotoActiva, setFotoActiva] = useState(0);
  const fotos = [oficinaExterior, oficinaInterior1, oficinaInterior2];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITULO */}
        <div className="text-center mb-16">
          <p className="text-green-700 font-semibold uppercase tracking-widest mb-2">Quiénes somos</p>
          <h2 className="text-4xl font-bold text-gray-800">Nuestra RED</h2>
          <div className="w-20 h-1 bg-red-700 mx-auto mt-4"></div>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Construimos comunidad, <span className="text-green-700">construimos futuro</span>
            </h3>
            <p className="text-gray-500 leading-relaxed mb-4">
              RED Arquitectónica es una empresa mexicana integradora de profesionales especialistas en el área de arquitectura, para brindar a nuestros clientes soluciones integrales que engloban los servicios de comercialización inmobiliaria, de proyecto, construcción y mantenimiento de inmuebles. Somos el puente entre los mejores profesionales del sector y nuestros clientes.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Red Arquitectónica es una marca registrada ante el IMPI (Instituto Mexicano de Propiedad Industrial) desde enero de 2019.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nos distingue un compromiso constante con la actualización y el profesionalismo, por lo que nuestros asesores inmobiliarios están certificados ante CONOCER (Certificación Inmobiliaria Federal) en la comercialización de inmuebles.
            </p>
          </div>

          {/* GALERÍA DE FOTOS */}
          <div>
            {/* FOTO PRINCIPAL */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-80 mb-3">
              <img
                src={fotos[fotoActiva]}
                alt="Oficinas RED Arquitectónica"
                className="w-full h-full object-cover transition duration-500"
              />
            </div>
            {/* MINIATURAS */}
            <div className="grid grid-cols-3 gap-3">
              {fotos.map((foto, i) => (
                <div
                  key={i}
                  onClick={() => setFotoActiva(i)}
                  className={`rounded-lg overflow-hidden h-20 cursor-pointer border-2 transition ${
                    fotoActiva === i ? 'border-red-700' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={foto} alt={`Oficina ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MISION VISION VALORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-red-700 text-white rounded-xl p-8">
            <h4 className="text-xl font-bold mb-4">🎯 Misión</h4>
            <p className="leading-relaxed opacity-90">
              Conectar a nuestra comunidad con soluciones habitacionales y de construcción
              sostenibles, generando valor para clientes, aliados y el medio ambiente.
            </p>
          </div>
          <div className="bg-green-700 text-white rounded-xl p-8">
            <h4 className="text-xl font-bold mb-4">🔭 Visión</h4>
            <p className="leading-relaxed opacity-90">
              Ser la red inmobiliaria y constructora más reconocida por su compromiso
              con la sustentabilidad y la innovación tecnológica en México.
            </p>
          </div>
          <div className="bg-gray-800 text-white rounded-xl p-8">
            <h4 className="text-xl font-bold mb-4">💚 Valores</h4>
            <ul className="space-y-2 opacity-90">
              <li>✓ Sustentabilidad</li>
              <li>✓ Innovación</li>
              <li>✓ Comunidad</li>
              <li>✓ Transparencia</li>
              <li>✓ Calidad</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Nosotros;