"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

export default function BlogPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [featuredEditors, setFeaturedEditors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingEditors, setLoadingEditors] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-entries?pLevel=5`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar los blogs");
                }

                const data = await response.json();
                if (data.data && Array.isArray(data.data)) {
                    const formattedPosts = data.data.map((blog) => ({
                        id: blog.id,
                        documentId: blog.documentId,
                        votes: 0,
                        title: blog.title,
                        author: blog.authors?.[0]?.author?.name || "Autor desconocido",
                        date: blog.createdAt,
                    }));
                    setPosts(formattedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)));
                } else {
                    setError("No hay blogs disponibles");
                }
            } catch (err) {
                setError(`Error: ${err.message}`);
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Fetch editors/authors desde el API
    useEffect(() => {
        const fetchEditors = async () => {
            try {
                setLoadingEditors(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authors`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar los autores");
                }

                const data = await response.json();
                if (data.data && Array.isArray(data.data)) {
                    const formattedEditors = data.data.map((author) => ({
                        name: author.name,
                        image: `https://placehold.co/400x400/black/white?text=${author.name
                            ?.split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}&font=roboto`,
                        articlesCount: 0, // Puedes calcular esto desde los blogs si lo necesitas
                        bio: author.bio,
                    }));
                    setFeaturedEditors(formattedEditors);
                } else {
                    setFeaturedEditors([]);
                }
            } catch (err) {
                console.error("Error fetching editors:", err);
                setFeaturedEditors([]);
            } finally {
                setLoadingEditors(false);
            }
        };

        fetchEditors();
    }, []);

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

                {/* Mobile Menu Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 z-30 bg-[white] transition-opacity duration-300 ${
                        isMenuOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="lg:hidden absolute py-3 px-5 w-full ">
                        <div className="flex items-center justify-between gap-2 w-full">
                            <span className="text-lg font-semibold">Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`fixed top-16 left-0 right-0 bg-transparent max-h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ${
                            isMenuOpen ? "translate-y-0" : "-translate-y-full"
                        }`}
                    >
                        <div className="px-4 py-6 pt-2 space-y-4">
                            {/* Mobile Navigation */}
                            <nav className="space-y-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 p-4 px-5 rounded-full transition-all duration-300 ${
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
                                <button className="w-full bg-gradient-to-r from-[#18647E] to-[#08849A] hover:from-[#08849A] hover:to-[#0A9B8C] transition-all duration-300 text-white px-6 py-5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                                    ¡Únete ahora!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== LAYOUT PRINCIPAL (CON CAMBIOS) ===== */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
                        {/* ===== Columna Izquierda (Wrapper para Aside) ===== */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            {/* ✅ El aside ahora es sticky dentro de esta columna */}
                            <aside className="lg:sticky lg:top-0 space-y-6">
                                {/* Navigation - Hidden on all screens, only in mobile menu */}
                                <nav className="hidden lg:block">
                                    <ul className="space-y-2">
                                        {navLinks.map((link) => (
                                            <li key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-gray-700 font-medium hover:shadow-sm ${
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
                                        className="w-full h-[300px] border border-gray-200 rounded-xl shadow-md"
                                        frameBorder="0"
                                        allowFullScreen=""
                                        title="Calendario de Eventos"
                                    ></iframe>
                                </div>
                            </aside>
                        </div>

                        {/* ===== Section Central (Contenido Principal) ===== */}
                        <section className="col-span-1 lg:col-span-2 order-1">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-4">
                                Nuevos blogs
                            </h2>

                            {loading && (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18647E] mx-auto mb-4"></div>
                                    <p className="text-gray-600 font-medium">Cargando blogs...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-10">
                                {posts.map((post) => (
                                    <Link
                                        href={`/es/blog/${post.documentId}`}
                                        key={post.id}
                                    >
                                        <article className="group p-0 cursor-pointer transition-all duration-300">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 hidden">
                                                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br from-[#18647E] to-[#08849A] group-hover:text-white rounded-full flex items-center justify-center text-[#18647E] font-bold text-lg transition-all duration-300 transform group-hover:scale-110">
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
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* ===== Columna Derecha (Wrapper para Aside) ===== */}
                        <div className="lg:col-span-1 order-3">
                            {/* ✅ El aside ahora es sticky dentro de esta columna */}
                            <aside className="lg:sticky lg:top-0 space-y-6">
                                {/* Newsletter */}
                                <div className="hidden bg-gradient-to-br from-[#18647E] to-[#08849A] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                                            className="w-full px-4 py-3 border border-white/20 rounded-xl text-sm bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-white outline-none transition-all hover:border-white/40"
                                        />
                                        <button className="w-full bg-white text-[#18647E] font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                            Enviar
                                        </button>
                                    </div>
                                </div>

                                {/* Posts Más Votados */}
                                <div className="hidden">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Los más votados
                                    </h3>
                                    <div className="space-y-6">
                                        {posts
                                            .sort((a, b) => b.votes - a.votes)
                                            .slice(0, 3)
                                            .map((post) => (
                                                <div
                                                    key={post.id}
                                                    className="p-0 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                                >
                                                    <a
                                                        href="#"
                                                        className="text-gray-800 hover:text-[#18647E] hover:underline transition-all duration-300 block leading-relaxed font-medium text-sm"
                                                    >
                                                        {post.title.length > 60
                                                            ? post.title.substring(
                                                                  0,
                                                                  60
                                                              ) + "..."
                                                            : post.title}
                                                    </a>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <p className="text-xs text-gray-500 font-medium">
                                                            {post.votes}{" "}
                                                            {post.votes === 1
                                                                ? "voto"
                                                                : "votos"}
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
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                                >
                                                    <img
                                                        src={editor.image}
                                                        alt={editor.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="flex-1">
                                                        <a
                                                            href="#"
                                                            className="text-gray-700 hover:text-[#18647E] hover:underline transition-all duration-300 font-medium block"
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
