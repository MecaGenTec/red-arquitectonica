import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulación de login por ahora (después conectamos Supabase)
    setTimeout(() => {
      if (email === 'agente@red.com' && password === '123456') {
        onLogin({ nombre: 'Agente Demo', email });
      } else {
        setError('Correo o contraseña incorrectos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-red-700">RED</span>
            <span className="text-gray-700"> Arquitectónica</span>
          </h1>
          <p className="text-gray-400 mt-2">Portal de Agentes</p>
          <div className="w-16 h-1 bg-red-700 mx-auto mt-3"></div>
        </div>

        {/* FORMULARIO */}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agente@red.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-700 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>

        {/* HINT */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-400 text-center">
          Demo: <span className="font-mono text-gray-600">agente@red.com</span> / <span className="font-mono text-gray-600">123456</span>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 hover:text-red-700 text-sm transition">
            ← Volver al sitio principal
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;