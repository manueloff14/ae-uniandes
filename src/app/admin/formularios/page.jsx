"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminFormularios() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [forms, setForms] = useState({});
    const [loadingForms, setLoadingForms] = useState(true);
    const [errorForms, setErrorForms] = useState(null);

    // 1) Cargar formularios
    useEffect(() => {
        if (!user) return;

        setLoadingForms(true);
        fetch("http://localhost:5000/api/obtener-formularios")
            .then((res) => {
                if (!res.ok)
                    throw new Error("Error al obtener los formularios");
                return res.json();
            })
            .then((data) => {
                setForms(data);
                setLoadingForms(false);
            })
            .catch((err) => {
                console.error(err);
                setErrorForms(err.message);
                setLoadingForms(false);
            });
    }, [user]);

    // 2) Handler para eliminar
    const handleDelete = async (formId) => {
        const confirmed = confirm(
            "¿Estás seguro de que quieres eliminar este formulario?"
        );
        if (!confirmed) return;

        try {
            const res = await fetch("http://localhost:5000/api/eliminar-form", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ form_id: formId }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Error al eliminar");
            }

            // 3) Actualizar UI removiendo el formulario borrado
            setForms((prev) => {
                const copy = { ...prev };
                delete copy[formId];
                return copy;
            });
        } catch (err) {
            console.error("❌ Error al eliminar formulario:", err);
            alert("No se pudo eliminar el formulario: " + err.message);
        }
    };

    // 4) Control de loading y auth
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-white text-xl">Cargando...</p>
            </div>
        );
    }
    if (!user) {
        router.push("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex">
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Formularios" user={user} />

                <div className="pt-36 pb-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-xl text-black font-serif">
                                ¡Hola, {user.nombres}!
                            </h2>
                            <span className="text-sm text-gray-600 font-serif">
                                Consulta y administra los formularios
                                disponibles en tu cuenta
                            </span>
                        </div>
                        <button
                            onClick={() =>
                                router.push("/admin/formularios/crear")
                            }
                            className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-4 py-3 rounded-full flex items-center gap-2 font-bold font-serif text-sm"
                        >
                            {/* icono + */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M23.97 4.97A2 2 0 0022 7V22H7a2 2 0 100 4h15v15a2 2 0 104 0V26h15a2 2 0 100-4H26V7a2 2 0 00-2.03-2.03z"
                                    fill="white"
                                />
                            </svg>
                            Nuevo formulario
                        </button>
                    </div>

                    <hr className="my-4" />

                    {loadingForms ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-500">
                                Cargando formularios...
                            </p>
                        </div>
                    ) : errorForms ? (
                        <p className="text-red-600">Error: {errorForms}</p>
                    ) : (
                        <ul className="space-y-4">
                            {Object.entries(forms).map(([id, form]) => (
                                <li
                                    key={id}
                                    className="p-4 border-2 border-[#ebebeb] rounded-2xl flex items-center justify-between hover:border-[#bebebe]"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">
                                            {form.titulo}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            ID: {id}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Creado el:{" "}
                                            {new Date(
                                                form.created_at
                                            ).toLocaleString("es-CO")}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        {/* Botón de estadísticas (si lo necesitas) */}
                                        <button className="flex items-center gap-2 bg-[#ececec] p-2 rounded-xl hover:border-[#c9c9c9]">
                                            <img
                                                className="w-[20px]"
                                                src="data:image/png;base64,..."
                                                alt="stats"
                                            />
                                        </button>
                                        {/* Botón de editar */}
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/admin/formularios/editar/${id}`
                                                )
                                            }
                                            className="flex items-center gap-2 bg-[#ececec] p-2 px-3 rounded-xl hover:border-[#c9c9c9] text-black"
                                        >
                                            <img
                                                className="w-[15px]"
                                                src="data:image/png;base64,..."
                                                alt="edit"
                                            />
                                            Editar
                                        </button>
                                        {/* Botón de eliminar */}
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className="flex items-center gap-2 bg-red-600 p-2 px-3 rounded-xl text-white hover:border-[#ffb3b3] border-2 border-transparent"
                                        >
                                            <img
                                                className="w-[15px]"
                                                src="data:image/png;base64,..."
                                                alt="trash"
                                            />
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}
