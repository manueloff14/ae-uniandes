"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, ExternalLink, X, ChevronDown, ChevronLeft } from "lucide-react";

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
    const pathname = usePathname();

    // Efecto para detectar scroll y aplicar estilos
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Para chequear al cargar
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Bloquear scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    // Función para cambiar de idioma y redirigir
    const handleLanguageChange = (langCode) => {
        setCurrentLanguage(langCode);
        setIsDropdownOpen(false);

        // Obtén la URL actual
        const currentUrl = window.location.href;

        // Crea una expresión regular para encontrar el primer segmento de la URL que corresponde al código de idioma
        const updatedUrl = currentUrl.replace(
            /(^https?:\/\/[^\/]+\/)([a-z]{2})/,
            `$1${langCode}`,
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

    console.log(data);

    return (
        <header
            className={`fixed w-full flex items-center justify-between px-5 md:px-8 lg:px-72 py-4 z-[100] transition-all duration-300 bg-[#f4eee8]`}
        >
            {/* LOGO */}
            <div className="flex mr-auto justify-start">
                <a
                    href={`/${currentLanguage}`}
                    className="inline-flex items-center"
                >
                    <img
                        src={
                            black
                                ? "/ae-logo-black.svg"
                                : !isScrolled
                                  ? "/ae-logo-black.svg"
                                  : "/ae-logo-black.svg"
                        }
                        className="w-[160px] lg:w-[200px]"
                        alt="AE Logo"
                    />
                </a>
            </div>

            {/* MENÚ NAVEGACIÓN (Desktop) */}
            <nav className="hidden xl:flex items-center space-x-0">
                {data?.links.map(
                    (item, idx) => {
                        if (item.text === "Inicio") return null;
                        const href = `/${currentLanguage}${item.url}`;
                        const active = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <Link
                                key={idx}
                                href={href}
                                className={`px-4 py-2 text-xs xl:text-sm font-semibold rounded-none font-inter transition-all ${
                                    active
                                        ? "text-[#06869B] underline underline-offset-4"
                                        : "text-black hover:text-[#06869B]"
                                }`}
                            >
                                {item.text}
                            </Link>
                        );
                    }
                )}
            </nav>

            {/* BOTÓN DE ACCIÓN (Desktop) */}
            <div className="hidden xl:flex items-center justify-end space-x-4 ml-4">
                <div className="relative group">
                    <div className="cursor-pointer flex items-center gap-2 px-5 py-2 text-xs xl:text-sm font-semibold text-white border-2 border-[#06869B] bg-[#06869B] rounded-none transition-all font-inter hover:bg-white hover:text-[#06869B]">
                        {data?.buttonAction?.text || "¡Unirme!"}
                    </div>
                    {data?.buttonAction?.children && (
                        <div className="absolute right-0 top-full p-2 mt-2 w-56 bg-[#f4eee8] border rounded-none shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 hover:visible hover:opacity-100 transition-all duration-300 shadow-black shadow-sm">
                            {data?.buttonAction?.children.map((item, idx) => (
                                <a
                                    key={idx}
                                    /* sin el href contiene la palabra Fellowship incluir el language, si no, no */
                                    href={`${
                                        item.url.includes("fellowship")
                                            ? `/${currentLanguage}${item.url}`
                                            : item.url
                                    }`}
                                    target={
                                        item.url.includes("fellowship")
                                            ? "_self"
                                            : "_blank"
                                    }
                                    className="rounded-none block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span>{item.text}</span>
                                        {item.url.startsWith("http") && (
                                            <ExternalLink
                                                size={14}
                                                className="ml-2 text-gray-500"
                                            />
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selector de idioma (Desktop) */}
                <div className="hidden">
                    <button
                        className="cursor-pointer flex items-center gap-2 bg-white border p-[5px] px-3 pl-2 rounded-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src={currentLangData.flag}
                            alt={currentLangData.code}
                            className="w-7 h-7 rounded-none object-cover"
                        />
                        <span className="text-black font-inter text-xs">
                            {currentLangData.code.toUpperCase()}
                        </span>
                        <ChevronDown
                            size={10}
                            className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-[180deg]" : "rotate-0"}`}
                        />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full p-2 mt-4 w-56 bg-white border rounded-none shadow-lg transition-all duration-300">
                            {languageOptions.map((lang, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-none flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                        handleLanguageChange(lang.code)
                                    }
                                >
                                    <img
                                        src={lang.flag}
                                        alt={lang.code}
                                        className="w-6 h-6 rounded-none object-cover"
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
                    <div className="relative w-6 h-6">
                        <Menu
                            size={24}
                            color="black"
                            className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
                        />
                        <X
                            size={24}
                            color="black"
                            className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
                        />
                    </div>
                </button>
            </div>

            {/* MENÚ MÓVIL — overlay */}
            <div
                className={`fixed inset-0 z-[98] bg-black transition-opacity duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-30 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
                style={{ top: "var(--header-height)" }}
                onClick={closeMobileMenu}
            />

            {/* MENÚ MÓVIL — drawer */}
            <div
                className={`fixed right-0 z-[99] bg-[#f4eee8] transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                    top: "var(--header-height)",
                    height: "calc(100dvh - var(--header-height))",
                    width: "100vw",
                }}
            >
                {/* TRACK deslizante: contiene los 2 paneles lado a lado */}
                <div
                    className="flex flex-1 transition-transform duration-300 ease-in-out"
                    style={{
                        width: "200%",
                        transform: isJoinMenuOpen ? "translateX(-50%)" : "translateX(0)",
                        minHeight: "100%",
                    }}
                >
                    {/* ── PANEL 1: Menú principal ── */}
                    <div className="w-1/2 flex flex-col" style={{ minWidth: "50%" }}>
                        <nav className="flex-1 px-6 pt-8 pb-4 flex flex-col">
                            {data?.links.map((item, idx) => {
                                const href = `/${currentLanguage}${item.url}`;
                                const active = pathname === href || pathname.startsWith(href + "/");
                                return (
                                    <Link
                                        key={idx}
                                        href={href}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center justify-between py-4 border-b border-gray-200 font-inter font-semibold text-base transition-colors duration-150 ${
                                            active ? "text-[#06869B]" : "text-black hover:text-[#06869B]"
                                        }`}
                                    >
                                        <span>{item.text}</span>
                                        <ChevronLeft size={16} className={`rotate-180 ${active ? "text-[#06869B]" : "text-gray-400"}`} />
                                    </Link>
                                );
                            })}

                            {/* Selector de idioma */}
                            <div className="mt-4">
                                <button
                                    onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                                    className="w-full flex justify-between items-center py-4 border-b border-gray-200 text-black font-inter font-semibold text-base"
                                >
                                    <span className="flex items-center gap-2">
                                        <img src={currentLangData.flag} alt={currentLangData.code} className="w-5 h-5 object-cover" />
                                        Idioma
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMobileLanguageOpen ? "rotate-180" : "rotate-0"}`} />
                                </button>
                                {isMobileLanguageOpen && (
                                    <div className="flex flex-col pt-2 pb-2">
                                        {languageOptions.map((lang, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { handleLanguageChange(lang.code); closeMobileMenu(); }}
                                                className={`flex items-center gap-3 py-2 px-4 text-sm font-inter text-black hover:bg-black/5 transition-colors ${currentLanguage === lang.code ? "bg-black/10 font-semibold" : ""}`}
                                            >
                                                <img src={lang.flag} alt={lang.code} className="w-5 h-5 object-cover" />
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Botón ¡Unirme! */}
                        <div className="px-6 pb-8 pt-4">
                            <button
                                onClick={openJoinMenu}
                                className="w-full text-center text-white bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] px-5 py-4 font-inter font-semibold text-base hover:opacity-90 transition-all duration-200"
                            >
                                {data?.buttonAction?.text || "¡Unirme!"}
                            </button>
                        </div>
                    </div>

                    {/* ── PANEL 2: Submenú Unirme ── */}
                    <div className="w-1/2 flex flex-col" style={{ minWidth: "50%" }}>
                        <nav className="flex-1 px-6 pt-8 pb-4 flex flex-col">
                            {/* Botón Volver al mismo nivel que los links */}
                            <button
                                onClick={backToMainMenu}
                                className="flex items-center gap-2 py-4 border-b border-gray-200 text-black font-inter font-semibold text-base hover:text-[#06869B] transition-colors"
                            >
                                <ChevronLeft size={16} className="text-gray-400" />
                                Volver
                            </button>

                            {data?.buttonAction?.children?.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={
                                        item.url.startsWith("http")
                                            ? item.url
                                            : `/${currentLanguage}/${item.url}`
                                    }
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-between py-4 border-b border-gray-200 text-black font-inter font-semibold text-base hover:text-[#06869B] transition-colors"
                                >
                                    <span>{item.text}</span>
                                    {item.url.startsWith("http") ? (
                                        <ExternalLink size={14} className="text-gray-400" />
                                    ) : (
                                        <ChevronLeft size={16} className="rotate-180 text-gray-400" />
                                    )}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
