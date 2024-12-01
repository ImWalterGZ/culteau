import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Watering endpoint ready for implementation",
  });
}

export async function POST(request) {
  return NextResponse.json({ message: "Ready to handle watering commands" });
}
