import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Nosotros from './components/Nosotros';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
      </main>
      <Footer />
    </div>
  );
}

export default App;