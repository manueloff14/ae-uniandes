"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import CarouselGallery from "@/components/Gallery";

export default function Galeria() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalAnimation, setModalAnimation] = useState(false);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

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
                    fetch(`${base}/api/galeria-page?pLevel=${pLevel}`, {
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

    // Retrasar la visualización de las imágenes (mover este hook antes de los retornos condicionales)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGalleryVisible(true);
        }, 500); // 0.5 segundos de delay para cargar las imágenes
        return () => clearTimeout(timer);
    }, []);

    // Modal: Manejo del evento de tecla Escape
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") closeModal();
        }
        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage]);

    // Funciones para controlar el modal
    function openModal(url) {
        setSelectedImage(url);
        setTimeout(() => {
            setModalAnimation(true);
        }, 50);
    }

    function closeModal() {
        setModalAnimation(false);
        setTimeout(() => {
            setSelectedImage(null);
        }, 300);
    }

    // Render condicional en base al estado de carga y datos traducidos
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
        <div className="bg-white bg-[url('/bg-texture.svg')]">
            <HeaderHome black={true} data={header} />

            <section className="max-w-6xl mx-auto px-4 pt-32 py-28 sm:pt-48 mb-10">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-inter">
                        {page.Gallery.info.preTitle}
                    </span>
                </div>

                <h2 className="text-3xl font-bold text-center text-black mb-2 font-inter">
                    {page.Gallery.info.title}
                </h2>

                <p className="text-center text-gray-700 mb-12 font-inter">
                    {page.Gallery.info.description}
                </p>

                {/* Loader mientras espera mostrar la galería */}
                {!isGalleryVisible && (
                    <div className="flex justify-center items-center py-32">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-black border-dotted rounded-full animate-spin"></div>
                            {/* <p className="text-gray-600 font-inter">
                                Cargando imágenes...
                            </p> */}
                        </div>
                    </div>
                )}
                
                <CarouselGallery galeria={page.Gallery.imageGallery} />
            </section>

            <Footer data={{header, footer}} />

            {/* Modal para la imagen ampliada */}
            {selectedImage && (
                <div
                    className={`fixed inset-0 z-[500] flex items-center justify-center bg-[#0000009c] backdrop-blur-[10px] transition-opacity duration-300 ${
                        modalAnimation ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={closeModal}
                >
                    <div
                        className={`relative p-4 ${
                            modalAnimation
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-95 translate-y-2"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Imagen ampliada"
                            className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-xl shadow-gray-600"
                        />

                        <button
                            className="absolute top-4 right-4 m-5 text-white bg-black rounded-full p-2 hover:bg-opacity-60"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
