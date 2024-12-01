import { NextResponse } from 'next/server';

// Simulación de base de datos en memoria
let ambientes = [
  {
    id: 1,
    nombre: "Jardín Seco 1",
    tipo: "Seco",
    humedad: 30,
    temperatura: 25,
    fertilidad: 85.5,
    tiempoFertilidad: 100,
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 2,
    nombre: "Invernadero Templado",
    tipo: "Templado",
    humedad: 45,
    temperatura: 20,
    fertilidad: 75.0,
    tiempoFertilidad: 75,
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 3,
    nombre: "Jardín Frío",
    tipo: "Frio",
    humedad: 60,
    temperatura: 15,
    fertilidad: 90.0,
    tiempoFertilidad: 100,
    fechaCreacion: new Date().toISOString()
  }
];

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generar un ID único
    const nuevoId = ambientes.length > 0 
      ? Math.max(...ambientes.map(a => a.id)) + 1 
      : 1;

    // Crear nuevo ambiente
    const nuevoAmbiente = {
      id: nuevoId,
      ...data,
      fechaCreacion: new Date().toISOString()
    };

    // Agregar a la lista de ambientes
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
    return NextResponse.json(ambientes);
  } catch (error) {
    console.error("Error al obtener ambientes:", error);
    return NextResponse.json(
      { error: "Error al obtener los ambientes" },
      { status: 500 }
    );
  }
} 