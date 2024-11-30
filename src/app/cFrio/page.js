<nav className="w-full bg-green-600 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      <Link 
        href="/" 
        className="text-2xl font-bold text-white hover:text-green-200 transition"
      >
        Culteau
      </Link>
      <ul className="flex space-x-8 text-white">
        <li><Link href="/" className="hover:text-green-200 transition">Inicio</Link></li>
        <li><Link href="/busqueda" className="hover:text-green-200 transition">Búsqueda</Link></li>
        <li><Link href="/ambientes" className="hover:text-green-200 transition">Mis Ambientes</Link></li>
        <li><Link href="/cuenta" className="hover:text-green-200 transition">Cuenta</Link></li>
      </ul>
    </div>
  </div>
</nav> 