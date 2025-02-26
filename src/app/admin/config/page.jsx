"use client";

import { useAuth } from "@/app/hooks/useAuth";
import HeaderDashboard from "@/components/global/HeaderDashboard";

export default function ConfigPanel() {
    const { user, loading } = useAuth();

    // Si ya terminó la carga y no hay usuario, evitamos renderizar propiedades de null.
    if (!loading && !user) {
        return (
            <div className="min-h-screen bg-gray-800 flex">
                {/* Barra lateral */}
                <HeaderDashboard />

                {/* Contenido dinámico */}
                <main className="flex-1 p-6 pl-[250px]">
                    <div className="text-white text-center">
                        Redirigiendo...
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-800 flex">
            {/* Header siempre visible */}
            <HeaderDashboard />

            {/* Contenido dinámico */}
            <main className="flex-1 p-6 pl-[250px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl text-white mb-4">
                            Configuración para {user.nombres} {user.apellidos}
                        </h2>
                        <div className="text-gray-300">
                            <p>
                                <strong>Correo:</strong> {user.correo}
                            </p>
                            {/* Aquí puedes agregar más opciones de configuración */}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
