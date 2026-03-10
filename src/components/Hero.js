import React from 'react';

const Hero = () => {
  return (
    <section 
      id="inicio"
      className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center px-6 max-w-4xl">
        <p className="text-green-400 text-lg font-semibold mb-4 tracking-widest uppercase">
          Inmobiliaria · Proyecto · Construcción
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Tu hogar ideal, <br/>
          <span className="text-red-400">construido para el futuro</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Somos una red de profesionales comprometidos con la construcción sostenible, 
          el diseño innovador y el bienestar de nuestra comunidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#propiedades" className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
            Ver Propiedades
          </a>
          <a href="#nosotros" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
            Conoce la RED
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;