// components/SensorDashboard.js
"use client";

import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import SensorCard from "./SensorCard";
import WateringHistory from "./WateringHistory";
import VisualSensorDisplay from "./VisualSensorDisplay";

export default function SensorDashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sensorRef = ref(database, "environment1/current_readings");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = [
          {
            device_id: "ESP32_1",
            timestamp: data.last_updated,
            moisture: data.moisture,
            temperature: data.temperature,
            humidity:
              (data.humidity.hum1 +
                data.humidity.hum2 +
                data.humidity.hum3 +
                data.humidity.hum4) /
              4,
            battery_level: data.battery_level || 100,
          },
        ];

        setSensorData(formattedData);
      } else {
        setSensorData([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading sensor data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <VisualSensorDisplay />
      </div>
    </div>
  );
}
