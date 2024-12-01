import { database } from "@/lib/firebase";
import { ref, set, push } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Sensor endpoint ready for implementation",
  });
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate the incoming data
    if (!data.moisture || !data.temperature || !data.humidity) {
      return NextResponse.json(
        { error: "Missing required sensor data" },
        { status: 400 }
      );
    }

    // Reference to the sensor data location
    const sensorRef = ref(database, "environment1");

    // Update current sensor readings
    await set(ref(database, "environment1/current_readings"), {
      moisture: data.moisture,
      temperature: data.temperature,
      humidity: data.humidity,
      battery_level: data.battery_level || 100,
      last_updated: new Date().toISOString(),
    });

    // Add to history with timestamp
    const historyRef = ref(database, "environment1/sensor_history");
    await push(historyRef, {
      moisture: data.moisture,
      temperature: data.temperature,
      humidity: data.humidity,
      battery_level: data.battery_level || 100,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    return NextResponse.json(
      { error: "Failed to save sensor data" },
      { status: 500 }
    );
  }
}
