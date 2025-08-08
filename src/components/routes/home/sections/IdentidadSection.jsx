"use client";

import { useState, useEffect } from "react";

export default function IdentidadSection({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalAnimation, setModalAnimation] = useState(false);

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
            <h2 className="text-3xl font-bold text-center text-black mb-10 font-inter">
                {data.identidad.title}
            </h2>
            {data.identidad.fields ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-10">
                    {data.identidad.fields.map((item, index) => (
                        <li
                            key={index}
                            className="relative h-[250px] bg-[#1E1E1E] rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl hover:shadow-black hover:scale-105 cursor-pointer"
                            onClick={() => handleItemClick(item)}
                        >
                            <img
                                src={item.imageLink}
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
            ) : (
                <h1>no hay</h1>
            )}

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
                        <h3 className="text-2xl font-bold mb-4 text-black font-inter">
                            {selectedItem.texto}
                        </h3>
                        <p className="mb-4 text-black font-inter">
                            {selectedItem.content}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
