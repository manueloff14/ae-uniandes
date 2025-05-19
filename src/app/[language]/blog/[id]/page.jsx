"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import tocbot from "tocbot";
import Markdown from "markdown-to-jsx";
import rehypeSlug from "rehype-slug";
import "tocbot/dist/tocbot.css";

export default function BlogPage() {
    const { id } = useParams();
    const router = useRouter();

    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [locale, setLocale] = useState("en-US");
    const [timeZone, setTimeZone] = useState("UTC");

    // Detectar locale y timezone en el cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            setLocale(navigator.language || "en-US");
            setTimeZone(
                Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
            );
        }
    }, []);

    // 1) Trae el blog al montar
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/api/blog/${id}`)
            .then((res) => {
                if (res.ok) return res.json();
                if (res.status === 404) {
                    router.replace("/404");
                    throw new Error("No encontrado");
                }
                return res.json().then((j) => Promise.reject(j.error));
            })
            .then((data) => setBlog(data))
            .catch((err) => {
                if (err.message !== "No encontrado") {
                    setError(err.message || err);
                }
            });
    }, [id, router]);

    // 2) Inicializa tocbot luego de que el contenido ya esté en el DOM
    useEffect(() => {
        if (!blog) return;

        tocbot.init({
            tocSelector: ".js-toc",
            contentSelector: ".js-content",
            headingSelector: "h1, h2, h3, h4",
            collapseDepth: 2,
            ordered: true,
            headingTopOffset: 80,
        });

        return () => {
            tocbot.destroy();
        };
    }, [blog]);

    if (!id) return <p>Cargando identificador…</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!blog) return <p>Cargando blog…</p>;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    {/* Botón “Volver” */}
                    <button
                        onClick={() => router.push("/es")}
                        className="
                            absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2
                            flex items-center gap-1 sm:gap-2
                            bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A]
                            text-white
                            px-2 py-1 sm:px-4 sm:py-2
                            rounded-full font-serif
                        "
                    >
                        <img
                            className="h-5 sm:h-5 scale-x-[-1]"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZ0lEQVR4nO3WsQ2AMAxEUS9BBPtvQoMUqKBgnI+spKMljoB7C5x0si2biZgZMAMbkEILATLFERoODMBew09gUnhzqPZCAxcDSPW4uPXbwdzXa1ToY1RvU/xmep0fhV6vz9Ll2ZNXuwDGhWxO00J2+wAAAABJRU5ErkJggg=="
                            alt="volver"
                        />
                        <span className="hidden sm:inline text-xs sm:text-sm font-bold">
                            Volver al inicio
                        </span>
                    </button>

                    {/* Botón “¡Únirme ahora!” */}
                    <button
                        onClick={() => router.push("/es/fellowship")}
                        className="
                            absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2
                            flex items-center
                            bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A]
                            text-white
                            px-2 py-1 sm:px-4 sm:py-2
                            rounded-full font-serif
                        "
                    >
                        <span className="text-xs sm:text-sm font-bold">
                            ¡Únirme ahora!
                        </span>
                    </button>

                    {/* Logo + “Blog” siempre centrados */}
                    <div className="flex items-center justify-center">
                        <img
                            className="w-20 sm:w-36 md:w-[170px] flex-shrink-0"
                            src="/ae-logo-black.svg"
                            alt="Logo AE"
                        />
                        <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
                        <span className="hidden sm:inline-block text-lg font-bold font-serif">
                            Blog
                        </span>
                    </div>
                </div>
            </header>

            {/* Contenedor principal: padding-top para no solapar el header */}
            <div className="pt-20 w-full">
                <div className="w-full lg:max-w-5xl lg:mx-auto my-8 px-4 relative flex flex-col gap-6">
                    {/* TOC fijo solo en desktop */}
                    <aside className="w-full lg:fixed lg:top-[150px] lg:left-[calc(50%-36rem)] lg:w-[15%]">
                        <div className="js-toc toc" />
                    </aside>

                    {/* Contenido principal: full width en móvil, margen en desktop */}
                    <article className="js-content prose prose-lg max-w-none font-serif pt-8 lg:ml-[25%] w-full">
                        <h1>{blog.title}</h1>
                        <p className="text-sm text-gray-600">
                            <strong>
                                {blog.authors.length > 1
                                    ? "Autores"
                                    : blog.authors.length === 1
                                    ? "Autor"
                                    : "Autor desconocido"}
                                :
                            </strong>{" "}
                            {blog.authors.length
                                ? blog.authors.join(", ")
                                : "—"}
                        </p>
                        <p className="text-sm text-gray-500 italic mb-6">
                            Publicado:{" "}
                            {new Date(blog.created_at).toLocaleString(locale, {
                                timeZone,
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </p>
                        <hr className="mb-8 border-gray-200" />
                        <Markdown rehypePlugins={[rehypeSlug]}>
                            {blog.content}
                        </Markdown>
                    </article>
                </div>
            </div>
        </>
    );
}
