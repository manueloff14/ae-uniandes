"use client";

import { useRef, useEffect, useState } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";

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

            {/* Sección Hero (primera sección) */}
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

                {/* Overlay adicional */}
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

            <div className="max-w-[90rem] mx-auto px-6 md:px-28 pt-16 py-20">
                <h2 className="text-black text-xl font-bold font-inter">
                    {page.EventsInfo.title || "Eventos"}
                </h2>

                <div className="flex flex-col lg:flex-row items-start gap-6 py-6">
                    <div className="w-full">
                        <iframe
                            src={page.EventsInfo.linkEmbedLumma}
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
                            href={page.EventsInfo.linkLumma}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={page.EventsInfo.imageLumma.url}
                                className="w-full rounded-2xl border border-gray-400"
                                alt=""
                            />
                        </a>
                        <div className="mt-4">
                            <h2 className="text-xl font-bold font-inter text-black">
                                {page.EventsInfo.title || "Eventos"}
                            </h2>
                            <p className="text-sm font-inter text-black mt-2 mb-2">
                                {page.EventsInfo.description}
                            </p>
                            <a
                                href={page.EventsInfo.linkLumma}
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

            <Footer data={{ header, footer }} />
        </div>
    );
}
