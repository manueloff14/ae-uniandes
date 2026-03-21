"use client";

import { useRef, useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import HeroSection from "@/components/routes/HeroSection";
import { ExternalLink } from "lucide-react";
import Loading from "@/components/routes/Loading";

export default function Proyectos() {
    // Referencia al contenedor scrollable (solo una, porque es una sola sección)
    const scrollRef = useRef(null);

    const { language } = useParams();

    const [loading, setLoading] = useState(true);
    const [startTime] = useState(Date.now());
    const [showLoading, setShowLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
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

    useEffect(() => {
        if (!loading) {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(4000 - elapsed, 3000);
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => setShowLoading(false), 500);
            }, remaining);
            return () => clearTimeout(timer);
        }
    }, [loading, startTime]);

    const page = pageData?.data;
    const header = headerData?.data;
    const footer = footerData?.data;

    if (showLoading) return <Loading isExiting={isExiting} />;

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

            <main>
                <HeroSection
                    image={page.heroSection.portada.url}
                    title={page.heroSection.title.title}
                    subtitle={page.heroSection.subtitle}
                />

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
                            className="bg-white p-2 border border-black rounded-none focus:outline-none hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-black"
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
                            className="bg-white p-2 border border-black rounded-none focus:outline-none hover:bg-gray-100 transition-colors"
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
                            className="relative min-w-[290px] max-w-[290px] bg-[#f1f1f1] rounded-none border border-gray-200 flex-shrink-0"
                        >
                            {/* Imagen */}
                            <div className="w-full h-64 overflow-hidden rounded-none">
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

            <section className="bg-transparent mb-36 pt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-stretch rounded-none overflow-hidden bg-white shadow-none">
                        
                        {/* COLUMNA IZQUIERDA: Imagen con texto superpuesto */}
                        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px] flex items-end justify-start p-8 md:p-12">
                            <img
                                src={page.sendProject.image.url}
                                alt="Imagen del proyecto"
                                className="w-full h-full object-cover absolute inset-0 z-0"
                            />
                            {/* Filtro oscuro para contraste */}
                            <div className="absolute inset-0 bg-black/50 z-10"></div>
                            
                            {/* Contenido alineado abajo a la izquierda */}
                            <div className="relative z-20 flex flex-col items-start text-left">
                                <img
                                    className="w-[140px] md:w-[180px] mb-6 brightness-0 invert"
                                    src="/ae-logo-black.svg"
                                    alt="Logo AE"
                                />
                                <h2 className="text-white text-2xl md:text-3xl font-inter font-bold leading-tight max-w-sm">
                                    {page.sendProject.titleCard}
                                </h2>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: Contenido elegante */}
                        <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-center p-10 sm:p-14">
                            {/* Patrón de puntos decorativo en el fondo */}
                            <div 
                                className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                                style={{ backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
                            ></div>
                            
                            {/* Marca de agua decorativa */}
                            <img 
                                src="/ae-icon.svg" 
                                alt="" 
                                className="absolute -right-8 -bottom-16 w-64 md:w-80 opacity-[0.03] rotate-[15deg] pointer-events-none grayscale" 
                            />

                            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 w-full max-w-md">
                                <span className="p-2 px-4 rounded-none border border-black text-xs text-center text-black font-inter uppercase tracking-widest font-bold">
                                    {page.sendProject.info.preTitle}
                                </span>
                                
                                <h2 className="text-black text-2xl md:text-4xl font-inter font-bold leading-tight">
                                    {page.sendProject.info.title}
                                </h2>

                                <p className="text-gray-600 text-base md:text-lg font-inter leading-relaxed">
                                    {page.sendProject.info.description}
                                </p>

                                <a
                                    href={page.sendProject.button.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer px-8 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] text-white text-base font-inter font-bold rounded-none hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#11809D]/20 mt-2"
                                >
                                    {page.sendProject.button.text}
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            </main>

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
