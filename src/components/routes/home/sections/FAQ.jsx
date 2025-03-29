"use client";

import { useState } from "react";

export default function PreguntasFrecuentes({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);

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
                    {data.PreguntasFrecuentes.faq.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left flex items-center justify-between bg-[#f1f1f1] px-6 py-3 rounded-3xl lg:rounded-full"
                            >
                                <h3 className="text-lg font-semibold text-black font-serif">
                                    {faq.question}
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
                                        {faq.answer}
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
