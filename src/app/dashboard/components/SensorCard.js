export default function SensorCard({ data }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-[#1b5e2f]">
          Device: {data.device_id}
        </h3>
        <span className="text-sm text-gray-500">
          {formatDate(data.timestamp)}
        </span>
      </div>

      <div className="space-y-3">
        {data.moisture !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Moisture:</span>
            <span className="font-medium">{data.moisture}%</span>
          </div>
        )}

        {data.temperature !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Temperature:</span>
            <span className="font-medium">{data.temperature}°C</span>
          </div>
        )}

        {data.humidity !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Humidity:</span>
            <span className="font-medium">{data.humidity}%</span>
          </div>
        )}

        {data.battery_level !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Battery:</span>
            <span className="font-medium">{data.battery_level}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
