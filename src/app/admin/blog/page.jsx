"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogPanel() {
    const router = useRouter();

    const { user, loading } = useAuth();
    const [blogs, setBlogs] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "http://localhost:5000/api/obtener-blogs"
                );

                if (!response.ok) {
                    throw new Error("Error al obtener los blogs");
                }

                const data = await response.json();
                setBlogs(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar blogs:", err);
                setError("No se pudieron cargar los blogs");
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchBlogs();
        }
    }, [user]);

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex">
                <AsideDashboard />
                <main className="flex-1 p-6 pl-[250px]">
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    // Convertir objeto de blogs a un array para facilitar el mapeo
    const blogsArray = blogs
        ? Object.entries(blogs).map(([id, blog]) => ({ id, ...blog }))
        : [];

    return (
        <div>
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Blog" user={user} />

                <div className="text-black space-y-8 pt-32">
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-2xl font-bold font-serif">
                                    Tus blogs
                                </h2>
                                <p className="text-sm text-gray-500 font-serif">
                                    Aquí podrás gestionar tus blogs
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        router.push("/admin/blog/redactar")
                                    }
                                    className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-4 py-3 rounded-full flex items-center gap-2 font-bold font-serif text-sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M23.970703 4.9726562A2.0002 2.0002 0 0 0 22 7L22 22L7 22A2.0002 2.0002 0 1 0 7 26L22 26L22 41A2.0002 2.0002 0 1 0 26 41L26 26L41 26A2.0002 2.0002 0 1 0 41 22L26 22L26 7A2.0002 2.0002 0 0 0 23.970703 4.9726562z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                    Nuevo blog
                                </button>
                            </div>
                        </div>

                        {/* Blog list */}
                        <div className="mt-8">
                            {error && (
                                <p className="text-red-500 text-center py-4">
                                    {error}
                                </p>
                            )}

                            {blogsArray.length === 0 && !error ? (
                                <p className="text-gray-500 text-center py-4">
                                    No hay blogs disponibles
                                </p>
                            ) : (
                                <div className="space-y-4 bg-gray-100 px-4 py-2 rounded-xl">
                                    <table className="w-full border-separate border-spacing-0">
                                        <thead>
                                            <tr className="font-medium text-gray-500 pb-2 border-b-2 border-gray-50 last:border-transparent">
                                                <th className="px-4 pl-0 py-2 text-left">
                                                    Título
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Autor
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Fecha
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Estado
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogsArray.map((blog) => (
                                                <tr
                                                    key={blog.id}
                                                    className="border-b border-gray-100"
                                                >
                                                    <td className="px-4 pl-0 py-2 max-w-[500px]">
                                                        <h3 className="font-medium">
                                                            {blog.title}
                                                        </h3>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {blog.authors &&
                                                            blog.authors.join(
                                                                ", "
                                                            )}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {blog.created_at
                                                            ? new Date(
                                                                  blog.created_at
                                                              ).toLocaleString(
                                                                  "es-CO",
                                                                  {
                                                                      timeZone:
                                                                          "America/Bogota",
                                                                  }
                                                              )
                                                            : "N/A"}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded-full ${
                                                                !blog.published
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                        >
                                                            {!blog.published
                                                                ? "Publicado"
                                                                : "Borrador"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 flex space-x-2">
                                                        <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                                                            Editar
                                                        </button>
                                                        <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
