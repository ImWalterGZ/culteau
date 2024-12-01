"use client";
import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export default function PhDisplay() {
  const [phData, setPhData] = useState({
    currentPh: 0,
    environmentType: "Templado",
  });

  useEffect(() => {
    const environmentRef = ref(database, "environment1");

    const unsubscribe = onValue(environmentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPhData({
          currentPh: data.current_readings.ph || 0,
          environmentType: data.settings?.type || "Templado",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const phSegments = [
    { value: 14, color: "bg-violet-700" },
    { value: 13, color: "bg-violet-600" },
    { value: 12, color: "bg-violet-500" },
    { value: 11, color: "bg-blue-600" },
    { value: 10, color: "bg-blue-500" },
    { value: 9, color: "bg-cyan-500" },
    { value: 8, color: "bg-teal-500" },
    { value: 7, color: "bg-green-500" },
    { value: 6, color: "bg-lime-500" },
    { value: 5, color: "bg-yellow-500" },
    { value: 4, color: "bg-orange-500" },
    { value: 3, color: "bg-red-500" },
    { value: 2, color: "bg-red-600" },
    { value: 1, color: "bg-red-700" },
  ];

  const getSegmentOpacity = (segmentValue) => {
    return phData.currentPh >= segmentValue ? "opacity-100" : "opacity-30";
  };

  return (
    <div className="flex flex-col text-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Nivel de pH
      </h3>
      <div className="flex flex-col items-center h-[272px] justify-center">
        <div className="flex items-center gap-4">
          {/* pH Scale */}
          <div className="flex flex-col gap-[2px]">
            {phSegments.map((segment) => (
              <div
                key={segment.value}
                className={`${segment.color} ${getSegmentOpacity(
                  segment.value
                )} h-4 w-28 rounded-md transition-opacity duration-300`}
              />
            ))}
          </div>

          {/* pH Value */}
          <div className="text-4xl font-bold text-gray-800 w-16">
            {phData.currentPh.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
