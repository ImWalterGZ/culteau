"use client";
import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import PhDisplay from "./PhDisplay";

export default function VisualSensorDisplay() {
  const [sensorData, setSensorData] = useState({
    humidity: { hum1: 0, hum2: 0, hum3: 0, hum4: 0 },
    temperature: 0,
    environmentType: "Templado",
  });

  useEffect(() => {
    const environmentRef = ref(database, "environment1");

    const unsubscribe = onValue(environmentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSensorData({
          humidity: data.current_readings.humidity || {
            hum1: 0,
            hum2: 0,
            hum3: 0,
            hum4: 0,
          },
          temperature: data.current_readings.temperature || 0,
          environmentType: data.settings?.type || "Templado",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const getHumidityColor = (value, key) => {
    const humidityRanges = {
      Templado: {
        low: 30,
        optimal: 50,
        high: 75,
      },
      Seco: {
        low: 30,
        optimal: 45,
        high: 60,
      },
      Frio: {
        low: 50,
        optimal: 70,
        high: 85,
      },
    };

    const range =
      humidityRanges[sensorData.environmentType] || humidityRanges.Templado;

    if (value >= range.optimal && value < range.high) {
      switch (key) {
        case "hum1":
          return "bg-cyan-400"; // Lightest blue
        case "hum2":
          return "bg-blue-400"; // Light blue
        case "hum3":
          return "bg-blue-500"; // Medium blue
        case "hum4":
          return "bg-cyan-300"; // Darkest blue
        default:
          return "bg-blue-400";
      }
    }

    if (value < range.low) return "bg-red-500";
    if (value >= range.low && value < range.optimal) return "bg-yellow-500";
    if (value >= range.high) return "bg-purple-500";
  };

  const getCornerRadius = (key) => {
    switch (key) {
      case "hum1":
        return "rounded-tl-3xl rounded-tr-md rounded-bl-md"; // Top-left square
      case "hum2":
        return "rounded-tr-3xl rounded-tl-md rounded-br-md"; // Top-right square
      case "hum3":
        return "rounded-bl-3xl rounded-br-md rounded-tl-md"; // Bottom-left square
      case "hum4":
        return "rounded-br-3xl rounded-bl-md rounded-tr-md"; // Bottom-right square
      default:
        return "rounded-lg";
    }
  };

  return (
    <div className="mx-10">
      <div>
        <div className="flex flex-row justify-between gap-10 bg-white p-6 rounded-lg">
          {/* Humidity Squares */}
          <div className="">
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-4">
              Humedad
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(sensorData.humidity).map(([key, value]) => (
                <div key={key} className="relative aspect-square">
                  <div
                    className={`${getHumidityColor(
                      value,
                      key
                    )} ${getCornerRadius(key)} 
                    w-full h-32 transition-colors duration-500 flex items-center justify-center`}
                  >
                    <span className="text-white text-2xl font-bold">
                      {value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col text-center justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Temperature
            </h3>
            <div className="flex flex-col items-center h-[272px]">
              <div className="relative w-[68px] h-full bg-gray-200 rounded-2xl overflow-hidden">
                <div
                  className="absolute bottom-0 w-full transition-all duration-500"
                  style={{
                    height: `${(sensorData.temperature / 50) * 100}%`,
                    backgroundColor:
                      sensorData.temperature >= 30
                        ? "#EF4444"
                        : sensorData.temperature >= 18
                        ? "#90DD7E"
                        : "#3B82F6",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold z-10">
                    {sensorData.temperature}°C
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* pH Display */}
          <div>
            <PhDisplay sensorData={sensorData} />
          </div>
        </div>
      </div>
    </div>
  );
}
