"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Search,
    HomeIcon,
    Info,
    SquareChartGantt,
    Calendar,
    Images,
    Menu,
    X
} from "lucide-react";

// Mismos links que en blog/page.jsx
const navLinks = [
    { name: "Inicio", icon: HomeIcon, href: "/es/blog", current: false },
    {
        name: "Acerca de AE",
        icon: Info,
        href: "https://www.aeuniandes.com/es/acerca-de-ae",
        current: false,
    },
    {
        name: "Proyectos",
        icon: SquareChartGantt,
        href: "https://www.aeuniandes.com/es/proyectos",
        current: false,
    },
    {
        name: "Eventos",
        icon: Calendar,
        href: "https://www.aeuniandes.com/es/eventos",
        current: false,
    },
    {
        name: "Galería",
        icon: Images,
        href: "https://www.aeuniandes.com/es/galeria",
        current: false,
    },
];

export default function AuthorPage({ params: paramsPromise }) {
    // RESOLVIENDO ERROR DE NEXT 15 (params sync access violation)
    const params = use(paramsPromise);
    const router = useRouter();
    const id = params.id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch author details
                const authorRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authors?filters[documentId][$eq]=${id}&populate=*`
                );

                if (!authorRes.ok) throw new Error("Error al cargar el autor");

                const authorData = await authorRes.json();
                
                if (!authorData.data || authorData.data.length === 0) {
                    setError("Autor no encontrado");
                    setLoading(false);
                    return;
                }

                const authorInfo = authorData.data[0];
                
                // Extraemos la imagen
                const imgData = authorInfo.foto;
                const realImageUrl = imgData?.url 
                    ? (imgData.url.startsWith("http") ? imgData.url : `${process.env.NEXT_PUBLIC_API_URL}${imgData.url}`)
                    : null;
                const placeholderUrl = `https://placehold.co/1200x500/black/white?text=${authorInfo.name
                    ?.split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}&font=roboto`;

                setAuthor({
                    name: authorInfo.name,
                    bio: authorInfo.bio || "Editor en AE Uniandes",
                    image: realImageUrl || placeholderUrl,
                });

                // Fetch blogs
                const postsResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-entries?pLevel=5`
                );

                if (!postsResponse.ok) throw new Error("Error al cargar los blogs");

                const postsData = await postsResponse.json();
                
                let formattedPosts = [];
                if (postsData.data && Array.isArray(postsData.data)) {
                    formattedPosts = postsData.data
                        .filter(blog => {
                            const autoresDeBlog = blog.authors?.map(a => a.author?.name) || [];
                            return autoresDeBlog.includes(authorInfo.name);
                        })
                        .map((blog) => ({
                            id: blog.id,
                            documentId: blog.documentId,
                            title: blog.title,
                            date: blog.createdAt,
                        }))
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
                }

                setPosts(formattedPosts);

            } catch (err) {
                setError(`Error: ${err.message}`);
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const formatRelativeTime = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMs = now - postDate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return "ahora mismo";
        if (diffInMinutes < 60) return `hace ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
        if (diffInHours < 24) return `hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
        if (diffInDays < 7) return `hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`;
        const weeks = Math.floor(diffInDays / 7);
        if (weeks < 4) return `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
        const months = Math.floor(diffInDays / 30);
        return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
    };

    const filteredPosts = posts.filter(
        (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <style jsx global>{`
                body {
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    color: black;
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 lg:h-20">
                            <div className="flex-shrink-0">
                                <Link href="/es/blog">
                                    <img
                                        className="h-8 lg:h-12 w-auto transition-all duration-300"
                                        src="/ae-blog-logo.svg"
                                        alt="Logo AE Uniandes"
                                    />
                                </Link>
                            </div>

                            <div className="hidden md:flex flex-1 max-w-2xl mx-8 gap-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => window.history.back()}
                                        className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={() => window.history.forward()}
                                        className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                                <div className="w-full flex items-center gap-2 px-4 bg-gray-100 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-[#18647E] focus-within:border-[#18647E] transition-all">
                                    <Search color="gray" size={18} />
                                    <input
                                        className="p-2 py-2.5 w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                        type="text"
                                        placeholder="Buscar artículo..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <button
                                    onClick={() =>
                                        window.open(
                                            "https://docs.google.com/forms/d/e/1FAIpQLSdKu9jUoggmJY4eTA7jCV9Up0_bqiDKw6WTemu07tNDyTvjJg/viewform?usp=send_form",
                                            "_blank"
                                        )
                                    }
                                    className="bg-[#18647E] hover:bg-[#08849A] transition-colors duration-300 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md"
                                >
                                    ¡Únete ahora!
                                </button>
                            </div>

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

                        <div className="md:hidden pb-4">
                            <div className="w-full flex items-center gap-2 px-4 bg-gray-100 border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-[#18647E] focus-within:border-[#18647E] transition-all">
                                <Search color="gray" size={18} />
                                <input
                                    className="p-2 py-2.5 w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div
                    className={`lg:hidden fixed inset-0 z-30 bg-white transition-opacity duration-300 ${
                        isMenuOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="lg:hidden absolute py-3 px-5 w-full">
                        <div className="flex items-center justify-between gap-2 w-full">
                            <span className="text-lg font-semibold">Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`fixed top-16 left-0 right-0 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ${
                            isMenuOpen ? "translate-y-0" : "-translate-y-full"
                        }`}
                    >
                        <div className="px-4 py-6 pt-2 space-y-4">
                            <nav className="space-y-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 p-4 px-5 rounded-full transition-all duration-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        <link.icon size={20} />
                                        <span className="font-medium">
                                            {link.name}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={() =>
                                        window.open(
                                            "https://docs.google.com/forms/d/e/1FAIpQLSdKu9jUoggmJY4eTA7jCV9Up0_bqiDKw6WTemu07tNDyTvjJg/viewform?usp=send_form",
                                            "_blank"
                                        )
                                    }
                                    className="w-full bg-[#18647E] hover:bg-[#08849A] transition-colors duration-300 text-white px-6 py-5 rounded-full font-semibold text-sm"
                                >
                                    ¡Únete ahora!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
                        {/* ===== Columna Izquierda (Barra lateral) ===== */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <aside className="lg:sticky lg:top-0 space-y-6">
                                <nav className="hidden lg:block">
                                    <ul className="space-y-2">
                                        {navLinks.map((link) => (
                                            <li key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-gray-700 font-medium hover:bg-gray-100`}
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
                                
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Eventos Importantes
                                    </h3>
                                    <iframe
                                        src="https://lu.ma/embed/calendar/cal-UNNJDLVBWrEroMd/events?past=true"
                                        className="w-full h-[350px] border border-gray-200 rounded-xl shadow-md"
                                        frameBorder="0"
                                        allowFullScreen=""
                                        title="Calendario de Eventos"
                                    ></iframe>
                                </div>
                            </aside>
                        </div>

                        {/* ===== Section Central (Contenido Principal) ===== */}
                        <section className="col-span-1 lg:col-span-3 order-1">
                            {loading && (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18647E] mx-auto mb-4"></div>
                                    <p className="text-gray-600 font-medium">Cargando perfil...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && author && (
                                <div className="space-y-6">
                                    <div className="mb-12 relative rounded-3xl overflow-hidden shadow-md group">
                                        <img
                                            src={author.image}
                                            alt={author.name}
                                            className="w-full h-72 md:h-96 object-cover"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-10 pt-24">
                                            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-md">{author.name}</h1>
                                            <p className="text-gray-200 text-lg md:text-xl font-medium mb-4 drop-shadow-sm">{author.bio}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-white">{posts.length}</span>
                                                <span className="text-gray-300 font-medium tracking-wide uppercase text-sm">artículos publicados</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-2">
                                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                            Artículos de {author.name}
                                        </h2>

                                        <div className="space-y-8">
                                            {filteredPosts.map((post) => (
                                                <Link href={`/es/blog/${post.documentId}`} key={post.id}>
                                                    <article className="group p-0 cursor-pointer transition-all duration-300 pb-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#18647E] transition-colors duration-300 line-clamp-2">
                                                                    {post.title}
                                                                </h3>
                                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                                    <span className="font-medium text-[#18647E]">{author.name}</span>
                                                                    <span>•</span>
                                                                    <span>{formatRelativeTime(post.date)}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </Link>
                                            ))}
                                            
                                            {filteredPosts.length === 0 && posts.length > 0 && (
                                                <p className="text-gray-500 py-8">
                                                    No se encontraron resultados para "{searchTerm}"
                                                </p>
                                            )}

                                            {posts.length === 0 && (
                                                <p className="text-gray-500 py-8">
                                                    Este autor aún no ha publicado artículos.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
