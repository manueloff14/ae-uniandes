"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className="fixed w-full flex items-center justify-between px-20 py-3 z-[100]"
            style={{
                // Cambia el color y quita el blur cuando se ha hecho scroll
                backgroundColor: isScrolled ? "black" : "",
                backdropFilter: isScrolled ? "none" : "",
                WebkitBackdropFilter: isScrolled ? "none" : "", // Safari
                transition:
                    "background-color 0.3s ease, backdrop-filter 0.2s ease",
                top: 0,
                left: 0,
                right: 0,
                height: "70px",
            }}
        >
            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={25} height={25} />
                <h2 className="text-3xl font-bold font-serif">AE Uniandes</h2>
            </div>
            <div className="flex items-center space-x-6 text-sm font-bold">
                <ul className="flex space-x-6">
                    <li>
                        <a href="/acerca" className="hover:underline">
                            Acerca de AE
                        </a>
                    </li>
                    <li>
                        <a href="/proyectos" className="hover:underline">
                            Proyectos
                        </a>
                    </li>
                    <li>
                        <a href="/eventos" className="hover:underline">
                            Eventos
                        </a>
                    </li>
                    <li>
                        <a href="/blog" className="hover:underline">
                            Blog
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-2 bg-[#000000] rounded-full p-1 border border-gray-600">
                    {/* Botón secundario a la izquierda */}
                    <button
                        type="button"
                        className="bg-[#161616] text-white px-4 py-2 rounded-full"
                    >
                        Contacto
                    </button>

                    {/* Botón principal a la derecha con degradado */}
                    <button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-full"
                    >
                        Unirme
                    </button>
                </div>
            </div>
        </header>
    );
}
