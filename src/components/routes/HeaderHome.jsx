"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
            className="fixed w-full flex items-center justify-between px-6 lg:px-20 py-3 z-[100]"
            style={{
                backgroundColor: isScrolled ? "black" : "",
                backdropFilter: isScrolled ? "none" : "",
                WebkitBackdropFilter: isScrolled ? "none" : "",
                transition:
                    "background-color 0.3s ease, backdrop-filter 0.2s ease",
                top: 0,
                left: 0,
                right: 0,
                height: "70px",
            }}
        >
            <Link href="/">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={25} height={25} />
                    {/* El título solo se muestra en pantallas grandes */}
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                        AE Uniandes
                    </h2>
                </div>
            </Link>

            {/* Menú de escritorio */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-bold">
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/acerca-de-ae" className="hover:underline">
                            Acerca de AE
                        </Link>
                    </li>
                    <li>
                        <Link href="/proyectos" className="hover:underline">
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link href="/eventos" className="hover:underline">
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:underline">
                            Blog
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center gap-2 bg-[#000000] rounded-full p-1 border border-gray-600">
                    <button
                        type="button"
                        className="bg-[#161616] text-white px-4 py-2 rounded-full"
                    >
                        Contacto
                    </button>
                    <button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-full"
                    >
                        Unirme
                    </button>
                </div>
            </div>

            {/* Ícono de menú para dispositivos móviles */}
            <div className="lg:hidden">
                <button type="button">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="4"
                            y1="7"
                            x2="20"
                            y2="7"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <line
                            x1="4"
                            y1="17"
                            x2="20"
                            y2="17"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}
