import { NextResponse } from 'next/server';
import { ambientes } from './data';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos:", data);
    
    const nuevoId = ambientes.length > 0 
      ? Math.max(...ambientes.map(a => a.id)) + 1 
      : 1;

    const nuevoAmbiente = {
      id: nuevoId,
      ...data
    };

    console.log("Nuevo ambiente a guardar:", nuevoAmbiente);
    ambientes.push(nuevoAmbiente);

    return NextResponse.json({ 
      message: "Ambiente creado exitosamente",
      ambiente: nuevoAmbiente 
    }, { status: 201 });
  } catch (error) {
    console.error("Error al crear ambiente:", error);
    return NextResponse.json(
      { error: "Error al crear el ambiente" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Devolver todos los ambientes almacenados
    return NextResponse.json(ambientes);
  } catch (error) {
    console.error("Error al obtener ambientes:", error);
    return NextResponse.json(
      { error: "Error al obtener los ambientes" },
      { status: 500 }
    );
  }
} 