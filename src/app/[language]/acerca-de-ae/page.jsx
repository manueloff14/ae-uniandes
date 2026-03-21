"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import IdentidadSection from "@/components/routes/home/sections/IdentidadSection";
import HeroSection from "@/components/routes/HeroSection";
import { ExternalLink } from "lucide-react";

export default function Home() {
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
                    fetch(`${base}/api/acerca-de-ae-page?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/footer?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                ]);

                if (!headerRes.ok || !pageRes.ok || !footerRes.ok) {
                    throw new Error(
                        `HTTP: header ${headerRes.status}, page ${pageRes.status}, footer ${footerRes.status}`,
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

    // Función para abrir el modal con animación de entrada
    const openModal = (member) => {
        setSelectedMember(member);
        setModalAnimation(false);
        setTimeout(() => {
            setModalAnimation(true);
        }, 10);
    };

    // Función para cerrar el modal con animación de salida
    const closeModal = () => {
        setModalAnimation(false);
        setTimeout(() => {
            setSelectedMember(null);
        }, 300);
    };

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

    const voluntariosCount = page?.volundarios?.person?.length;
    const coordinadoresCount = page?.coordinadores?.person?.length;

    const coordinadoresGrid = `grid-cols-${coordinadoresCount}`;
    const voluntariosGrid = `grid-cols-${voluntariosCount}`;

    return (
        <div>
            <HeaderHome black={true} data={header} />

            <main>
                <HeroSection 
                    image="https://rational-canvas-1f9094ba41.media.strapiapp.com/image_1_ce30fc1286.jpg"
                    title="Acerca de AE"
                    subtitle="Conoce nuestra historia, misión y la comunidad global que nos respalda."
                />

                <section className="pb-16 px-4 sm:px-8 md:px-16 lg:px-28 lg:py-20">
                    <div className="flex justify-center mb-4">
                        <span className="p-2 px-4 rounded-none border border-black text-xs text-center text-black font-inter">
                            {page.coordinadores.info.preTitle}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-inter">
                        {page.coordinadores.info.title}
                    </h2>
                    <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-inter">
                        {page.coordinadores.info.description}
                    </p>

                    {/* Contenedor de integrantes */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
                        {page?.coordinadores?.person?.map((member) => (
                            <div
                                key={member.id ?? member.name}
                                className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                            >
                                <img
                                    src={member.foto.url}
                                    alt={`Integrante ${member.name}`}
                                    className="w-[280px] h-[280px] rounded-none object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-black font-inter">
                                    {member.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="pt-10 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:py-40 lg:pt-10 lg:px-96">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-inter">
                        {page.volundarios.info.title}
                    </h2>
                    <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-inter">
                        {page.volundarios.info.description}
                    </p>

                    {/* Contenedor de voluntarios */}
                    <div className="flex flex-wrap justify-center font-inter gap-8 sm:gap-12 lg:gap-16">
                        {page?.volundarios?.person?.map((member) => (
                            <div
                                key={member.id ?? member.name}
                                className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                            >
                                <img
                                    src={member.foto.url}
                                    alt={`Integrante ${member.name}`}
                                    className="w-[280px] h-[280px] rounded-none object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-black font-inter">
                                    {member.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                <IdentidadSection data={page} />

                <section className="pt-10 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:pb-40 lg:pt-28 lg:px-28">
                    <div className="flex justify-center mb-4">
                        <span className="p-2 px-4 rounded-none border border-black text-xs text-center text-black font-inter">
                            {page.impact.info.preTitle}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-inter">
                        {page.impact.info.title}
                    </h2>
                    <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-inter">
                        {page.impact.info.description}
                    </p>
                </section>

                <section className="bg-[#c9d6d9] mb-36 py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-stretch rounded-none overflow-hidden bg-white">
                            {/* Imagen de la comunidad con texto superpuesto estilo Hero */}
                            <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px] flex items-end justify-start p-8 md:p-12">
                                <img
                                    src={page.global[0].portada.url}
                                    alt="Foto grupal de la comunidad"
                                    className="w-full h-full object-cover absolute inset-0 z-0"
                                />
                                {/* Solo opacidad */}
                                <div className="absolute inset-0 bg-black/50 z-10"></div>
                                
                                {/* Contenido directamente sobre la imagen alineado a la esquina inferior izquierda */}
                                <div className="relative z-20 flex flex-col items-start text-left">
                                    <img
                                        className="w-[160px] md:w-[200px] mb-6 brightness-0 invert"
                                        src={page.global[0].logoAEGlobal.url}
                                        alt="Logo EA"
                                    />
                                    <h2 className="text-white text-2xl md:text-3xl font-inter font-bold leading-tight max-w-sm">
                                        {page.global[0].text}
                                    </h2>
                                </div>
                            </div>

                            {/* Contenido elegante de la derecha */}
                            <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-center p-10 sm:p-14">
                                {/* Patrón de puntos decorativo en el fondo */}
                                <div 
                                    className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                                    style={{ backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
                                ></div>
                                
                                {/* Marca de agua decorativa */}
                                <img 
                                    src={page.global[0].logoAEGlobal.url} 
                                    alt="" 
                                    className="absolute -right-8 -bottom-16 w-64 md:w-80 opacity-[0.03] rotate-[15deg] pointer-events-none grayscale" 
                                />

                                <div className="relative z-10 flex flex-col items-center gap-8">
                                    <span className="p-2 px-4 rounded-none border border-black text-xs text-center text-black font-inter uppercase tracking-widest font-bold">
                                        Conéctate
                                    </span>

                                    <p className="text-gray-600 text-base md:text-lg max-w-md font-inter leading-relaxed">
                                        Formamos parte de una extensa red internacional de estudiantes, investigadores y profesionales trabajando juntos para encontrar las mejores formas de resolver los problemas más apremiantes del mundo.
                                    </p>

                                    <a
                                        href={page.global[0].buttonAction.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer px-8 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] text-white text-base font-inter font-bold rounded-none hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#11809D]/20"
                                    >
                                        {page.global[0].buttonAction.text}
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer data={{ header, footer }} />
        </div>
    );
}
