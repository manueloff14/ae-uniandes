"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import IdentidadSection from "@/components/routes/home/sections/IdentidadSection";

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
                <section className="pt-28 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:py-40 lg:px-28">
                    <div className="flex justify-center mb-4">
                        <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-inter">
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
                    <div
                        className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:${coordinadoresGrid}`}
                    >
                        {page?.coordinadores?.person?.map((member) => (
                            <div
                                key={member.id ?? member.name}
                                className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                            >
                                <img
                                    src={member.foto.url}
                                    alt={`Integrante ${member.name}`}
                                    className="w-[280px] h-[280px] rounded-3xl object-cover mb-4"
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
                    <div
                        className={`grid gap-8 font-inter grid-cols-1 sm:${voluntariosGrid}`}
                    >
                        {page?.volundarios?.person?.map((member) => (
                            <div
                                key={member.id ?? member.name}
                                className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                            >
                                <img
                                    src={member.foto.url}
                                    alt={`Integrante ${member.name}`}
                                    className="w-[280px] h-[280px] rounded-3xl object-cover mb-4"
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
                        <span className="p-2 px-4 rounded-full border text-xs text-center text-black font-inter">
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

                <section className="bg-white mb-36">
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row items-center rounded-[2.5rem] overflow-hidden shadow-md bg-gray-100">
                            {/* Imagen con gradiente */}
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <img
                                    src={page.global[0].portada.url}
                                    alt="Foto grupal de la comunidad"
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Capa de gradiente: móvil hacia arriba, tablet/PC hacia la derecha */}
                                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-gray-100" />
                            </div>

                            {/* Contenido textual */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col items-start gap-2 md:text-left">
                                <img
                                    className="w-[150px]"
                                    src={page.global[0].logoAEGlobal.url}
                                    alt="Logo EA"
                                />
                                <p className="text-gray-600 mt-2 text-lg md:text-xl font-inter">
                                    {page.global[0].text}
                                </p>
                                <a
                                    href={page.global[0].buttonAction.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer p-4 px-5 flex items-center gap-2 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] mt-4 text-sm font-inter font-bold rounded-full hover:scale-110 transition-all duration-200"
                                >
                                   {page.global[0].buttonAction.text}
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
            </main>

            <Footer data={{header, footer}} />
        </div>
    );
}
