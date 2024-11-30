import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      <header className="w-full bg-green-600 text-white py-4 text-center text-2xl">Culteau</header>
      <main className="w-full max-w-4xl p-4">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold">Tecnología que Cultiva Vida</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/nuevo-ambiente">
            <div className="p-6 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-green-50">
              <h2 className="text-2xl font-semibold">Crear un nuevo ambiente</h2>
              <p>Crea el ambiente perfecto para tus plantas según su humedad</p>
            </div>
          </Link>
          <Link href="/ambientes">
            <div className="p-6 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-green-50">
              <h2 className="text-2xl font-semibold">Tus ambientes</h2>
              <p>¿Ya tienes un ambiente creado? Búscalo aquí</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
