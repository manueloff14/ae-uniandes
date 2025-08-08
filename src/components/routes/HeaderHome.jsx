"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderHome({ black, data }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isJoinMenuOpen, setIsJoinMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);

    // Manejo del idioma actual (por defecto "es")
    const [currentLanguage, setCurrentLanguage] = useState("es");

    // Obtener el idioma desde localStorage si existe
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const router = useRouter();

    // Efecto para detectar scroll y aplicar estilos
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Para chequear al cargar
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Función para cambiar de idioma y redirigir
    const handleLanguageChange = (langCode) => {
        setCurrentLanguage(langCode);
        setIsDropdownOpen(false);

        // Obtén la URL actual
        const currentUrl = window.location.href;

        // Crea una expresión regular para encontrar el primer segmento de la URL que corresponde al código de idioma
        const updatedUrl = currentUrl.replace(
            /(^https?:\/\/[^\/]+\/)([a-z]{2})/,
            `$1${langCode}`
        );

        // Redirige a la nueva URL con el idioma cambiado
        router.push(updatedUrl);
    };

    // Datos del header (si vienen de un JSON traducido)
    const headerData = data?.Header || {};
    const {
        logo = {}, // { src: "...", alt: "..." }
        navItems = [], // [{ label: "...", link: "..." }, ...]
        ctaButton = {}, // { text: "...", subItems: [...] }
    } = headerData;

    // Opciones de idioma (ajusta banderas/rutas)
    const languageOptions = [
        {
            code: "es",
            label: "Español",
            flag: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Colombia.png",
        },
        {
            code: "en",
            label: "English",
            flag: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg",
        },
        {
            code: "fr",
            label: "Français",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png",
        },
        {
            code: "de",
            label: "Deutsch",
            flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
        },
        {
            code: "it",
            label: "Italiano",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/255px-Flag_of_Italy.svg.png",
        },
        {
            code: "pt",
            label: "Português",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/640px-Flag_of_Portugal.svg.png",
        },
    ];

    // Datos del idioma actual (para mostrar la bandera y el código)
    const currentLangData =
        languageOptions.find((lang) => lang.code === currentLanguage) ||
        languageOptions[0];

    // Menú móvil
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const openJoinMenu = () => setIsJoinMenuOpen(true);
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
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
            <div className="flex flex-grow basis-0 justify-start">
                <Link href="/" className="inline-flex items-center">
                    <img
                        src={
                            black
                                ? "/ae-logo-black.svg"
                                : isScrolled
                                ? "/ae-logo-black.svg"
                                : "/ae-logo.svg"
                        }
                        className="w-[160px] lg:w-[200px]"
                        alt="AE Logo"
                    />
                </Link>
            </div>

            {/* MENÚ NAVEGACIÓN (Desktop) */}
            <nav className="hidden xl:flex items-center space-x-4">
                {navItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={`/${currentLanguage}/${item.link}`}
                        className="px-4 py-2 text-xs xl:text-sm font-semibold text-black border rounded-full bg-white hover:bg-gray-100 font-serif"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* BOTÓN DE ACCIÓN (Desktop) */}
            <div className="hidden xl:flex items-center justify-end space-x-4 flex-grow basis-0">
                <div className="relative group">
                    <div className="cursor-pointer flex items-center gap-2 px-5 py-2 text-xs xl:text-sm font-semibold text-white border-2 border-[#06869B] bg-[#06869B] rounded-full transition-all font-serif hover:bg-white hover:text-[#06869B]">
                        {ctaButton.text || "¡Unirme!"}
                    </div>
                    {ctaButton.subItems && (
                        <div className="absolute right-0 top-full p-2 mt-2 w-56 bg-white border rounded-2xl shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 hover:visible hover:opacity-100 transition-all duration-300">
                            {ctaButton.subItems.map((item, idx) => (
                                <Link
                                    key={idx}
                                    /* sin el href contiene la palabra Fellowship incluir el language, si no, no */
                                    href={`${
                                        item.link.includes("fellowship")
                                            ? `/${currentLanguage}/${item.link}`
                                            : item.link
                                    }`}
                                    target={item.link.includes("fellowship") ? "_self" : "_blank"}
                                    className="rounded-xl block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selector de idioma (Desktop) */}
                <div className="relative">
                    <button
                        className="cursor-pointer flex items-center gap-2 bg-white border p-[5px] px-3 pl-2 rounded-full"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src={currentLangData.flag}
                            alt={currentLangData.code}
                            className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-black font-serif text-xs">
                            {currentLangData.code.toUpperCase()}
                        </span>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO3ZQQrCQBBE0e8JDdJDFvHsLgwKQW8QQQmM4MLsq5t6ILhM8SeQKJhJacATuAEDSR2AB/DunxUYSWr5GZJ6zKlffIkx8WfMCziTUHiMqHAZUeEyosJlRLmMKpdR5TKqSpUZd17OBoqMmSky5EoyJY5W27nZJxLxCBUuocIlVLiECpdQ4RIqmh8ARbQKJY5V/gydK4zY3CuM+B6t7UeCS/9uVtUHEhTs/ZXHkMQAAAAASUVORK5CYII="
                            alt="forward--v1"
                            className={`w-[10px] transition-transform duration-300 ${
                                isDropdownOpen
                                    ? "rotate-[270deg]"
                                    : "rotate-[90deg]"
                            }`}
                        />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full p-2 mt-4 w-56 bg-white border rounded-2xl shadow-lg transition-all duration-300">
                            {languageOptions.map((lang, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                        handleLanguageChange(lang.code)
                                    }
                                >
                                    <img
                                        src={lang.flag}
                                        alt={lang.code}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span>{lang.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* BOTÓN DEL MENÚ MÓVIL */}
            <div className="xl:hidden">
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

            {/* MENÚ MÓVIL */}
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
                    } flex flex-col justify-between overflow-y-auto`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* CABECERA DEL MENÚ */}
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

                    {/* CONTENIDO DEL MENÚ MÓVIL */}
                    <div className="flex-1 p-6 pt-2">
                        {!isJoinMenuOpen ? (
                            <div className="flex flex-col space-y-4 lg:space-y-2">
                                {navItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${currentLanguage}/${item.link}`}
                                        onClick={closeMobileMenu}
                                        className="block text-black py-2 px-4 rounded hover:bg-gray-100 font-serif lg:text-xs"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {/* Selector de idioma en menú móvil */}
                                <div className="mt-6">
                                    <button
                                        onClick={() =>
                                            setIsMobileLanguageOpen(
                                                !isMobileLanguageOpen
                                            )
                                        }
                                        className="w-full flex justify-between items-center px-4 py-2 text-black font-serif lg:text-xs font-bold hover:bg-gray-100 rounded-xl"
                                    >
                                        Idioma
                                        <svg
                                            className={`w-4 h-4 transition-transform ${
                                                isMobileLanguageOpen
                                                    ? "rotate-180"
                                                    : "rotate-0"
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {isMobileLanguageOpen && (
                                        <div className="flex flex-wrap gap-2 px-0 w-full pt-2">
                                            {languageOptions.map(
                                                (lang, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            handleLanguageChange(
                                                                lang.code
                                                            );
                                                            closeMobileMenu();
                                                        }}
                                                        className={`w-full flex items-center gap-2 py-2 px-2 rounded-2xl hover:bg-gray-100 ${
                                                            currentLanguage ===
                                                            lang.code
                                                                ? "bg-gray-200"
                                                                : ""
                                                        }`}
                                                    >
                                                        <img
                                                            src={lang.flag}
                                                            alt={lang.code}
                                                            className="w-6 h-6 lg:w-[15px] lg:h-[15px] rounded-full object-cover"
                                                        />
                                                        <span className="text-black font-serif text-sm lg:text-xs">
                                                            {lang.label}
                                                        </span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={backToMainMenu}
                                    className="flex items-center text-black text-sm lg:text-xs mb-4"
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
                                    {data.Header.ctaButton.extraTexts.back}
                                </button>
                                {ctaButton.subItems &&
                                    ctaButton.subItems.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            /* miramos si empieza por http lo dejamos normal, pero si no, ponemos el lenguaje */
                                            href={item.link.startsWith("http") ? item.link : `/${currentLanguage}/${item.link}`}
                                            onClick={closeMobileMenu}
                                            className="block text-black py-2 px-4 rounded lg:text-xs hover:bg-gray-100 font-serif"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* BOTÓN ¡Unirme! MÓVIL */}
                    {!isJoinMenuOpen && (
                        <div className="p-6">
                            <button
                                onClick={openJoinMenu}
                                className="block w-full text-center text-white bg-[#06869B] px-5 py-3 lg:px-2 lg:text-xs rounded-full font-serif font-semibold hover:bg-[#056b7c] transition-all"
                            >
                                {ctaButton.text || "¡Unirme!"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
