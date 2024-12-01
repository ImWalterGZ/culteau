import { database } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create initial structure with sample data
    const initialData = {
      environment1: {
        settings: {
          name: "Main Garden",
          type: "Templado",
          optimal_moisture: 60,
          optimal_temperature: 22,
          optimal_humidity: 45,
        },
        current_readings: {
          status_motor: true,
          moisture: 55,
          temperature: 23,
          humidity: 48,
          battery_level: 100,
          last_updated: new Date().toISOString(),
        },
        watering_events: {
          event1: {
            timestamp: new Date().toISOString(),
            duration: 30,
            status: "completed",
          },
        },
      },
    };

    // Set the data in Firebase
    const dbRef = ref(database);
    await set(dbRef, initialData);

    return NextResponse.json({
      success: true,
      message: "Database initialized with sample data",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize database",
      },
      {
        status: 500,
      }
    );
  }
}
