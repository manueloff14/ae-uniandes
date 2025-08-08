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

    const { language } = useParams(); // Se espera que la URL tenga /[language]/page.jsx, por ejemplo, /en
    const [loading, setLoading] = useState(true);
    const [translatedData, setTranslatedData] = useState(null);

    // Hook para cargar los datos traducidos
    useEffect(() => {
        const savedLanguage =
            language || localStorage.getItem("language") || "es"; // Usa language de la URL o el valor guardado
        localStorage.setItem("language", savedLanguage);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/traducir`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lang: savedLanguage,
                section: "Galeria", // Asegúrate de que la sección sea la correcta
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
        <div className="bg-white bg-[url('/bg-texture.svg')]">
            <HeaderHome black={true} data={translatedData} />

            <section className="max-w-6xl mx-auto px-4 pt-32 py-28 sm:pt-48 mb-10">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                        {translatedData.tagline}
                    </span>
                </div>

                <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                    {translatedData.title}
                </h2>

                <p className="text-center text-gray-700 mb-12 font-serif">
                    {translatedData.description}
                </p>

                {/* Loader mientras espera mostrar la galería */}
                {!isGalleryVisible && (
                    <div className="flex justify-center items-center py-32">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-black border-dotted rounded-full animate-spin"></div>
                            {/* <p className="text-gray-600 font-serif">
                                Cargando imágenes...
                            </p> */}
                        </div>
                    </div>
                )}
                
                <CarouselGallery galeria={translatedData.fields} />
            </section>

            <Footer data={translatedData} />

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
