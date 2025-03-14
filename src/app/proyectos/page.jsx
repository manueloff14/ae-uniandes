"use client";

import { useRef } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";

export default function Proyectos() {
    // Referencia al contenedor scrollable (solo una, porque es una sola sección)
    const scrollRef = useRef(null);

    // Funciones de scroll para la sección de proyectos
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <HeaderHome />

            <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                {/* Fondo e imagen */}
                <div className="absolute inset-0 z-[-20] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://www.uniandes.edu.co/sites/default/files/news2/ml_uniandes_.jpg"
                        alt="Fondo Uniandes"
                    />
                    <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-[10px] z-[-10]" />
                </div>

                {/* Overlay adicional para oscurecer y aplicar un blur suave */}
                <div className="absolute inset-0 bg-[#00000044] backdrop-blur-[2px]" />

                {/* Figuras decorativas */}
                <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#a7a7a7] to-[#a1a1a1] opacity-20 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#000000] via-[#000000] to-[#1B607A] opacity-20 rounded-full blur-3xl" />

                {/* Contenido principal */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-56 pt-32 pb-32">
                    <h1 className="font-bold font-serif mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                        Proyectos de AE Uniandes
                    </h1>
                    <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-200 font-serif">
                        Nuestra misión es impulsar el altruismo eficaz,
                        aplicando estrategias basadas en evidencia para
                        maximizar nuestro impacto.
                    </p>
                </div>
            </section>

            {/* Sección de Proyectos (una sola) */}
            <section className="max-w-6xl mx-auto px-6 md:px-28 pt-20 pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-black text-xl font-bold font-serif">
                        Proyectos
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollLeft}
                            className="bg-white p-2 rounded-full shadow focus:outline-none"
                        >
                            <svg
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="bg-white p-2 rounded-full shadow focus:outline-none"
                        >
                            <svg
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Contenedor scrollable */}
                <div
                    ref={scrollRef}
                    className="overflow-x-auto flex space-x-4 no-scrollbar scroll-smooth py-1"
                >
                    {/* Aquí definimos nuestro array con eventos y los mapeamos */}
                    {[
                        {
                            image: "https://www.uniandes.edu.co/sites/default/files/news2/ml_uniandes_.jpg",
                            status: "Abierto",
                            date: "Vie, 20 de agosto; 18:30",
                            title: "Riesgos catastróficos reales",
                            description:
                                "Los desastres naturales impactan comunidades. La preparación y respuesta son clave para mitigar daños y facilitar la recuperación.",
                        },
                        {
                            image: "/images/person1.jpg",
                            status: "Abierto",
                            date: "Mié, 15 de septiembre; 17:00",
                            title: "Bienestar Animal",
                            description:
                                "Explora iniciativas que buscan mejorar el bienestar de los animales a través de la educación y la concientización.",
                        },
                        // Agrega más objetos si lo deseas
                    ].map((event, i) => (
                        <div
                            key={i}
                            className="relative min-w-[290px] max-w-[290px] bg-[#f1f1f1] rounded-3xl shadow flex-shrink-0"
                        >
                            {/* Imagen */}
                            <div className="w-full h-36 overflow-hidden rounded-t-3xl">
                                <img
                                    src={event.image}
                                    alt="Foto evento"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Contenido */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-serif">
                                    {event.title}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4 font-serif">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white mb-36">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                        Proyectos externos
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                    ¡Demuestra tu altruismo!
                </h2>
                <p className="text-center text-gray-700 mb-12 font-serif">
                    En Altruismo Eficaz estamos dispuestos a escuchar a los
                    demás.
                </p>
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center rounded-[2.5rem] overflow-hidden shadow-md bg-gray-100">
                        {/* Imagen con gradiente */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6159d5d6bdaf2c6fb47aa0ce/04ca8f36-49cb-4b29-9ea9-40aaa1099c5e/_MG_2879.jpg"
                                alt="Foto grupal de la comunidad"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Capa de gradiente: móvil hacia arriba, tablet/PC hacia la derecha */}
                            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-gray-100" />
                        </div>

                        {/* Contenido textual */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col items-start gap-2 md:text-left">
                            <h2 className="text-gray-900 mt-2 text-2xl font-bold font-serif">
                                ¿Deseas enviar un proyecto?
                            </h2>
                            <a
                                href="https://www.effectivealtruism.org"
                                target="_black"
                                className="cursor-pointer p-4 px-5 flex items-center gap-2 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] mt-4 text-sm font-serif font-bold rounded-full hover:scale-110 transition-all duration-200"
                            >
                                Enviar mí proyecto
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estilos específicos para este componente */}
            <style jsx>{`
                /* Oculta la barra de scroll en Chrome/Safari */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Oculta la barra de scroll en IE, Edge y Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Footer />
        </div>
    );
}
