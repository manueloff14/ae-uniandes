"use client";

import { useState } from "react";

export default function PreguntasFrecuentes() {
    const [activeIndex, setActiveIndex] = useState(null);

    // Array de preguntas frecuentes
    const faqs = [
        {
            pregunta: "¿Qué es el altruismo eficaz?",
            respuesta:
                "El altruismo eficaz es una filosofía y un movimiento que busca utilizar la evidencia y la razón para encontrar las mejores formas de ayudar a los demás. AE Uniandes se basa en estos principios para diseñar y promover iniciativas de alto impacto.",
        },
        {
            pregunta: "¿Quién puede unirse a AE Uniandes?",
            respuesta:
                "Cualquier estudiante, egresado o miembro de la comunidad que comparta nuestro interés en generar un impacto positivo real. Buscamos personas apasionadas por la efectividad y la innovación social.",
        },
        {
            pregunta: "¿Cómo puedo participar en sus proyectos?",
            respuesta:
                "Ofrecemos oportunidades de voluntariado, investigación y participación en eventos y talleres. Si quieres apoyar con ideas, tiempo o recursos, ¡eres bienvenido! Revisa nuestras convocatorias en la sección de Proyectos o contáctanos directamente.",
        },
        {
            pregunta: "¿Qué beneficios obtengo al unirme?",
            respuesta:
                "Al ser parte de AE Uniandes, formarás parte de una comunidad dinámica e internacional enfocada en el progreso social. Podrás desarrollar habilidades de liderazgo, colaborar con expertos, conocer personas con intereses similares y, sobre todo, contribuir a un futuro más próspero para todos.",
        },
    ];

    // Función para manejar la apertura/cierre de las preguntas
    const toggleFAQ = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-28">
                <h2 className="text-center text-2xl font-bold text-black mb-6 font-serif">
                    Preguntas Frecuentes
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left flex items-center justify-between bg-[#f1f1f1] px-6 py-3 rounded-3xl lg:rounded-full"
                            >
                                <h3 className="text-lg font-semibold text-black font-serif">
                                    {faq.pregunta}
                                </h3>
                                <span className="text-black text-sm ml-2 font-serif">
                                    {activeIndex === index ? "-" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    activeIndex === index
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="mt-2 bg-[#f1f1f1] rounded-3xl px-5 py-3">
                                    <p className="text-gray-900 text-sm leading-relaxed font-serif">
                                        {faq.respuesta}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
