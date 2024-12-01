// components/SensorDashboard.js
"use client";

import { useState, useEffect } from "react";
import SensorCard from "./SensorCard";
import WateringHistory from "./WateringHistory";

export default function SensorDashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Temporary removed data fetching
  useEffect(() => {
    // Will implement new data fetching here
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading sensor data...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#1b5e2f] mb-6">
        Plant Monitoring Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorData && sensorData.length > 0 ? (
          sensorData.map((reading, index) => (
            <SensorCard key={index} data={reading} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No sensor data available
          </p>
        )}
      </div>

      <div className="mt-8">
        <WateringHistory />
      </div>
    </div>
  );
}
