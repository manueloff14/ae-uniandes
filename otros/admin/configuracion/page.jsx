"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

export default function ConfigPanel() {
    const { user, loading } = useAuth();

    // Mientras se cargan los datos, mostramos el spinner.
    /* if (loading) {
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
    } */

    // Si ya se cargó y no se obtuvo usuario, no renderizamos nada.
    if (!user) {
        return null;
    }

    return (
        <div className="">
            {/* Se renderiza el Aside y el contenido solo si existe token y usuario */}
            <AsideDashboard />

            <main className="flex-1 mx-6 pl-[250px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <HeaderDashboard title={"Configuración"} user={user} />
                        <div>
                            <div>

                            </div>
                            <div>
                                <span>Estadísticas</span>
                                
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
