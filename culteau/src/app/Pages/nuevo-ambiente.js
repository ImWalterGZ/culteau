export default function NuevoAmbiente() {
    return (
      <div className="min-h-screen bg-green-100 flex flex-col items-center">
        <header className="w-full bg-green-600 text-white py-4 text-center text-2xl">Culteau</header>
        <main className="w-full max-w-4xl p-4">
          <h1 className="text-3xl font-bold text-center my-6">Nuevo Ambiente</h1>
          <p className="text-center my-4">¿Qué tipo de planta tienes?</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 bg-green-200 text-center shadow-md rounded-lg cursor-pointer">
              <p className="font-bold">Clima Tropical</p>
            </div>
            <div className="p-6 bg-green-200 text-center shadow-md rounded-lg cursor-pointer">
              <p className="font-bold">Clima Templado</p>
            </div>
            <div className="p-6 bg-green-200 text-center shadow-md rounded-lg cursor-pointer">
              <p className="font-bold">Clima Frío</p>
            </div>
          </div>
        </main>
      </div>
    );
  }