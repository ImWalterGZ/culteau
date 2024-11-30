"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DetalleAmbiente() {
  const params = useParams();
  const router = useRouter();
  const [ambiente, setAmbiente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Información de riego por tipo de clima basada en estudios agrícolas
  const infoRiego = {
    Seco: {
      frecuencia: "3-4 veces por semana",
      cantidad: "500-600ml por m²",
      recomendaciones: [
        "Regar al amanecer (4-6 AM) o atardecer (6-8 PM) para minimizar la evaporación",
        "Mantener una capa de mulch orgánico de 5-7cm para retener humedad",
        "Implementar riego por goteo para optimizar el uso del agua",
        "Monitorear la humedad del suelo a 15-20cm de profundidad",
        "Reducir frecuencia en temporada fría (1-2 veces/semana)"
      ],
      condicionesOptimas: {
        humedadSuelo: "35-40%",
        temperaturaIdeal: "23-27°C",
        pH: "6.0-7.0"
      }
    },
    Templado: {
      frecuencia: "2 veces por semana",
      cantidad: "300-400ml por m²",
      recomendaciones: [
        "Regar temprano en la mañana para prevenir enfermedades fúngicas",
        "Mantener una humedad constante pero no saturada (40-50%)",
        "Ajustar el riego según las precipitaciones locales",
        "Verificar el drenaje del suelo regularmente",
        "Aumentar frecuencia durante olas de calor"
      ],
      condicionesOptimas: {
        humedadSuelo: "45-55%",
        temperaturaIdeal: "18-23°C",
        pH: "6.5-7.0"
      }
    },
    Frio: {
      frecuencia: "1-2 veces por semana",
      cantidad: "200-300ml por m²",
      recomendaciones: [
        "Regar en las horas más cálidas del día para evitar congelamiento",
        "Reducir el riego un 50% durante el invierno",
        "Evitar encharcamientos que puedan congelar las raíces",
        "Mantener buena circulación de aire para prevenir hongos",
        "Usar mantillo para proteger raíces del frío extremo"
      ],
      condicionesOptimas: {
        humedadSuelo: "55-65%",
        temperaturaIdeal: "13-18°C",
        pH: "5.5-6.5"
      }
    }
  };

  useEffect(() => {
    const cargarAmbiente = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/ambientes/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el ambiente');
        }

        console.log("Ambiente cargado:", data);
        setAmbiente(data);
      } catch (error) {
        console.error("Error al cargar ambiente:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      cargarAmbiente();
    }
  }, [params.id]);

  const eliminarAmbiente = async () => {
    if (!confirm('¿Está seguro que desea eliminar este ambiente?')) {
      return;
    }

    try {
      const response = await fetch(`/api/ambientes/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/ambientes');
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      console.error("Error al eliminar ambiente:", error);
      alert("Error al eliminar el ambiente");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-600 text-xl mb-2">Cargando ambiente...</div>
          <div className="text-gray-500">Por favor espere</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">Error al cargar el ambiente</div>
          <div className="text-gray-500">{error}</div>
          <Link href="/ambientes" className="text-blue-500 hover:underline mt-4 inline-block">
            Volver a mis ambientes
          </Link>
        </div>
      </div>
    );
  }

  const infoRiegoActual = infoRiego[ambiente.tipo];

  // Función para calcular el porcentaje de agua restante
  const calcularPorcentajeAgua = (bomba) => {
    if (!bomba) return 0;
    return Math.round((bomba.nivelActual / bomba.capacidadTotal) * 100);
  };

  // Función para obtener el estado de la bomba
  const obtenerEstadoBomba = (bomba) => {
    if (!bomba) return 'crítico';
    const porcentaje = calcularPorcentajeAgua(bomba);
    if (porcentaje <= 20) return 'crítico';
    if (porcentaje <= 40) return 'bajo';
    return 'normal';
  };

  // Función para obtener el color según el estado
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'crítico': return 'text-red-600 bg-red-50';
      case 'bajo': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Encabezado con botón de eliminar */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-green-800">{ambiente.nombre}</h1>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full mt-2 inline-block">
                Clima {ambiente.tipo}
              </span>
            </div>
            <button
              onClick={eliminarAmbiente}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Eliminar Ambiente
            </button>
          </div>

          {/* Información principal */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
              <div className="text-center">
                <h3 className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
                  </svg>
                  Humedad
                </h3>
                <p className="text-2xl font-bold text-green-600">{ambiente.humedad}%</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 1 0 -4 0v8.5" />
                  </svg>
                  Temperatura
                </h3>
                <p className="text-2xl font-bold text-green-600">{ambiente.temperatura}°C</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
                    <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
                    <path d="M12 20l0 -10" />
                  </svg>
                  Fertilidad
                </h3>
                <p className="text-2xl font-bold text-green-600">{ambiente.fertilidad.toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12l3 2" />
                    <path d="M12 7v5" />
                  </svg>
                  Progreso
                </h3>
                <p className="text-2xl font-bold text-green-600">{ambiente.tiempoFertilidad}%</p>
              </div>
            </div>
          </div>

          {/* Información de riego y condiciones óptimas */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Plan de Riego</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Frecuencia de Riego</h3>
                  <p className="text-lg text-green-600">{infoRiegoActual.frecuencia}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Cantidad de Agua</h3>
                  <p className="text-lg text-green-600">{infoRiegoActual.cantidad}</p>
                </div>
              </div>

              {/* Condiciones Óptimas */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Condiciones Óptimas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Humedad del Suelo</p>
                    <p className="text-lg text-green-700">{infoRiegoActual.condicionesOptimas.humedadSuelo}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Temperatura Ideal</p>
                    <p className="text-lg text-green-700">{infoRiegoActual.condicionesOptimas.temperaturaIdeal}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">pH Recomendado</p>
                    <p className="text-lg text-green-700">{infoRiegoActual.condicionesOptimas.pH}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Recomendaciones</h2>
              <ul className="space-y-3">
                {infoRiegoActual.recomendaciones.map((recomendacion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{recomendacion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fecha de creación */}
          <p className="text-sm text-gray-500 mt-4">
            Creado el: {new Date(ambiente.fechaCreacion).toLocaleDateString()}
          </p>

          {/* Estado de la Bomba de Agua */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Estado del Sistema de Riego</h2>
                {ambiente.bombaAgua?.nivelActual <= (ambiente.bombaAgua?.capacidadTotal * 0.2) && (
                  <div className="flex items-center text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-semibold">¡Nivel crítico de agua!</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-600 mb-1">Capacidad Total</h3>
                  <p className="text-xl font-bold text-blue-600">
                    {((ambiente.bombaAgua?.capacidadTotal || 0) / 1000).toFixed(1)}L
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${obtenerColorEstado(ambiente.bombaAgua)}`}>
                  <h3 className="text-sm text-gray-600 mb-1">Nivel Actual</h3>
                  <p className="text-xl font-bold">
                    {((ambiente.bombaAgua?.nivelActual || 0) / 1000).toFixed(1)}L
                    <span className="text-sm font-normal ml-2">
                      ({calcularPorcentajeAgua(ambiente.bombaAgua)}%)
                    </span>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-600 mb-1">Última Recarga</h3>
                  <p className="text-xl font-bold text-gray-600">
                    {ambiente.bombaAgua?.ultimaRecarga ? 
                      new Date(ambiente.bombaAgua.ultimaRecarga).toLocaleDateString() : 
                      'No disponible'}
                  </p>
                </div>
              </div>

              {ambiente.bombaAgua?.nivelActual <= (ambiente.bombaAgua?.capacidadTotal * 0.4) && (
                <div className={`mt-4 p-4 rounded-lg ${
                  ambiente.bombaAgua.nivelActual <= (ambiente.bombaAgua.capacidadTotal * 0.2)
                    ? 'bg-red-50 text-red-700'
                    : 'bg-orange-50 text-orange-700'
                }`}>
                  <p className="font-semibold">
                    {ambiente.bombaAgua.nivelActual <= (ambiente.bombaAgua.capacidadTotal * 0.2)
                      ? '¡Atención! El nivel de agua es crítico. Recargue la bomba lo antes posible para mantener el sistema de riego funcionando correctamente.'
                      : 'El nivel de agua está bajo. Considere recargar la bomba pronto para mantener el riego óptimo.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 