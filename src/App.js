import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import Propiedades from './components/Propiedades';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <Propiedades />
      </main>
      <Footer />
    </div>
  );
}

export default App;