export default function SensorCard({ data }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getMoistureStatus = (value) => {
    if (value >= 70) return { text: "High", color: "text-blue-500" };
    if (value >= 30) return { text: "Optimal", color: "text-green-500" };
    return { text: "Low", color: "text-red-500" };
  };

  const getTemperatureStatus = (value) => {
    if (value >= 30) return { text: "High", color: "text-red-500" };
    if (value >= 18) return { text: "Optimal", color: "text-green-500" };
    return { text: "Low", color: "text-blue-500" };
  };

  const getHumidityStatus = (value) => {
    if (value >= 70) return { text: "High", color: "text-blue-500" };
    if (value >= 40) return { text: "Optimal", color: "text-green-500" };
    return { text: "Low", color: "text-red-500" };
  };

  const moistureStatus = getMoistureStatus(data.moisture);
  const temperatureStatus = getTemperatureStatus(data.temperature);
  const humidityStatus = getHumidityStatus(data.humidity);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-[#1b5e2f]">
          Environment Sensors
        </h3>
        <span className="text-sm text-gray-500">
          {formatDate(data.timestamp)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Moisture:</span>
          <div className="text-right">
            <span className="font-medium">{data.moisture}%</span>
            <p className={`text-sm ${moistureStatus.color}`}>
              {moistureStatus.text}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Temperature:</span>
          <div className="text-right">
            <span className="font-medium">{data.temperature}°C</span>
            <p className={`text-sm ${temperatureStatus.color}`}>
              {temperatureStatus.text}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Humidity:</span>
          <div className="text-right">
            <span className="font-medium">{data.humidity}%</span>
            <p className={`text-sm ${humidityStatus.color}`}>
              {humidityStatus.text}
            </p>
          </div>
        </div>

        {data.battery_level !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Battery:</span>
            <div className="text-right">
              <span className="font-medium">{data.battery_level}%</span>
              <p
                className={`text-sm ${
                  data.battery_level > 20 ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.battery_level > 20 ? "Good" : "Low"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
