"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ambientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAmbientes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ambientes');
        if (!response.ok) throw new Error('Error al cargar ambientes');
        
        const data = await response.json();
        console.log("Ambientes cargados:", data);
        setAmbientes(data);
      } catch (error) {
        console.error("Error al cargar ambientes:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarAmbientes();
  }, []);

  const eliminarAmbiente = async (id, e) => {
    e.preventDefault();
    if (!confirm('¿Está seguro que desea eliminar este ambiente?')) {
      return;
    }

    try {
      const response = await fetch(`/api/ambientes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAmbientes(ambientes.filter(a => a.id !== id));
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      console.error("Error al eliminar ambiente:", error);
      alert("Error al eliminar el ambiente");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Navegación */}
      <nav className="w-full bg-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-green-200 transition"
            >
              Culteau
            </Link>
            <ul className="flex space-x-8 text-white">
              <li><Link href="/" className="hover:text-green-200 transition">Inicio</Link></li>
              <li><Link href="/busqueda" className="hover:text-green-200 transition">Búsqueda</Link></li>
              <li><Link href="/ambientes" className="hover:text-green-200 transition">Mis Ambientes</Link></li>
              <li><Link href="/cuenta" className="hover:text-green-200 transition">Cuenta</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            Mis Ambientes
          </h1>
          <Link 
            href="/nuevo-ambiente"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Nuevo Ambiente
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Cargando ambientes...</div>
        ) : ambientes.length === 0 ? (
          <div className="text-center text-gray-600">
            No hay ambientes creados. ¡Crea tu primer ambiente!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambientes.map((ambiente) => (
              <div key={ambiente.id} className="relative">
                <Link 
                  href={`/ambiente/${ambiente.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 block"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      {ambiente.nombre}
                    </h3>
                    <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mb-4">
                      Clima {ambiente.tipo}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Humedad</p>
                        <p className="text-lg font-semibold text-green-600">
                          {ambiente.humedad}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Temperatura</p>
                        <p className="text-lg font-semibold text-green-600">
                          {ambiente.temperatura}°C
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      Creado el: {new Date(ambiente.fechaCreacion).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={(e) => eliminarAmbiente(ambiente.id, e)}
                  className="absolute top-2 right-2 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition duration-300"
                  title="Eliminar ambiente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
