"use client";
import SensorDashboard from "./components/SensorDashboard";
import Link from "next/link";
import { getIdealConditions } from "./utils/environmentConditions";
import { database } from "@/lib/firebase";
import { ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export default function Page() {
  const [motorStatus, setMotorStatus] = useState(false);
  const defaultConditions = getIdealConditions("Templado");

  useEffect(() => {
    // Listen to real-time changes in motor status
    const motorRef = ref(
      database,
      "environment1/current_readings/status_motor"
    );

    const unsubscribe = onValue(motorRef, (snapshot) => {
      if (snapshot.exists()) {
        setMotorStatus(snapshot.val());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleMotor = async () => {
    try {
      const newStatus = !motorStatus;
      await set(
        ref(database, "environment1/current_readings/status_motor"),
        newStatus
      );
      // No need to setMotorStatus here as it will be updated by the onValue listener
    } catch (error) {
      console.error("Error toggling motor:", error);
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
            <h1 className="text-4xl font-bold text-green-800">Dashboard</h1>

            <div className="flex gap-4 items-center">
              {/* Toggle Switch Button */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  Sistema {motorStatus ? "Encendido" : "Apagado"}
                </span>
                <button
                  onClick={toggleMotor}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none"
                  style={{
                    backgroundColor: motorStatus ? "#22c55e" : "#94a3b8",
                  }}
                >
                  <span
                    className={`${
                      motorStatus ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                  />
                </button>
              </div>

              <Link
                href="/ambientes"
                className="bg-cyan-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Volver a Ambientes
              </Link>
            </div>
          </div>

          {/* Sensor Dashboard */}
          <div className="space-y-6">
            <SensorDashboard />
          </div>

          {/* Ideal Conditions Section */}
          <div className="mt-8 p-6 bg-green-50 rounded-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Condiciones Ideales para Ambiente Templado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(defaultConditions).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-green-700 capitalize mb-2">
                    {key}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Rango ideal: {value.min}-{value.max}
                    {value.unit}
                  </p>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
