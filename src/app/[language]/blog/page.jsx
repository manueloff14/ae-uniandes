"use client";

import { useState } from "react";
import {
    Grid2x2,
    HomeIcon,
    Search,
    Archive,
    Users,
    Phone,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// --- DATOS DE EJEMPLO (Sin cambios) ---
const navLinks = [
    { name: "Inicio", icon: HomeIcon, href: "#", current: true },
    { name: "Categorías", icon: Grid2x2, href: "#", current: false },
    { name: "Archivo", icon: Archive, href: "#", current: false },
    { name: "Sobre los autores", icon: Users, href: "#", current: false },
    { name: "Contacto", icon: Phone, href: "#", current: false },
];

const featuredEditors = [
    {
        name: "Jose Gelves",
        image: "/img/coordinadores/camilo_eduardo_castro.jpg",
        articlesCount: 24,
    },
    {
        name: "Vicente Gelves",
        image: "/img/coordinadores/santiago_ramirez.jpg",
        articlesCount: 18,
    },
    {
        name: "Camilo Eduardo Castro",
        image: "/img/coordinadores/camilo_eduardo_castro.jpg",
        articlesCount: 24,
    },
    {
        name: "Camilo Eduardo Castro",
        image: "/img/coordinadores/camilo_eduardo_castro.jpg",
        articlesCount: 24,
    },
];

const posts = [
    {
        id: 5,
        votes: 3,
        title: "AI Safety Research: New Breakthroughs in Alignment",
        author: "Dr. Sarah Chen",
        date: "2025-09-16T09:00:00Z",
    },
    {
        id: 1,
        votes: 1,
        title: "Open thread: April - June 2025",
        author: "Toby Tremlett",
        date: "2025-09-15T10:30:00Z",
    },
    {
        id: 3,
        votes: 1,
        title: "PauseAI US is looking for local group leads",
        author: "Toby Tremlett",
        date: "2025-09-15T14:45:00Z",
    }
].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function BlogPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para formatear fechas relativas (Sin cambios)
    const formatRelativeTime = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMs = now - postDate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return "ahora mismo";
        if (diffInMinutes < 60)
            return `hace ${diffInMinutes} ${
                diffInMinutes === 1 ? "minuto" : "minutos"
            }`;
        if (diffInHours < 24)
            return `hace ${diffInHours} ${
                diffInHours === 1 ? "hora" : "horas"
            }`;
        if (diffInDays < 7)
            return `hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`;
        const weeks = Math.floor(diffInDays / 7);
        if (weeks < 4)
            return `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
        const months = Math.floor(diffInDays / 30);
        return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
    };

    return (
        <>
            <style jsx global>{`
                body {
                    background: linear-gradient(
                        135deg,
                        #f8fafc 0%,
                        #e2e8f0 100%
                    );
                    color: black;
                    font-family: "Inter", -apple-system, BlinkMacSystemFont,
                        "Segoe UI", Roboto, sans-serif;
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* ===== HEADER (Sin cambios) ===== */}
                <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 lg:h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <img
                                    className="h-8 lg:h-12 w-auto transition-all duration-300"
                                    src="/ae-blog-logo.svg"
                                    alt="Logo AE Uniandes"
                                />
                            </div>

                            {/* Search Bar - Desktop */}
                            <div className="hidden md:flex flex-1 max-w-2xl mx-8 gap-2">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300">
                                        <ChevronLeft />
                                    </button>
                                    <button className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300">
                                        <ChevronRight />
                                    </button>
                                </div>
                                <div className="w-full flex items-center gap-2 px-4 bg-gray-100 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-[#18647E] focus-within:border-[#18647E] transition-all">
                                    <Search color="gray" size={18} />
                                    <input
                                        className="p-2 py-2.5 w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                        type="text"
                                        placeholder="Buscar artículo, autor o categoría..."
                                    />
                                </div>
                            </div>

                            {/* Desktop Login Button */}
                            <div className="hidden lg:block">
                                <button className="bg-gradient-to-r from-[#18647E] to-[#08849A] hover:from-[#08849A] hover:to-[#0A9B8C] transition-all duration-300 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                                    ¡Únete ahora!
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                                >
                                    {isMenuOpen ? (
                                        <X size={24} />
                                    ) : (
                                        <Menu size={24} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Search Bar */}
                        <div className="md:hidden pb-4">
                            <div className="w-full flex items-center gap-2 px-4 bg-gray-100 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-[#18647E] focus-within:border-[#18647E] transition-all">
                                <Search color="gray" size={18} />
                                <input
                                    className="p-2 py-2.5 w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                    type="text"
                                    placeholder="Buscar..."
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay (Sin cambios) */}
                {isMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="fixed top-16 left-0 right-0 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
                            <div className="px-4 py-6 space-y-4">
                                {/* Mobile Navigation */}
                                <nav className="space-y-2">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                                                link.current
                                                    ? "bg-gradient-to-r from-[#18647E] to-[#08849A] text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            <link.icon size={20} />
                                            <span className="font-medium">
                                                {link.name}
                                            </span>
                                        </a>
                                    ))}
                                </nav>

                                {/* Mobile Login Button */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button className="w-full bg-gradient-to-r from-[#18647E] to-[#08849A] hover:from-[#08849A] hover:to-[#0A9B8C] transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl">
                                        ¡Únete ahora!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== LAYOUT PRINCIPAL (CON CAMBIOS) ===== */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* ===== Columna Izquierda (Wrapper para Aside) ===== */}
                        <div className="hidden lg:block lg:col-span-1">
                            {/* ✅ El aside ahora es sticky dentro de esta columna */}
                            <aside className="sticky top-0 space-y-6">
                                {/* Navigation */}
                                <nav>
                                    <ul className="space-y-2">
                                        {navLinks.map((link) => (
                                            <li key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-gray-700 font-medium ${
                                                        link.current
                                                            ? "bg-gradient-to-r from-[#18647E] to-[#08849A] text-white"
                                                            : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <link.icon size={18} />
                                                    <span className="text-sm">
                                                        {link.name}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Eventos */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Eventos Importantes
                                    </h3>
                                    <iframe
                                        src="https://lu.ma/embed/calendar/cal-UNNJDLVBWrEroMd/events?past=true"
                                        className="w-full h-[300px] border border-gray-200 rounded-xl"
                                        frameBorder="0"
                                        allowFullScreen=""
                                        title="Calendario de Eventos"
                                    ></iframe>
                                </div>
                            </aside>
                        </div>

                        {/* ===== Section Central (Contenido Principal) ===== */}
                        <section className="col-span-1 lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-4">
                                Nuevos blogs
                            </h2>

                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="group p-6 px-0 cursor-pointer transition-all duration-300 hover:border-[#18647E]"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br from-[#18647E] to-[#08849A] group-hover:text-white rounded-full flex items-center justify-center text-[#18647E] font-bold text-lg transition-all duration-300">
                                                    {post.votes}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#18647E] transition-colors duration-300 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {post.author}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {formatRelativeTime(
                                                            post.date
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* ===== Columna Derecha (Wrapper para Aside) ===== */}
                        <div className="hidden lg:block lg:col-span-1">
                            {/* ✅ El aside ahora es sticky dentro de esta columna */}
                            <aside className="sticky top-0 space-y-6">
                                {/* Newsletter */}
                                <div className="bg-gradient-to-br from-[#18647E] to-[#08849A] p-6 rounded-2xl text-white shadow-lg">
                                    <h3 className="text-xl font-bold mb-2">
                                        Suscríbete al Newsletter
                                    </h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        Mantente al tanto de las últimas
                                        noticias de la comunidad.
                                    </p>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Tu correo electrónico"
                                            className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-white outline-none transition-all"
                                        />
                                        <button className="w-full bg-white text-[#18647E] font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
                                            Enviar
                                        </button>
                                    </div>
                                </div>

                                {/* Posts Más Votados */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Los más votados
                                    </h3>
                                    <div className="space-y-4">
                                        {posts
                                            .sort((a, b) => b.votes - a.votes)
                                            .slice(0, 3)
                                            .map((post) => (
                                            <div key={post.id}>
                                                <a
                                                    href="#"
                                                    className="text-gray-800 hover:text-[#18647E] transition-colors block leading-relaxed font-medium text-sm"
                                                >
                                                    {post.title.length > 60
                                                        ? post.title.substring(
                                                              0,
                                                              60
                                                          ) + "..."
                                                        : post.title}
                                                </a>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-xs text-gray-500">
                                                        {post.votes} {post.votes === 1 ? 'voto' : 'votos'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Editores */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Editores destacados
                                    </h3>
                                    <div className="space-y-4">
                                        {featuredEditors.map(
                                            (editor, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3"
                                                >
                                                    <img
                                                        src={editor.image}
                                                        alt={editor.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                                    />
                                                    <div className="flex-1">
                                                        <a
                                                            href="#"
                                                            className="text-gray-700 hover:text-[#18647E] transition-colors font-medium block"
                                                        >
                                                            {editor.name}
                                                        </a>
                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                editor.articlesCount
                                                            }{" "}
                                                            artículos publicados
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
