"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import tocbot from "tocbot";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

import "tocbot/dist/tocbot.css";

export default function BlogPage({ params }) {
    const router = useRouter();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDebug, setShowDebug] = useState(false); // 🔍 Debug toggle
    const [id, setId] = useState(null);

    // Extraer el ID de params de forma segura
    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-entries?filters[documentId][$eq]=${id}&pLevel=5`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar el blog");
                }

                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    const blogData = data.data[0];
                    setBlog({
                        title: blogData.title,
                        authors: blogData.authors
                            ? blogData.authors.map((a) => a.author.name)
                            : ["Autor desconocido"],
                        created_at: blogData.createdAt,
                        featured_image: blogData.image,
                        content:
                            blogData.content || "No hay contenido disponible.",
                    });
                } else {
                    setError("Blog no encontrado");
                }
            } catch (err) {
                setError(`Error: ${err.message}`);
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    useEffect(() => {
        if (blog) {
            setTimeout(() => {
                tocbot.init({
                    tocSelector: ".js-toc",
                    contentSelector: ".js-content",
                    headingSelector: "h2, h3, h4",
                    collapseDepth: 3,
                    orderedList: false,
                    activeLinkClass: "is-active-link",
                    listClass: "toc-list",
                    linkClass: "toc-link",
                    headingTopOffset: 120,
                });
            }, 100);
        }
        return () => tocbot.destroy();
    }, [blog]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18647E] mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                        Cargando artículo...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 font-medium text-lg mb-4">
                        {error || "No se pudo cargar el blog"}
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="bg-[#18647E] text-white px-6 py-2 rounded-full hover:bg-[#08849A] transition-all"
                    >
                        Volver atrás
                    </button>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(blog.created_at).toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <style jsx global>{`
                body {
                    background: #f8fafc;
                    font-family: "Inter", sans-serif;
                }
                * {
                    font-family: "Inter", sans-serif;
                }
                .toc-list {
                    list-style-type: none;
                    padding-left: 0;
                    margin: 0;
                }
                .toc-link {
                    display: block;
                    padding: 8px 0;
                    color: #4b5563;
                    text-decoration: none;
                    transition: all 0.2s ease-in-out;
                    font-size: 0.875rem;
                    border-left: 2px solid transparent;
                    padding-left: 1rem;
                }
                .toc-link:hover {
                    color: #18647e;
                }
                .is-active-link {
                    color: #18647e;
                    font-weight: 600;
                    border-left-color: #18647e;
                }
                .prose h2,
                .prose h3,
                .prose h4 {
                    scroll-margin-top: 120px;
                }
                
                .prose table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    font-size: 0.9rem;
                    overflow-x: auto;
                    display: block;
                }
                
                .prose thead {
                    background-color: #f3f4f6;
                }
                
                .prose th {
                    border: 1px solid #d1d5db;
                    padding: 0.75rem;
                    text-align: left;
                    font-weight: 600;
                    color: #111827;
                }
                
                .prose td {
                    border: 1px solid #e5e7eb;
                    padding: 0.75rem;
                    color: #374151;
                }
                
                .prose tbody tr:hover {
                    background-color: #f9fafb;
                }
                
                .prose table .katex {
                    font-size: 0.95em;
                }

                /* 🔍 Estilos para el debug panel */
                .debug-panel {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                
                .debug-content {
                    max-width: 600px;
                    max-height: 400px;
                    overflow: auto;
                    background: white;
                    border: 2px solid #18647e;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
            `}</style>

            <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                    <Link href="/es/blog" className="flex items-center gap-4">
                        <img
                            className="h-12 w-auto"
                            src="/ae-blog-logo.svg"
                            alt="Logo AE Uniandes"
                        />
                    </Link>

                    <div className="flex items-center gap-4"> 
                        <button
                            onClick={() => router.back()}
                            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-semibold text-sm"
                        >
                            <ArrowLeft size={18} />
                            Volver al Blog
                        </button>
                        <Link
                            target="_blank"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdKu9jUoggmJY4eTA7jCV9Up0_bqiDKw6WTemu07tNDyTvjJg/viewform?usp=send_form"
                            className="bg-gradient-to-r from-[#18647E] to-[#08849A] hover:from-[#08849A] hover:to-[#0A9B8C] transition-all text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            ¡Únete ahora!
                        </Link>
                    </div>
                </div>
            </header>

            {/* 🔍 Panel de Debug */}
            {showDebug && (
                <div className="debug-panel">
                    <div className="debug-content">
                        <h3 className="font-bold text-lg mb-2">🔍 Contenido Raw de Strapi:</h3>
                        <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap break-words">
                            {blog.content.substring(0, 2000)}...
                        </pre>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(blog.content);
                                alert('Contenido copiado al portapapeles!');
                            }}
                            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                            📋 Copiar todo el contenido
                        </button>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28">
                            <h3 className="ml-3 text-base font-bold text-gray-900 mb-4 tracking-wide uppercase">
                                En este artículo
                            </h3>
                            <div className="js-toc toc text-black"></div>
                        </div>
                    </aside>

                    <article className="lg:col-span-2 js-content">
                        <header className="mb-12">
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                                    {blog.title}
                                </h1>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-600 text-base">
                                <div className="flex items-center gap-4">
                                    <p className="font-semibold text-gray-800">{blog.authors.join(", ")}</p>
                                    <span className="hidden sm:inline text-gray-400">•</span>
                                </div>
                                <p className="text-gray-500">{formattedDate}</p>
                            </div>
                        </header>

                        {blog.featured_image && (
                            <figure className="mb-10">
                                <img
                                    src={blog.featured_image}
                                    alt={`Imagen destacada para ${blog.title}`}
                                    className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-lg"
                                />
                            </figure>
                        )}

                        <div className="mb-32 prose prose-base md:prose-lg max-w-none prose-a:text-[#18647E] prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-img:rounded-lg">
                            <ReactMarkdown
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex, rehypeSlug, rehypeRaw]}
                                components={{
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-6">
                                            <table {...props} />
                                        </div>
                                    ),
                                    code: ({ node, inline, className, children, ...props }) => {
                                        if (inline) {
                                            return <code className={className} {...props}>{children}</code>;
                                        }
                                        return (
                                            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                                                <code className={className} {...props}>{children}</code>
                                            </pre>
                                        );
                                    },
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-4 tracking-wide uppercase">
                                    {blog.authors.length > 1
                                        ? "Autores"
                                        : "Autor"}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`https://placehold.co/400x400/black/white?text=${blog.authors[0]
                                            ?.split(" ")
                                            .slice(0, 2)
                                            .map((w) => w[0])
                                            .join("")}&font=roboto`}
                                        alt={blog.authors[0]}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {blog.authors.join(", ")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Editor Principal
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full mt-6 flex items-center justify-center gap-2 text-gray-600 hover:text-white hover:bg-[#18647E] border border-gray-200 p-2.5 rounded-xl transition-colors font-semibold text-sm">
                                    <Share2 size={16} />
                                    <span>Compartir Artículo</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}