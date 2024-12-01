"use client";
import { useState, useEffect } from "react";

export default function WateringHistory() {
  const [wateringEvents, setWateringEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Will implement new data fetching here
  }, []);

  if (loading) {
    return <div>Loading watering history...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#1b5e2f] mb-4">
        Watering History
      </h2>

      {wateringEvents.length > 0 ? (
        <div className="space-y-4">
          {wateringEvents.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <div>
                <p className="font-medium">Device: {event.device_id}</p>
                <p className="text-sm text-gray-500">
                  Duration: {event.duration} seconds
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    event.status === "completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {event.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No watering events recorded</p>
      )}
    </div>
  );
}
