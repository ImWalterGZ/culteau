import Link from "next/link";

export default function Ambientes() {
    const ambientes = [
        { id: 1, nombre: 'Tropical 1', plantas: 3, humedad: '100%' },
        { id: 2, nombre: 'Tropical 2', plantas: 3, humedad: '85%' },
        { id: 3, nombre: 'Templado 1', plantas: 1, humedad: '100%' },
    ];

    return (
        <div className="min-h-screen bg-green-100 flex flex-col items-center">
            <header className="w-full bg-green-600 text-white py-4 text-center text-2xl">Culteau</header>
            <main className="w-full max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center my-6">Tus Ambientes</h1>
                {ambientes.map((ambiente) => (
                    <Link key={ambiente.id} href={`/ambientes/${ambiente.id}`}>
                        <div className="p-4 bg-white shadow-md rounded-lg my-2 cursor-pointer">
                            <p>{ambiente.nombre}</p>
                            <p>Plantas: {ambiente.plantas}</p>
                            <p>Humedad: {ambiente.humedad}</p>
                        </div>
                    </Link>
                ))}
            </main>
        </div>
    );
}
