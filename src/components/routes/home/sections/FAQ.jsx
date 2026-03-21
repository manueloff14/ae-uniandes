"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PreguntasFrecuentes({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);

    // Función para manejar la apertura/cierre de las preguntas
    const toggleFAQ = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-28">
                <h2 className="text-center text-2xl font-bold text-black mb-6  font-inter">
                    {data?.frequentlyQuestions?.title || "Preguntas Frecuentes"}
                </h2>
                <div className="space-y-4">
                    {data.frequentlyQuestions.question.map((faq, index) => (
                        <div
                            key={index}
                            className={
                                index <
                                data.frequentlyQuestions.question.length - 1
                                    ? "border-b border-gray-300"
                                    : ""
                            }
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left flex items-center justify-between px-0 py-3 pb-6 rounded-none"
                            >
                                <h3 className="text-lg font-semibold text-black  font-inter">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    color="black"
                                    size={18}
                                    className={`transition-transform duration-300 ${activeIndex === index ? "-rotate-180" : "rotate-0"}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    activeIndex === index
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="rounded-none px-0 pb-4">
                                    <p className="text-gray-900 text-sm leading-relaxed  font-inter">
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
