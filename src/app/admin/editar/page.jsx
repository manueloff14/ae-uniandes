"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

export default function EditarPanel() {
    const { user, loading } = useAuth();

    if (loading) {
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

    if (!user) {
        return null;
    }

    return (
        <div>
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Editar" user={user} />

                <div className="mt-6 text-white space-y-8">
                    {/* Título principal */}
                    <h2 className="text-3xl font-bold">
                        Gestión de Contenidos
                    </h2>

                    {/* Card de idiomas */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <header className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">
                                Idiomas Disponibles
                            </h3>
                            <button
                                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
                                onClick={() =>
                                    alert("Función para añadir un nuevo idioma")
                                }
                            >
                                Añadir idioma
                            </button>
                        </header>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Idioma 1 */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">en</h4>
                                <p className="text-sm text-gray-300">Inglés</p>
                            </div>
                            {/* Idioma 2 */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">es</h4>
                                <p className="text-sm text-gray-300">Español</p>
                            </div>
                            {/* Idioma 3 */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">fr</h4>
                                <p className="text-sm text-gray-300">Francés</p>
                            </div>
                            {/* Agrega más tarjetas de idiomas según necesites */}
                        </div>
                    </section>

                    {/* Card de secciones */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">
                            Secciones Disponibles
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Sección: Home */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Home</h4>
                                <p className="text-sm text-gray-300">
                                    Sección principal de la página.
                                </p>
                            </div>
                            {/* Sección: Acerca de AE */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Acerca de AE</h4>
                                <p className="text-sm text-gray-300">
                                    Información sobre AE Uniandes.
                                </p>
                            </div>
                            {/* Sección: Eventos */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Eventos</h4>
                                <p className="text-sm text-gray-300">
                                    Calendario y próximos eventos.
                                </p>
                            </div>
                            {/* Sección: Proyectos */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Proyectos</h4>
                                <p className="text-sm text-gray-300">
                                    Listado de proyectos destacados.
                                </p>
                            </div>
                            {/* Sección: Header */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Header</h4>
                                <p className="text-sm text-gray-300">
                                    Configuración del encabezado.
                                </p>
                            </div>
                            {/* Sección: Footer */}
                            <div className="bg-gray-700 p-4 rounded shadow flex flex-col">
                                <h4 className="font-bold">Footer</h4>
                                <p className="text-sm text-gray-300">
                                    Configuración del pie de página.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
