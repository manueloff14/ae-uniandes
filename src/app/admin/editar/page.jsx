"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import Link from "next/link";

// Función que devuelve la ruta de la bandera según el código del idioma
function getFlagURL(code) {
    switch (code) {
        case "en":
            return "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg";
        case "es":
            return "https://laflamencadeborgona.es/cdn/shop/articles/Bandera-Espana-La-Flamenca-de-Borgona_-Bandera-de-Espana_-Cruz-de-Borgona_-Patricia-Munoz_-VOX_-Santiago-Abascal--1685742924_7e67cc76-acee-43fc-9a43-5e0fc0b59a19.png?v=1685744221";
        case "fr":
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png";
        // Agrega aquí más casos según tus idiomas
        default:
            return "/images/flags/default.png";
    }
}

export default function EditarPanel() {
    const { user, loading } = useAuth();
    const [idiomas, setIdiomas] = useState({});
    const [selectedLang, setSelectedLang] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    // Obtener la lista de idiomas (y sus rutas) desde el backend
    const fetchIdiomas = async () => {
        setLoadingData(true);
        const startTime = Date.now(); // Tomamos el tiempo inicial

        try {
            const res = await fetch("http://localhost:5000/obtener-data");
            const data = await res.json();
            setIdiomas(data || {});
        } catch (error) {
            console.error("Error al obtener idiomas:", error);
        } finally {
            const endTime = Date.now();
            const elapsed = endTime - startTime;
            const minTime = 1000; // 0.5 segundos

            // Solo añadimos el "delay" si la carga fue menor a 0.5s.
            if (elapsed < minTime) {
                await new Promise((resolve) =>
                    setTimeout(resolve, minTime - elapsed)
                );
            }

            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchIdiomas();
    }, []);

    // Seleccionar automáticamente el primer idioma al cargar
    useEffect(() => {
        if (!loadingData && Object.keys(idiomas).length > 0) {
            setSelectedLang(Object.keys(idiomas)[0]);
        }
    }, [idiomas, loadingData]);

    // Agregar un nuevo idioma mediante la API /crear-idioma
    const handleAddIdioma = async () => {
        const code = prompt("Ingrese el código del idioma (ej: en, es, fr):");
        if (!code) return;
        const name = prompt("Ingrese el nombre del idioma:");
        if (!name) return;

        const idioma = { code, name };
        try {
            const res = await fetch("http://localhost:5000/crear-idioma", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(idioma),
            });
            if (res.ok) {
                alert("Idioma creado exitosamente");
                fetchIdiomas();
            } else {
                alert("Error al crear el idioma");
            }
        } catch (error) {
            console.error("Error al crear idioma:", error);
        }
    };

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
                <HeaderDashboard
                    title="Editar"
                    user={user}
                    selectedLang={selectedLang}
                />

                <div className="text-white space-y-8 mt-6">
                    {/* Sección de idiomas y rutas en forma de "tabs" */}
                    <section className="">
                        <header className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-black font-serif">
                                    Idiomas Disponibles
                                </h3>
                                <p className="text-black text-sm font-serif mt-1">
                                    Agrega idiomas con código y nombre (ej: en,
                                    Inglés). Las banderas se asignan
                                    automáticamente vía API.
                                </p>
                            </div>
                            <button
                                className="flex items-center gap-2 text-sm font-bold font-serif px-4 py-3 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white rounded-full "
                                onClick={handleAddIdioma}
                            >
                                Añadir idioma
                                <img
                                    className="w-[20px]"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOElEQVR4nGNgGAXUBP+hgKqGIoNRCwiC/6NxQPMg+k8lwDBgFhAC/yk1YNQCisH/0TgY8CAamQAAPIgPAFHCvP0AAAAASUVORK5CYII="
                                    alt="plus-math--v1"
                                />
                            </button>
                        </header>

                        {loadingData ? (
                            <div className="flex justify-center items-center py-32">
                                <div className="flex flex-col items-center gap-4">
                                    {/* Spinner */}
                                    <div className="w-12 h-12 border-4 border-black border-dotted rounded-full animate-spin"></div>
                                    <p className="text-gray-600 font-serif">
                                        Cargando idiomas...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {Object.keys(idiomas).length === 0 ? (
                                    <p>No hay idiomas disponibles.</p>
                                ) : (
                                    <div>
                                        {/* Tabs de idiomas */}
                                        <div className="flex space-x-4 mb-4">
                                            {Object.entries(idiomas).map(
                                                ([code, langData]) => {
                                                    // Obtenemos la URL de la bandera a partir del código
                                                    const flagURL =
                                                        getFlagURL(code);

                                                    return (
                                                        <button
                                                            key={code}
                                                            onClick={() =>
                                                                setSelectedLang(
                                                                    code
                                                                )
                                                            }
                                                            className={`px-6 py-4 rounded-3xl flex items-center ${
                                                                selectedLang ===
                                                                code
                                                                    ? "bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white"
                                                                    : "bg-[#e9e9e9] hover:bg-[#d1d1d1] text-black"
                                                            }`}
                                                        >
                                                            {/* Bandera del idioma */}
                                                            <div className="h-[30px] w-[30px] mr-3">
                                                                <img
                                                                    src={
                                                                        flagURL
                                                                    }
                                                                    alt="Placeholder"
                                                                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                                                                />
                                                            </div>
                                                            {/* Nombre + Código */}
                                                            <span className="text-xs font-serif">
                                                                {langData.code}
                                                            </span>
                                                            <div
                                                                className={`w-[2px] h-full mx-3 ${
                                                                    selectedLang ===
                                                                    code
                                                                        ? "bg-[#d1d1d1]"
                                                                        : "bg-[#242424]"
                                                                }`}
                                                            ></div>
                                                            <span className="font-bold font-serif">
                                                                {langData.name}{" "}
                                                            </span>
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {/* Contenido del idioma seleccionado */}
                                        {selectedLang && (
                                            <div className="text-black">
                                                {/* Aquí se muestran las rutas en forma de botones/enlaces */}
                                                <div className="flex flex-row gap-3 mt-4">
                                                    {idiomas[selectedLang]
                                                        ?.rutas &&
                                                        Object.entries(
                                                            idiomas[
                                                                selectedLang
                                                            ].rutas
                                                        ).map(
                                                            ([
                                                                rutaKey,
                                                                rutaData,
                                                            ]) => (
                                                                <Link
                                                                    href={`editar/${selectedLang}/${rutaKey
                                                                        // Convertir a minúsculas
                                                                        .toLowerCase()
                                                                        // Reemplazar vocales acentuadas por su versión sin tilde
                                                                        .replace(
                                                                            /[áéíóúàèìòù]/g,
                                                                            (
                                                                                match
                                                                            ) => {
                                                                                const map =
                                                                                    {
                                                                                        á: "a",
                                                                                        é: "e",
                                                                                        í: "i",
                                                                                        ó: "o",
                                                                                        ú: "u",
                                                                                        à: "a",
                                                                                        è: "e",
                                                                                        ì: "i",
                                                                                        ò: "o",
                                                                                        ù: "u",
                                                                                    };
                                                                                return (
                                                                                    map[
                                                                                        match
                                                                                    ] ||
                                                                                    match
                                                                                );
                                                                            }
                                                                        )
                                                                        // Reemplazar espacios por guiones
                                                                        .replace(
                                                                            /\s+/g,
                                                                            "-"
                                                                        )
                                                                        // Eliminar caracteres especiales excepto ñ y el guion
                                                                        .replace(
                                                                            /[^a-z0-9ñ-]/g,
                                                                            ""
                                                                        )}`}
                                                                    className="w-full"
                                                                >
                                                                    <div
                                                                        key={
                                                                            rutaKey
                                                                        }
                                                                        className="bg-gray-100 rounded-3xl p-4 w-full flex flex-col gap-1"
                                                                    >
                                                                        <span className="font-bold hover:underline font-serif">
                                                                            {rutaData.title ||
                                                                                rutaKey}
                                                                        </span>
                                                                        {/* Texto o descripción de la sección */}
                                                                        {rutaData.text && (
                                                                            <p className="text-sm text-gray-800 font-serif">
                                                                                {
                                                                                    rutaData.text
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        {rutaData.description && (
                                                                            <p className="text-sm text-gray-800 font-serif">
                                                                                {
                                                                                    rutaData.description
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
