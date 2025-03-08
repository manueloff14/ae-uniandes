"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { user, loading, hasToken } = useAuth();
    const router = useRouter();

    // Si ya terminó la carga y no hay usuario (no hay sesión iniciada),
    // no renderizamos nada.
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex">
            {/* Solo se muestra si hay sesión iniciada */}
            <AsideDashboard />

            {/* Contenido dinámico */}
            <main className="flex-1 mx-6 pl-[280px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <HeaderDashboard title={"Inicio"} user={user} />
                        {/* Aquí puedes agregar más contenido del dashboard */}
                    </div>
                )}
            </main>
        </div>
    );
}
