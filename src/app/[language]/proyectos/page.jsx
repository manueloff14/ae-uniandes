"use client";

import { useRef, useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";

export default function Proyectos() {
    // Referencia al contenedor scrollable (solo una, porque es una sola sección)
    const scrollRef = useRef(null);

    const { language } = useParams();

    const [loading, setLoading] = useState(true);
    const [headerData, setHeaderData] = useState(null);
    const [footerData, setFooterData] = useState(null);
    const [pageData, setPageData] = useState(null);

    const [reproducir, setReproducir] = useState(false);

    useEffect(() => {
        const ctrl = new AbortController();

        async function load() {
            try {
                setLoading(true);

                // idioma desde URL o localStorage (cliente)
                let lang = "es";
                try {
                    lang = language ?? localStorage.getItem("language") ?? "es";
                    localStorage.setItem("language", lang);
                } catch {}

                const base = process.env.NEXT_PUBLIC_API_URL;
                const pLevel = 5;

                const [headerRes, pageRes, footerRes] = await Promise.all([
                    fetch(`${base}/api/header?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/proyectos-page?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/footer?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                ]);

                if (!headerRes.ok || !pageRes.ok || !footerRes.ok) {
                    throw new Error(
                        `HTTP: header ${headerRes.status}, page ${pageRes.status}, footer ${footerRes.status}`
                    );
                }

                // Estos endpoints ya devuelven el JSON listo (o translated_json)
                const [headerJson, pageJson, footerJson] = await Promise.all([
                    headerRes.json(),
                    pageRes.json(),
                    footerRes.json(),
                ]);

                const header = headerJson?.translated_json ?? headerJson;
                const pageRaw = pageJson?.translated_json ?? pageJson;
                const footer = footerJson?.translated_json ?? footerJson;

                setHeaderData(header);
                setPageData(pageRaw);
                setFooterData(footer);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Fallo cargando datos:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => ctrl.abort();
    }, [language]);

    const page = pageData?.data;
    const header = headerData?.data;
    const footer = footerData?.data;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]" // Tamaño de la imagen a 55px
                />
                <p className="mt-4 text-sm font-bold font-inter text-black">
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
            <HeaderHome data={header} />

            <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                {/* Fondo e imagen */}
                <div className="absolute inset-0 z-[-20] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={page.heroSection.portada.url}
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
                    <h1 className="font-bold font-inter mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                        {page.heroSection.title.title}
                    </h1>
                    <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-200 font-inter">
                        {page.heroSection.subtitle}
                    </p>
                </div>
            </section>

            {/* <pre className="text-black text-sm">{JSON.stringify(page, null, 2)}</pre> */}

            {/* Sección de Proyectos (una sola) */}
            <section className="max-w-6xl mx-auto px-6 md:px-28 pt-20 pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-black text-xl font-bold font-inter">
                        {page.Projects.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollLeft}
                            title="Regresar"
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
                            title="Avanzar"
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
                    {page.Projects.project.map((project, i) => (
                        <div
                            key={i}
                            className="relative min-w-[290px] max-w-[290px] bg-[#f1f1f1] rounded-3xl shadow flex-shrink-0"
                        >
                            {/* Imagen */}
                            <div className="w-full h-64 overflow-hidden rounded-t-3xl">
                                <img
                                    src={project.image.url}
                                    alt="Foto evento"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Contenido */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-inter">
                                    {project.title}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4 font-inter">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white mb-36">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-inter">
                        {page.sendProject.info.preTitle}
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-center text-black mb-2 font-inter">
                    {page.sendProject.info.title}
                </h2>
                <p className="text-center text-gray-700 mb-12 font-inter">
                    {page.sendProject.info.description}
                </p>
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center rounded-[2.5rem] overflow-hidden shadow-md bg-gray-100">
                        {/* Imagen con gradiente */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                            <img
                                src={page.sendProject.image.url}
                                alt="Foto grupal de la comunidad"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Capa de gradiente: móvil hacia arriba, tablet/PC hacia la derecha */}
                            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-gray-100" />
                        </div>

                        {/* Contenido textual */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col items-start gap-2 md:text-left">
                            <h2 className="text-gray-900 mt-2 text-2xl font-bold font-inter">
                                {page.sendProject.titleCard}
                            </h2>
                            <a
                                href={
                                    page.sendProject.button.link
                                }
                                target="_black"
                                className="cursor-pointer p-4 px-5 flex items-center gap-2 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] mt-4 text-sm font-inter font-bold rounded-full hover:scale-110 transition-all duration-200"
                            >
                                {page.sendProject.button.text}
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

            <Footer data={{ header, footer }} />
        </div>
    );
}
