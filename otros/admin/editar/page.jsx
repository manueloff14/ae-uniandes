"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import { useState } from "react";

export default function EditarPanel() {
    const { user, loading } = useAuth();

    // Inicializo cada item con loaded: false
    const [items, setItems] = useState([
        {
            title: "HomePage",
            description: "Editar la sección de la home page",
            src: "https://www.aeuniandes.com/es/",
            loaded: false,
        },
        {
            title: "Acerca de AE",
            description: "Editar la sección de Acerca de AE",
            src: "https://www.aeuniandes.com/es/acerca-de-ae",
            loaded: false,
        },
        {
            title: "Proyectos",
            description: "Editar la sección de Proyectos",
            src: "https://www.aeuniandes.com/es/proyectos",
            loaded: false,
        },
        {
            title: "Eventos",
            description: "Editar la sección de Eventos",
            src: "https://www.aeuniandes.com/es/eventos",
            loaded: false,
        },
        {
            title: "Galeria",
            description: "Editar la sección de la galeria",
            src: "https://www.aeuniandes.com/es/galeria",
            loaded: false,
        },
    ]);

    // Marca un item como cargado al recibir onLoad de la imagen
    const handleImageLoad = (src) => {
        setItems((prev) =>
            prev.map((it) =>
                it.src === src
                    ? {
                          ...it,
                          loaded: true,
                      }
                    : it
            )
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex">
                <AsideDashboard />
                <main className="flex-1 p-6 pl-[250px]">
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div>
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Editar" user={user} />

                <div className="text-black space-y-8 pt-32">
                    <section>
                        <h2 className="text-2xl font-bold font-serif" >
                            Secciones para editar
                        </h2>
                        <p className="text-sm text-gray-500 font-serif">
                            Selecciona la sección que deseas editar y haz click
                            en el botón de editar para acceder a la sección
                            correspondiente.
                        </p>

                        {/* Siempre muestro la lista; cada imagen controla su propio skeleton */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
                            {items.map((item) => (
                                <li
                                    key={item.title}
                                    className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-200 p-4 flex flex-col"
                                    onClick={() => window.open(item.src)}
                                >
                                    {/* Skeleton hasta que item.loaded sea true */}
                                    <div
                                        className={`
    overflow-hidden rounded-2xl mb-4 w-full h-[150px]
    ${item.loaded ? "" : "bg-gray-300 animate-[pulse_1s_ease-in-out_infinite]"}
  `}
                                    >
                                        <img
                                            src={`http://localhost:5000/screenshot?url=${item.src}&delay=1000&full_page=false&width=1919&height=1074`}
                                            alt={item.title}
                                            onLoad={() =>
                                                handleImageLoad(item.src)
                                            }
                                            className={`
                        object-cover w-full h-full
                        ${
                            item.loaded
                                ? "opacity-100 transition-opacity duration-500"
                                : "opacity-0"
                        }
                      `}
                                        />
                                    </div>

                                    <h3 className="text-lg font-bold font-serif text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-serif">
                                        {item.description}
                                    </p>
                                    <button className="bg-gradient-to-r from-[#07859B] to-[#1B627C] text-white px-4 py-2 rounded-2xl mt-3 font-serif text-sm flex items-center justify-center gap-2 font-bold">
                                        Editar
                                        <img
                                            className="w-4 h-4"
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAe0lEQVR4nO3QOwqAMBBF0fGzG12O4FIsk9J9WLlGiyuBBPzERmfAIrcJIXAeRKQkIoAHZks8pTsC9MDGOa+FV/Ec1UeACViBNt6Hy4j7iqdyI59wx70FaOJ7p40fR2qtb8k1/xb3Bf/dt7jXeByww0OmeMgUD5niJXloB4XGGRY1SJAvAAAAAElFTkSuQmCC"
                                            alt="edit icon"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
