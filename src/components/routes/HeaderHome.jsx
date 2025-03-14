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
                    <img
                        src={`${
                            isScrolled ? "/ae-logo-black.svg" : "/ae-logo.svg"
                        }`}
                        className="w-[200px] lg:w-[220px]"
                        alt="AE Logo"
                    />
                </div>
            </Link>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav className="hidden lg:flex items-center space-x-4">
                {/* Acerca de AE con submenu */}
                <div className="relative group">
                    <Link
                        href="/acerca-de-ae"
                        className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                    >
                        Acerca de AE
                    </Link>
                </div>

                {/* Enlaces sin submenu */}
                <Link
                    href="/proyectos"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Proyectos
                </Link>
                <Link
                    href="/eventos"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Eventos
                </Link>
                <Link
                    href="/blog"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Blog
                </Link>
                <Link
                    href="/blog"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Galeria
                </Link>
            </nav>

            {/* BOTONES DE ACCIÓN */}
            <div className="hidden lg:flex items-center justify-end space-x-4 flex-grow basis-0">
                {/* <Link
                    href="/contacto"
                    className={`text-sm font-medium font-serif mr-2 ${
                        isScrolled ? "text-black" : "text-white"
                    }`}
                >
                    Contacto
                </Link> */}
                <div className="relative group">
                    <div
                        className="cursor-pointer flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white border-2 border-[#06869B] bg-[#06869B] rounded-full transition-all font-serif hover:bg-white hover:text-[#06869B]"
                    >
                        ¡Unirme!
                        {/* <svg
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
                        </svg> */}
                    </div>
                    <div className="absolute right-0 top-full p-2 mt-2 w-56 bg-white border rounded-2xl shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 hover:visible hover:opacity-100 transition-all duration-300">
                        <Link
                            href="/join/fellowship"
                            className="rounded-xl block px-4 py-2 text-sm text-black hover:bg-gray-100"
                        >
                            Intro (Arete) Fellowship
                        </Link>
                        <Link
                            href="/join/newsletter"
                            className="rounded-xl block px-4 py-2 text-sm text-black hover:bg-gray-100"
                        >
                            Unirse a nuestra lista de correos
                        </Link>
                    </div>
                </div>
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
