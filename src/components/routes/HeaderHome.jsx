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
            className={`fixed w-full flex items-center justify-between px-6 lg:px-16 z-[100] transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            {/* LOGO */}
            <Link href="/" className="flex-grow basis-0">
                <div className="flex items-center">
                    <img src="/ae-logo.svg" className="w-[200px] lg:w-[220px]" alt="" />
                </div>
            </Link>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav className="hidden lg:flex items-center space-x-4">
                <Link
                    href="/acerca-de-ae"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full hover:bg-gray-100 font-serif"
                >
                    Acerca de AE
                </Link>
                <Link
                    href="/proyectos"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full hover:bg-gray-100 font-serif"
                >
                    Proyectos
                </Link>
                <Link
                    href="/eventos"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full hover:bg-gray-100 font-serif"
                >
                    Eventos
                </Link>
                <Link
                    href="/blog"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full hover:bg-gray-100 font-serif"
                >
                    Blog
                </Link>
            </nav>

            {/* BOTONES DE ACCIÓN */}
            <div className="hidden lg:flex items-center justify-end space-x-4 flex-grow basis-0">
                <Link
                    href="/contacto"
                    className="text-sm font-medium text-black font-serif mr-2"
                >
                    Contacto
                </Link>
                <Link
                    href="/contact"
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white border-2 border-[#06869B] bg-[#06869B] rounded-full transition-all font-serif 
               hover:bg-white hover:text-[#06869B]"
                >
                    ¡Unirme!
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
                <button className="p-2 border-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all duration-200">
                    <div className="w-5 h-5 overflow-hidden rounded-full">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Spain_%28Civil%29_alternate_colours.svg/2560px-Flag_of_Spain_%28Civil%29_alternate_colours.svg.png"
                            alt="Placeholder"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <img className="w-[14px] rotate-90" src="https://icons.veryicon.com/png/o/miscellaneous/linktrip/forward-arrow-1.png" alt="" />
                </button>
            </div>

            {/* MENÚ MÓVIL */}
            <div className="lg:hidden">
                <button type="button">
                    <svg
                        className="w-6 h-6 text-black"
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
