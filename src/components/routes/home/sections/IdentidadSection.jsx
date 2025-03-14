"use client";

import { useState, useEffect } from "react";

export default function IdentidadSection() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalAnimation, setModalAnimation] = useState(false);

    const items = [
        {
            texto: "Misión",
            imagen: "/img/mision.jpg",
            content:
                "En Altruismo Eficaz Uniandes, buscamos responder a una de las preguntas más fundamentales de nuestra época: ¿cómo podemos hacer el mayor bien posible? Para ello, aplicamos un enfoque basado en la razón, la evidencia y la acción estratégica, asegurándonos de que nuestros esfuerzos tengan el mayor impacto positivo. No solo promovemos la reflexión crítica sobre las causas más urgentes, sino que también brindamos las herramientas para actuar de manera efectiva.",
        },
        {
            texto: "Comunidad",
            imagen: "/img/comunidad.jpg",
            content:
                "Aunque llevamos el nombre de Uniandes, nuestra comunidad está abierta a cualquier persona comprometida con generar un cambio real. Valoramos la diversidad de perspectivas y la colaboración interdisciplinaria, entendiendo que las mejores soluciones surgen del diálogo y el aprendizaje conjunto. Ya seas estudiante, profesional o simplemente alguien con la convicción de hacer el bien de manera efectiva, aquí encontrarás un espacio para crecer, cuestionar y actuar.",
        },
        {
            texto: "Impacto",
            imagen: "/img/impacto.jpg",
            content:
                "El altruismo no es solo una intención, sino una responsabilidad. En nuestro grupo, buscamos que cada acción cuente, priorizando aquellas iniciativas con el mayor potencial de cambio. Nos apoyamos en la evidencia para identificar problemas críticos, evaluar soluciones y diseñar estrategias que maximicen el impacto. Desde discusiones y círculos de lectura hasta eventos, mentorías y oportunidades profesionales, nuestro compromiso es transformar buenas intenciones en resultados concretos.",
        },
        {
            texto: "Visión",
            imagen: "/img/vision.jpg",
            content:
                "Imaginamos un mundo donde cada persona tenga las herramientas para canalizar su altruismo de manera efectiva, tomando decisiones informadas y estratégicas para mejorar la vida de los demás. Nuestro objetivo no es solo fortalecer la comunidad de altruismo eficaz en Uniandes, sino también contribuir a una cultura global de impacto basado en evidencia. Creemos en el poder de la razón y la cooperación para construir un futuro donde el bienestar sea una prioridad universal”.",
        },
    ];

    const handleItemClick = (item) => {
        setSelectedItem(item);
        // Pequeño retardo para que se ejecute la transición de entrada
        setTimeout(() => setModalAnimation(true), 10);
    };

    const closeModal = () => {
        // Inicia la animación de salida
        setModalAnimation(false);
        setTimeout(() => {
            setSelectedItem(null);
        }, 300); // Duración de la animación
    };

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center text-black mb-10 font-serif">
                Identidad de AE Uniandes
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-10">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="relative h-[250px] bg-[#1E1E1E] rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl hover:shadow-black hover:scale-105 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                    >
                        <img
                            src={item.imagen}
                            alt={item.texto}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4 border-2 border-transparent bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] rounded-full flex items-center justify-center p-4 shadow-2xl shadow-black">
                            <span className="text-white font-semibold text-base text-center">
                                {item.texto}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedItem && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-[500]"
                    onClick={closeModal}
                >
                    {/* Fondo semitransparente */}
                    <div
                        className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300"
                        onClick={closeModal}
                        aria-hidden="true"
                    ></div>

                    {/* Modal flotante con animación de entrada y salida */}
                    <div
                        className={`text-center relative bg-[#f1f1f1] shadow-xl shadow-black rounded-3xl p-8 max-w-lg w-full mx-4 z-50 transform transition-all duration-300 ease-out ${
                            modalAnimation
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="text-4xl p-1 absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h3 className="text-2xl font-bold mb-4 text-black font-serif">
                            {selectedItem.texto}
                        </h3>
                        <p className="mb-4 text-black font-serif">
                            {selectedItem.content}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
