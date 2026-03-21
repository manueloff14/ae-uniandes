"use client";

import { useRef, useEffect, useState } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import HeroSection from "@/components/routes/HeroSection";
import { ExternalLink } from "lucide-react";

export default function Eventos() {
    // Referencias al contenedor scrollable (una para vigentes y otra para pasados)
    const scrollRefVigentes = useRef(null);
    const scrollRefPasados = useRef(null);

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
                    fetch(`${base}/api/eventos-page?pLevel=${pLevel}`, {
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
                    className="w-[55px] h-[55px]"
                />
                <p className="mt-4 text-sm font-bold font-inter text-black">
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

    return (
        <div>
            <HeaderHome data={header} black={false} />

            <main>
                {/* Sección Hero */}
                <HeroSection
                    image={page.heroSection.portada.url}
                    title={page.heroSection.title.title}
                    subtitle={page.heroSection.subtitle}
                />

            <div className="max-w-[90rem] mx-auto px-6 md:px-28 pt-16 py-20">
                <h2 className="text-black text-xl font-bold font-inter">
                    {page.EventsInfo.title || "Eventos"}
                </h2>

                <div className="flex flex-col lg:flex-row items-start gap-6 py-6">
                    <div className="w-full border-none p-2 bg-transparent">
                        <iframe
                            src={page.EventsInfo.linkEmbedLumma}
                            width="100%"
                            height="600"
                            frameBorder="0"
                            className="rounded-none shadow-none"
                            title="Calendario de Eventos"
                            allowFullScreen
                        />
                    </div>
                    <div className="flex flex-col items-start w-full lg:w-[600px] border-none bg-transparent p-6 gap-6">
                        <a
                            href={page.EventsInfo.linkLumma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <img
                                src={page.EventsInfo.imageLumma.url}
                                className="w-full rounded-none border-none"
                                alt="Imagen Luma"
                            />
                        </a>
                        <div className="w-full flex flex-col gap-4">
                            <h2 className="text-2xl font-bold font-inter text-black">
                                {page.EventsInfo.title || "Eventos"}
                            </h2>
                            <p className="text-base font-inter text-gray-700">
                                {page.EventsInfo.description}
                            </p>
                            <a
                                href={page.EventsInfo.linkLumma}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] text-white text-base font-inter font-bold px-4 py-4 rounded-none hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#11809D]/20 mt-2"
                            >
                                Ver calendario
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
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
