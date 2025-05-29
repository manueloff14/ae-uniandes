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

    // Hook para cargar los datos traducidos
    useEffect(() => {
        const savedLanguage =
            language || localStorage.getItem("language") || "es";
        localStorage.setItem("language", savedLanguage);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/traducir`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lang: savedLanguage,
                section: "Eventos",
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
    }, [language]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]"
                />
                <p className="mt-4 text-sm font-bold font-serif text-black">
                    Cargando...
                </p>
                <style jsx>{`
                    img {
                        animation: scale-up-down 0.5s ease-in-out infinite;
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

    return (
        <div>
            <HeaderHome data={translatedData} />

            {/* Sección Hero (primera sección) */}
            <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                {/* Fondo e imagen */}
                <div className="absolute inset-0 z-[-20] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={translatedData.hero.imageLink}
                        alt="Fondo Uniandes"
                    />
                    <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-[10px] z-[-10]" />
                </div>

                {/* Overlay adicional */}
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

            {/* Embed Luma Calendar usando la ruta /embed */}
            {/* <div className="max-w-6xl mx-auto px-6 md:px-28 pt-16 py-20">
                <h2 className="text-black text-xl font-bold font-serif">
                    {translatedData.hero.title || "Eventos"}
                </h2>
                <div className="py-6">
                    <iframe
                        src="https://lu.ma/embed/calendar/cal-UNNJDLVBWrEroMd/events"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        className="rounded-lg shadow-lg"
                        title="Calendario de Eventos"
                        allowFullScreen
                    />
                </div>
            </div> */}

            <div className="max-w-[90rem] mx-auto px-6 md:px-28 pt-16 py-20">
                <h2 className="text-black text-xl font-bold font-serif">
                    {translatedData.hero.title || "Eventos"}
                </h2>

                <div className="flex flex-col lg:flex-row items-start gap-6 py-6">
                    <div className="w-full">
                        <iframe
                            src="https://lu.ma/embed/calendar/cal-UNNJDLVBWrEroMd/events?past=true"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            className="rounded-lg shadow-lg"
                            title="Calendario de Eventos"
                            allowFullScreen
                        />
                    </div>
                    <div className="flex flex-col items-start w-full lg:w-[600px]">
                        <a
                            href="https://lu.ma/calendar/cal-UNNJDLVBWrEroMd/events"
                            target="_blank"
                        >
                            <img
                                src="/luma-aeuniandes.jpg"
                                className="w-full rounded-2xl border border-gray-400"
                                alt=""
                            />
                        </a>
                        <div className="mt-4">
                            <h2 className="text-xl font-bold font-serif text-black">
                                {translatedData.hero.title || "Eventos"}
                            </h2>
                            <p className="text-sm font-serif text-black mt-2 mb-2">
                                En AE Uniandes organizamos eventos para promover
                                decisiones informadas y acciones efectivas que
                                realmente mejoren el mundo. Cada encuentro es
                                una oportunidad para aplicar el pensamiento
                                crítico al servicio del bien común.
                            </p>
                            <a
                                href="https://lu.ma/calendar/cal-UNNJDLVBWrEroMd/events"
                                target="_blank"
                            >
                                <button className="w-full bg-gradient-to-r from-[#6EC2CC] to-[#CDD0EF] text-[#1f1f1f] font-bold px-4 py-3 rounded-2xl mt-4">
                                    Ver calendario
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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
