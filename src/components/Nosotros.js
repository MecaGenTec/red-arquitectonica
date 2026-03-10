import React from 'react';

const Nosotros = () => {
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
            <p className="text-gray-500 leading-relaxed mb-6">
              RED Arquitectónica es una red de empresas aliadas comprometidas con ofrecer 
              soluciones integrales en inmobiliaria, diseño y construcción sostenible. 
              Somos el puente entre los mejores profesionales del sector y nuestros clientes.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nuestra filosofía se basa en la tecnología verde, el respeto al medio ambiente 
              y el desarrollo de comunidades que perduran en el tiempo.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-red-700">10+</p>
                <p className="text-gray-500 text-sm">Empresas Aliadas</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-700">500+</p>
                <p className="text-gray-500 text-sm">Proyectos Realizados</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-700">15+</p>
                <p className="text-gray-500 text-sm">Años de Experiencia</p>
              </div>
            </div>
          </div>
          <div 
            className="rounded-2xl overflow-hidden shadow-xl h-96"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
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