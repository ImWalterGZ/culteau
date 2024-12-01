import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Hero Section con imagen de fondo */}
      <div 
        className="h-[60vh] w-full bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'url(/images/plantas-fondo.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navbar */}
        <nav className="relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-14 items-center">
              <span className="text-xl font-bold text-white">Culteau</span>
              <div className="flex space-x-8">
                <Link href="/" className="text-white hover:text-green-200">Inicio</Link>
                <Link href="/busqueda" className="text-white hover:text-green-200">Busqueda</Link>
                <Link href="/ambientes" className="text-white hover:text-green-200">Mis Ambientes</Link>
                <Link href="/cuenta" className="text-white hover:text-green-200">Cuenta</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Título centrado */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-2">Culteau</h1>
            <p className="text-xl">TECNOLOGÍA QUE CULTIVA VIDA</p>
          </div>
        </div>
      </div>

      {/* Sección de opciones */}
      <div className="flex-grow bg-gray-50 flex items-start justify-center pt-12">
        <div className="max-w-4xl w-full px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6">
            {/* Crear ambiente */}
            <Link href="/nuevo-ambiente" className="group">
              <div className="flex flex-col items-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Crear un nuevo ambiente</h2>
                <p className="text-sm text-gray-600 text-center">
                  Crea el ambiente perfecto para tus plantas según su humedad
                </p>
              </div>
            </Link>

            {/* Ver ambientes */}
            <Link href="/ambientes" className="group">
              <div className="flex flex-col items-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Tus ambientes</h2>
                <p className="text-sm text-gray-600 text-center">
                  ¿Ya tienes un ambiente creado? Búscalo aquí
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
