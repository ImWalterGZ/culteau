import { NextResponse } from 'next/server';
import { ambientes, updateAmbientes } from '../data';

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    console.log("Buscando ambiente con ID:", id);
    
    const ambiente = ambientes.find(a => a.id === id);
    console.log("Ambiente encontrado:", ambiente);
    
    if (!ambiente) {
      return NextResponse.json(
        { error: "Ambiente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(ambiente);
  } catch (error) {
    console.error("Error al obtener el ambiente:", error);
    return NextResponse.json(
      { error: "Error al obtener el ambiente" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    console.log("Intentando eliminar ambiente con ID:", id);
    
    const nuevosAmbientes = ambientes.filter(a => a.id !== id);
    
    if (nuevosAmbientes.length === ambientes.length) {
      console.log("Ambiente no encontrado para eliminar");
      return NextResponse.json(
        { error: "Ambiente no encontrado" },
        { status: 404 }
      );
    }

    updateAmbientes(nuevosAmbientes);
    console.log("Ambiente eliminado exitosamente");

    return NextResponse.json(
      { message: "Ambiente eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar ambiente:", error);
    return NextResponse.json(
      { error: "Error al eliminar el ambiente" },
      { status: 500 }
    );
  }
} 