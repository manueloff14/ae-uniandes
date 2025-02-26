"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";

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
        <div className="min-h-screen bg-gray-800 flex">
            {/* Se renderiza el Aside y el contenido solo si existe token y usuario */}
            <AsideDashboard />

            <main className="flex-1 p-6 pl-[250px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <header className="py-5 flex items-center justify-between">
                            <h1 className="text-3xl font-extrabold">Configuración</h1>
                            <div className="flex gap-3">
                                <div className="flex items-center justify-center bg-[#111111] rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="55"
                                        height="55"
                                        viewBox="0 0 48 48"
                                        className="p-3 px-4"
                                    >
                                        <path
                                            d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="flex items-center gap-3 bg-[#111111] p-3 rounded-full">
                                    <div className="w-[30px] h-[30px] rounded-full">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-bold pr-1">
                                        {user.nombres} {user.apellidos}
                                    </span>
                                </div>
                            </div>
                        </header>
                        {/* Aquí puedes agregar más contenido del dashboard */}
                    </div>
                )}
            </main>
        </div>
    );
}
