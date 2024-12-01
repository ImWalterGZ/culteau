"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoAmbiente() {
  const router = useRouter();
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [nombreAmbiente, setNombreAmbiente] = useState("");
  const [medicionIniciada, setMedicionIniciada] = useState(false);
  
  // Constantes para valores óptimos según tipo
  const VALORES_OPTIMOS = {
    Seco: { humedad: 37.5, temperatura: 25 },
    Templado: { humedad: 50, temperatura: 20 },
    Frio: { humedad: 65, temperatura: 15 }
  };

  // Estado para los datos de medición
  const [datosAmbiente, setDatosAmbiente] = useState({
    humedad: null,
    temperatura: null,
    fertilidad: null,
    tiempoFertilidad: null
  });

  const calcularFertilidad = (humedadActual, temperaturaActual) => {
    if (!tipoSeleccionado) return 0;
    
    const { humedad: humedadOptima, temperatura: temperaturaOptima } = 
      VALORES_OPTIMOS[tipoSeleccionado];

    const componenteHumedad = (humedadActual / humedadOptima) * 50;
    const humedadAjustada = Math.min(50, Math.max(0, componenteHumedad));
    const componenteTemperatura = (temperaturaActual / temperaturaOptima) * 50;
    const temperaturaAjustada = Math.min(50, Math.max(0, componenteTemperatura));
    
    return humedadAjustada + temperaturaAjustada;
  };

  const obtenerTiempoFertilidad = (porcentaje) => {
    if (porcentaje >= 80) return 100;
    if (porcentaje >= 60) return 75;
    if (porcentaje >= 40) return 50;
    if (porcentaje >= 20) return 25;
    if (porcentaje > 0) return 10;
    return 0;
  };

  const iniciarMedicion = () => {
    if (!tipoSeleccionado) {
      alert("Por favor, seleccione un tipo de clima primero");
      return;
    }
    
    // Simulación de medición (reemplazar con datos reales del sensor)
    const humedadMedida = 30;
    const temperaturaMedida = 22;
    
    const fertilidadCalculada = calcularFertilidad(humedadMedida, temperaturaMedida);
    const tiempoFertilidadCalculado = obtenerTiempoFertilidad(fertilidadCalculada);

    setDatosAmbiente({
      humedad: humedadMedida,
      temperatura: temperaturaMedida,
      fertilidad: fertilidadCalculada,
      tiempoFertilidad: tiempoFertilidadCalculado
    });
    
    setMedicionIniciada(true);
  };

  const guardarAmbiente = async () => {
    if (!nombreAmbiente || !tipoSeleccionado || !medicionIniciada) {
      alert("Por favor, complete todos los campos y realice la medición");
      return;
    }

    try {
      const nuevoAmbiente = {
        nombre: nombreAmbiente,
        tipo: tipoSeleccionado,
        ...datosAmbiente,
        fechaCreacion: new Date().toISOString(),
        bombaAgua: {
          capacidadTotal: 5000,
          nivelActual: 5000,
          ultimaRecarga: new Date().toISOString()
        }
      };

      const response = await fetch('/api/ambientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAmbiente)
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/ambiente/${data.ambiente.id}`);
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      console.error("Error al guardar el ambiente:", error);
      alert("Error al guardar el ambiente");
    }
  };

  // Definir los íconos para cada tipo de clima
  const climaIcons = {
    Seco: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    Templado: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    Frio: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  // Agregar información de plantas por tipo de clima
  const plantasPorClima = {
    Seco: [
      "Cactus (Cactaceae)",
      "Aloe Vera",
      "Lavanda",
      "Romero",
      "Suculentas (Echeveria)"
    ],
    Templado: [
      "Orquídeas",
      "Ficus",
      "Monstera Deliciosa",
      "Pothos",
      "Filodendro"
    ],
    Frio: [
      "Pino",
      "Abeto",
      "Hiedra",
      "Helecho",
      "Camelia"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="relative z-10 flex flex-col items-center">
        {/* Barra de navegación */}
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
                <Link href="/" className="hover:text-green-200 transition">Inicio</Link>
                <Link href="/busqueda" className="hover:text-green-200 transition">Búsqueda</Link>
                <Link href="/ambientes" className="hover:text-green-200 transition">Mis Ambientes</Link>
                <Link href="/cuenta" className="hover:text-green-200 transition">Cuenta</Link>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            Nuevo Ambiente
          </h1>

          {/* Selección de tipo de clima */}
          {!tipoSeleccionado ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl text-center text-gray-700 mb-8">
                ¿Para qué tipo de clima serán tus plantas?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Seco', 'Templado', 'Frio'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setTipoSeleccionado(tipo)}
                    className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 group"
                  >
                    <div className="flex flex-col items-center">
                      {climaIcons[tipo]}
                      <span className="text-xl font-semibold text-green-800 group-hover:text-green-600 transition mb-4">
                        Clima {tipo}
                      </span>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">Plantas recomendadas:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {plantasPorClima[tipo].map((planta, index) => (
                            <li key={index} className="text-left">{planta}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 text-center">
                  <span className="font-semibold">Nota importante:</span> La selección del tipo de clima debe basarse en los requerimientos específicos de la planta que desee cultivar. 
                  Las plantas listadas son solo ejemplos comunes. Consulte las necesidades particulares de su planta para obtener mejores resultados.
                </p>
              </div>
            </div>
          ) : (
            /* Formulario de medición */
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                {/* Nombre del ambiente */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre del Ambiente
                  </label>
                  <input
                    type="text"
                    value={nombreAmbiente}
                    onChange={(e) => setNombreAmbiente(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-green-500 
                      text-gray-800 font-medium placeholder-gray-400"
                    placeholder="Ingrese un nombre para su ambiente"
                  />
                </div>

                {/* Tipo seleccionado */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Tipo de clima seleccionado: <span className="font-semibold">{tipoSeleccionado}</span>
                    <button 
                      onClick={() => setTipoSeleccionado(null)}
                      className="ml-4 text-blue-500 hover:text-blue-600"
                    >
                      Cambiar
                    </button>
                  </p>
                </div>

                {/* Botón de medición */}
                <div className="flex justify-center mb-8">
                  <button
                    onClick={iniciarMedicion}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 flex items-center gap-2"
                  >
                    {medicionIniciada ? "Nueva Medición" : "Iniciar Medición"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12h13.5m-13.5 0l5.25-5.25M5.25 12l5.25 5.25" />
                    </svg>
                  </button>
                </div>

                {/* Resultados */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Humedad</h3>
                    <p className="text-2xl text-green-600">
                      {datosAmbiente.humedad ? `${datosAmbiente.humedad}%` : '---'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Temperatura</h3>
                    <p className="text-2xl text-green-600">
                      {datosAmbiente.temperatura ? `${datosAmbiente.temperatura}°C` : '---'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Fertilidad</h3>
                    <p className="text-2xl text-green-600">
                      {datosAmbiente.fertilidad ? `${datosAmbiente.fertilidad.toFixed(1)}%` : '---'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Progreso</h3>
                    <p className="text-2xl text-green-600">
                      {datosAmbiente.tiempoFertilidad ? `${datosAmbiente.tiempoFertilidad}%` : '---'}
                    </p>
                  </div>
                </div>

                {/* Botón guardar */}
                <div className="flex justify-center">
                  <button
                    onClick={guardarAmbiente}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg transition duration-300"
                  >
                    Guardar Ambiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
