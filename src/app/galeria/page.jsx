"use client";

import { useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";

export default function Galeria() {
    const images = [
        "/img/galeria/image_1.jpg",
        "/img/galeria/image_2.jpg",
        "/img/galeria/image_3.jpg",
        "/img/galeria/image_4.jpg",
        "/img/galeria/image_5.jpg",
        "/img/galeria/image_6.jpg",
        "/img/galeria/image_7.jpg",
        "/img/galeria/image_8.jpg",
        "/img/galeria/image_9.jpg",
        "/img/galeria/image_10.jpg",
        "/img/galeria/image_11.jpg",
        "/img/galeria/image_12.jpg",
        "/img/galeria/image_13.jpg",
        "/img/galeria/image_14.jpg",
        "/img/galeria/image_15.jpg",
        "/img/galeria/image_16.jpg",
        "/img/galeria/image_17.jpg",
        "/img/galeria/image_18.jpg",
        "/img/galeria/image_19.jpg",
        "/img/galeria/image_20.jpg",
    ];

    const [selectedImage, setSelectedImage] = useState(null);
    const [modalAnimation, setModalAnimation] = useState(false);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

    // Retrasar la visualización de las imágenes
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGalleryVisible(true);
        }, 500); // 1 segundo de delay para cargar las imágenes
        return () => clearTimeout(timer);
    }, []);

    // Modal Animations
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

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") closeModal();
        }
        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage]);

    return (
        <div>
            <HeaderHome black={true} />

            <section className="max-w-6xl mx-auto px-4 py-8 pt-32 mb-10">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                        Galería AE Uniandes
                    </span>
                </div>

                <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                    Unidos para Transformar Vidas
                </h2>

                <p className="text-center text-gray-700 mb-12 font-serif">
                    Explora cómo nuestra comunidad está generando un impacto
                    positivo a través del altruismo eficaz.
                </p>

                {/* Loader mientras espera mostrar la galería */}
                {!isGalleryVisible && (
                    <div className="flex justify-center items-center py-32">
                        <div className="flex flex-col items-center gap-4">
                            {/* Spinner */}
                            <div className="w-12 h-12 border-4 border-black border-dotted rounded-full animate-spin"></div>
                            <p className="text-gray-600 font-serif">
                                Cargando imágenes...
                            </p>
                        </div>
                    </div>
                )}

                {/* Layout tipo Masonry con CSS columns */}
                <div
                    className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 ${
                        isGalleryVisible
                            ? "opacity-100 transition-opacity duration-500"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    {images.map((url, index) => (
                        <div
                            key={index}
                            className={`mb-4 break-inside-avoid transition-transform duration-500 ${
                                isGalleryVisible
                                    ? "scale-100 opacity-100"
                                    : "scale-95 opacity-0"
                            }`}
                        >
                            <img
                                src={url}
                                alt={`Imagen de la galería ${index}`}
                                className={`w-full h-auto rounded-3xl shadow hover:opacity-90 transition-opacity cursor-pointer`}
                                onClick={() => openModal(url)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

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
