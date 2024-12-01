"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export default function Ambientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to environment1 in Firebase
    const environmentRef = ref(database, "environment1");
    console.log("Fetching data from Firebase...");

    const unsubscribe = onValue(
      environmentRef,
      (snapshot) => {
        console.log("Received Firebase data:", snapshot.val());
        if (snapshot.exists()) {
          const envData = snapshot.val();
          const currentReadings = envData.current_readings || {};
          const settings = envData.settings || {};

          // Format the environment data
          const formattedEnvironment = {
            id: "environment1",
            nombre: settings.name || "Main Garden",
            tipo: settings.type || "Templado",
            humedad:
              `${
                (currentReadings.humidity.hum1 +
                  currentReadings.humidity.hum2 +
                  currentReadings.humidity.hum3 +
                  currentReadings.humidity.hum4) /
                4
              }` || 0,
            temperatura: currentReadings.temperature || 0,
            fechaCreacion:
              currentReadings.last_updated || new Date().toISOString(),
            moisture: currentReadings.moisture || 0,
            ph: currentReadings.ph || 100,
          };

          console.log("Formatted environment:", formattedEnvironment);
          setAmbientes([formattedEnvironment]);
        } else {
          console.log("No data exists in Firebase");
          setAmbientes([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const eliminarAmbiente = async (id, e) => {
    e.preventDefault();
    if (!confirm("¿Está seguro que desea eliminar este ambiente?")) {
      return;
    }

    try {
      // For now, we'll just show an alert since we probably don't want to delete the main environment
      alert(
        "This environment cannot be deleted as it's the main monitoring environment."
      );
    } catch (error) {
      console.error("Error al eliminar ambiente:", error);
      alert("Error al eliminar el ambiente");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/gradient.png)",
        backgroundSize: "110% 110%",
        backgroundPosition: "center",
      }}
    >
      {/* Navegación */}
      <div className="w-11/12 bg-transparent mx-auto mt-4 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/">
              <h1 className="text-2xl text-slate-100 font-bold">
                <span className="font-semibold">terra</span>Forma
              </h1>
            </Link>
            <ul className="flex space-x-8 text-white">
              <li>
                <Link href="/" className="hover:text-green-200 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/ambientes"
                  className="hover:text-green-200 transition"
                >
                  Mis Ambientes
                </Link>
              </li>
              <li>
                <Link
                  href="/cuenta"
                  className="hover:text-green-200 transition"
                >
                  Cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-grow w-11/12 mx-auto my-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 h-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-4xl font-bold text-green-800">
              Mis Ambientes
            </h1>
            <Link
              href="/dashboard"
              className="bg-cyan-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Ver Dashboard
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">
              Cargando ambientes...
            </div>
          ) : ambientes.length === 0 ? (
            <div className="text-center text-gray-600">
              No hay ambientes activos.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ambientes.map((ambiente) => (
                <div key={ambiente.id} className="relative">
                  <Link
                    href={`/dashboard`}
                    className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition duration-300 block"
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
                          <p className="text-lg font-semibold text-green-600 inline-block">
                            {ambiente.humedad}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Temperatura</p>
                          <p className="text-lg font-semibold text-green-600">
                            {ambiente.temperatura}°C
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Moisture</p>
                          <p className="text-lg font-semibold text-green-600">
                            {ambiente.moisture}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">pH</p>
                          <p className="text-lg font-semibold text-green-600">
                            {ambiente.ph}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-4">
                        Última actualización:{" "}
                        {new Date(ambiente.fechaCreacion).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
