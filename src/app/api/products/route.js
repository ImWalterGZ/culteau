import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
      },
    ],
  });
}
