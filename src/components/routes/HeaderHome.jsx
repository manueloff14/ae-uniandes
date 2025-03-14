"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeaderHome({ black }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isJoinMenuOpen, setIsJoinMenuOpen] = useState(false);

    // Detectar scroll inicial y cuando el usuario se mueve
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        handleScroll(); // <-- Detecta scroll inicial al cargar
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsJoinMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsJoinMenuOpen(false);
    };

    const openJoinMenu = () => {
        setIsJoinMenuOpen(true);
    };

    const backToMainMenu = () => {
        setIsJoinMenuOpen(false);
    };

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
                        src={
                            black
                                ? "/ae-logo-black.svg"
                                : isScrolled
                                ? "/ae-logo-black.svg"
                                : "/ae-logo.svg"
                        }
                        className="w-[200px] lg:w-[220px]"
                        alt="AE Logo"
                    />
                </div>
            </Link>

            {/* MENÚ NAVEGACIÓN (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-4">
                <Link
                    href="/acerca-de-ae"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Acerca de AE
                </Link>
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
                    href="/galeria"
                    className="px-4 py-2 text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                >
                    Galería
                </Link>
            </nav>

            {/* BOTONES DE ACCIÓN (Desktop) */}
            <div className="hidden lg:flex items-center justify-end space-x-4 flex-grow basis-0">
                <div className="relative group">
                    <div className="cursor-pointer flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white border-2 border-[#06869B] bg-[#06869B] rounded-full transition-all font-serif hover:bg-white hover:text-[#06869B]">
                        ¡Unirme!
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

            {/* BOTÓN DEL MENÚ MÓVIL */}
            <div className="lg:hidden">
                <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="focus:outline-none"
                >
                    <svg
                        className={`w-6 h-6 ${
                            black || isScrolled ? "text-black" : "text-white"
                        }`}
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

            {/* MENÚ MÓVIL ANIMADO */}
            <div
                className={`fixed inset-0 z-[99] bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
                onClick={closeMobileMenu}
            >
                <div
                    className={`absolute top-0 right-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    } flex flex-col justify-between`} // <-- Panel y contenido sincronizado
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* CABECERA del menú */}
                    <div className="flex justify-end p-4">
                        <button
                            onClick={closeMobileMenu}
                            className="text-black"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    x1="18"
                                    y1="6"
                                    x2="6"
                                    y2="18"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="6"
                                    y1="6"
                                    x2="18"
                                    y2="18"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* CONTENIDO DEL MENÚ */}
                    <div className="flex-1 p-6">
                        {!isJoinMenuOpen ? (
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/acerca-de-ae"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Acerca de AE
                                </Link>
                                <Link
                                    href="/proyectos"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Proyectos
                                </Link>
                                <Link
                                    href="/eventos"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Eventos
                                </Link>
                                <Link
                                    href="/galeria"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Galería
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={backToMainMenu}
                                    className="flex items-center text-black text-sm mb-4"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                    Volver
                                </button>

                                <Link
                                    href="/join/fellowship"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Intro (Arete) Fellowship
                                </Link>

                                <Link
                                    href="/join/newsletter"
                                    onClick={closeMobileMenu}
                                    className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif"
                                >
                                    Unirse a nuestra lista de correos
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* BOTÓN ¡Unirme! siempre abajo */}
                    {!isJoinMenuOpen && (
                        <div className="p-6">
                            <button
                                onClick={openJoinMenu}
                                className="block w-full text-center text-white bg-[#06869B] px-5 py-3 rounded-full font-serif font-semibold hover:bg-[#056b7c] transition-all"
                            >
                                ¡Unirme!
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
