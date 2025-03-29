"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

// --- Componente principal ---
export default function MiembrosPanel() {
    const { user, loading } = useAuth();

    // Si no hay usuario, no renderizamos nada.
    if (!user) {
        return null;
    }

    return (
        <div>
            <AsideDashboard />

            <main className="flex-1 mx-6 pl-[280px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <HeaderDashboard title="Prueba" user={user} />

                        <div className="flex gap-6 mt-4">
                            {/* Sección izquierda: Tabla de miembros */}
                            <div className="w-2/3">
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
