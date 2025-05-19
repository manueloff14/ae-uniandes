"use client";

import { useRef, useEffect, useState } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";

export default function Eventos() {
    // Referencias al contenedor scrollable (una para vigentes y otra para pasados)
    const scrollRefVigentes = useRef(null);
    const scrollRefPasados = useRef(null);

    const { language } = useParams(); // Se espera que la URL tenga /[language]/page.jsx, por ejemplo, /en
    const [loading, setLoading] = useState(true);
    const [translatedData, setTranslatedData] = useState(null);

    // Funciones de scroll para la sección de "Proyectos vigentes"
    const scrollLeftVigentes = () => {
        if (scrollRefVigentes.current) {
            scrollRefVigentes.current.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth",
            });
        }
    };

    // Hook para cargar los datos traducidos
    useEffect(() => {
        const savedLanguage =
            language || localStorage.getItem("language") || "es"; // Usa language de la URL o el valor guardado
        localStorage.setItem("language", savedLanguage);

        fetch("https://aeuniandes.pythonanywhere.com/traducir", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lang: savedLanguage,
                section: "Eventos", // Asegúrate de que la sección sea la correcta
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTranslatedData(data.translated_json);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al traducir:", error);
                setLoading(false);
            });
    }, [language]); // Solo depende de language

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]" // Tamaño de la imagen a 55px
                />
                <p className="mt-4 text-sm font-bold font-serif text-black">
                    Cargando...
                </p>

                <style jsx>{`
                    img {
                        animation: scale-up-down 0.5s ease-in-out infinite; /* Animación más rápida */
                    }

                    @keyframes scale-up-down {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.2);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (!translatedData) {
        return <div>Error al cargar datos traducidos.</div>;
    }

    const scrollRightVigentes = () => {
        if (scrollRefVigentes.current) {
            scrollRefVigentes.current.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth",
            });
        }
    };

    // Funciones de scroll para la sección de "Proyectos pasados"
    const scrollLeftPasados = () => {
        if (scrollRefPasados.current) {
            scrollRefPasados.current.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const scrollRightPasados = () => {
        if (scrollRefPasados.current) {
            scrollRefPasados.current.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <HeaderHome data={translatedData} />

            {/* Sección Hero (primera sección) */}
            <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                {/* Fondo e imagen */}
                <div className="absolute inset-0 z-[-20] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="/img/bogota.jpg"
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
                        {translatedData.hero.title}
                    </h1>
                    <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-200 font-serif">
                        {translatedData.hero.description}
                    </p>
                </div>
            </section>

            {/* Sección Eventos Vigentes */}
            {translatedData.eventsVigentes &&
                translatedData.eventsVigentes.length > 0 && (
                    <section className={`max-w-6xl mx-auto px-6 md:px-28 pt-20 ${translatedData.eventsPasados && translatedData.eventsPasados.length > 0 ? 'pb-10' : 'pb-20'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-black text-xl font-bold font-serif">
                                {/* Usar el título traducido si existe; si no, un fallback */}
                                {translatedData.eventsVigentesTitle ||
                                    "Eventos vigentes"}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={scrollLeftVigentes}
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
                                    onClick={scrollRightVigentes}
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

                        {/* Contenedor scrollable (VIGENTES) */}
                        <div
                            ref={scrollRefVigentes}
                            className="overflow-x-auto flex space-x-4 no-scrollbar scroll-smooth py-1"
                        >
                            {translatedData.eventsVigentes.map((event, i) => (
                                <div
                                    key={i}
                                    className="relative min-w-[300px] max-w-xs bg-[#f1f1f1] rounded-3xl shadow flex-shrink-0"
                                >
                                    {/* Imagen */}
                                    <div className="w-full h-36 overflow-hidden rounded-t-3xl">
                                        <img
                                            src={event.imageLink}
                                            alt="Foto evento"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Etiqueta de estado */}
                                    <span className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded-full font-serif">
                                        {event.status}
                                    </span>

                                    {/* Contenido */}
                                    <div className="p-4">
                                        <p className="text-gray-600 text-sm mb-1 font-serif">
                                            {event.date}
                                        </p>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 font-serif">
                                            {event.title}
                                        </h3>
                                        <button className="inline-flex items-center space-x-1 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-serif">
                                            <span className="font-serif">
                                                {event.cta}
                                            </span>
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
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            {/* Sección Eventos Pasados */}
            {translatedData.eventsPasados &&
                translatedData.eventsPasados.length > 0 && (
                    <section className="max-w-6xl mx-auto px-6 md:px-28 pt-16 pb-32">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-black text-xl font-bold font-serif">
                                {translatedData.eventsPasadosTitle ||
                                    "Eventos pasados"}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={scrollLeftPasados}
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
                                    onClick={scrollRightPasados}
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

                        {/* Contenedor scrollable (PASADOS) */}
                        <div
                            ref={scrollRefPasados}
                            className="overflow-x-auto flex space-x-4 no-scrollbar scroll-smooth py-1"
                        >
                            {translatedData.eventsPasados.map((event, i) => (
                                <div
                                    key={i}
                                    className="relative min-w-[300px] max-w-xs bg-[#f1f1f1] rounded-3xl shadow flex-shrink-0"
                                >
                                    {/* Imagen */}
                                    <div className="w-full h-36 overflow-hidden rounded-t-3xl">
                                        <img
                                            src={event.imageLink}
                                            alt="Foto evento"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Etiqueta de estado */}
                                    <span className="absolute top-2 right-2 bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs font-semibold px-2 py-1 rounded-full font-serif">
                                        {event.status}
                                    </span>

                                    {/* Contenido */}
                                    <div className="p-4">
                                        <p className="text-gray-600 text-sm mb-1 font-serif">
                                            {event.date}
                                        </p>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 font-serif">
                                            {event.title}
                                        </h3>
                                        <button className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white rounded-full transition-colors font-serif">
                                            <span className="font-serif">
                                                {event.cta || "Finalizado"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

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

            <Footer data={translatedData} />
        </div>
    );
}
