import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo section - floated left */}
      <div className="mt-8 px-8 ml-5 sm:px-12">
        <h1 className="text-2xl text-gray-800 font-bold">
          <span className="font-semibold">terra</span>Forma
        </h1>
      </div>

      {/* Main content card */}
      <div className="flex-grow flex items-center justify-center w-full p-4">
        <div
          className="rounded-3xl p-8 md:p-12 w-[95%] max-w-7xl aspect-[21/9] bg-cover bg-center"
          style={{ backgroundImage: "url(/images/gradient.png)" }}
        >
          <div className="text-center h-full flex flex-col justify-center space-y-4 md:space-y-6">
            {/* Main headings */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Transformamos Tierra
              </h2>
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Cultivamos Vida
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto pt-2">
              Un reino microscópico entero trabajando para transformar tu
              tierra.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 pt-6">
              <Link
                href="/ambientes"
                className="px-6 md:px-8 py-2 md:py-3 bg-white rounded-full text-gray-800 font-medium hover:bg-opacity-90 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/plant.svg"
                    alt="Plant icon"
                    width={20}
                    height={20}
                    className="w-4 h-4 md:w-5 md:h-5 [&>path]:stroke-gray-800"
                  />
                  Demo
                </div>
              </Link>
              <button className="px-6 md:px-8 py-2 md:py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-opacity-90 transition-all">
                <div className="flex items-center gap-2">
                  Crear
                  <Image
                    src="/images/seeding.svg"
                    alt="Plant icon"
                    width={20}
                    height={20}
                    className="w-4 h-4 md:w-5 md:h-5 [&>path]:stroke-white"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer text - floated right */}
      <div className="pb-8 px-8 sm:px-12 text-right mr-7">
        <p className="text-sm text-gray-800 font-serif italic">
          built overnight during hack knights
        </p>
      </div>
    </div>
  );
}
