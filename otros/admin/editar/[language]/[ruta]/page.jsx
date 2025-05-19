"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

export default function EditRoutePage() {
    const params = useParams();
    const { language, ruta } = params;

    const [routeData, setRouteData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // 1. Cargar la data actual de la ruta
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/obtener-ruta/${language}/${ruta}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setRouteData(data || {});
                } else {
                    console.error("Error al obtener la ruta");
                }
            } catch (error) {
                console.error("Error fetching route data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (language && ruta) {
            fetchData();
        }
    }, [language, ruta]);

    // 2. Actualizar un nodo en la estructura
    const handleFieldChange = (key, newVal) => {
        setRouteData({
            ...routeData,
            [key]: newVal,
        });
    };

    // 3. Guardar cambios (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `http://localhost:5000/editar-ruta/${language}/${ruta}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(routeData),
                }
            );
            if (res.ok) {
                setMessage("Ruta actualizada exitosamente");
            } else {
                setMessage("Error al actualizar la ruta");
            }
        } catch (error) {
            console.error("Error updating route:", error);
            setMessage("Error al actualizar la ruta");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white text-xl">Cargando datos...</p>
            </div>
        );
    }

    const user = {
        nombres: "Manuel",
        apellidos: "Cabrera"
    }

    return (
        <div className="flex">
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px] py-6">
                <HeaderDashboard title={`Editar Ruta: ${ruta}`} user={user} />
                <div className="max-w-3xl mx-auto bg-[#181818] p-8 rounded-2xl shadow-lg mt-6">
                    <h1 className="text-3xl font-bold text-white mb-6">
                        Ruta: <span className="text-blue-400">{ruta}</span>{" "}
                        <span className="text-gray-400">
                            - Idioma: {language}
                        </span>
                    </h1>
                    {message && (
                        <div className="mb-4 p-3 rounded bg-gray-800 text-white">
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {renderFormFields(routeData, handleFieldChange)}
                        <button
                            type="submit"
                            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl text-white font-semibold"
                        >
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

/**
 * Renderizado dinámico de campos:
 *
 * 1. Si el valor es un string, se renderiza un input.
 * 2. Si es un objeto con type "group" y "fields", se renderiza un fieldset.
 * 3. Si es un objeto con { type, label, value }, se renderiza según su tipo.
 * 4. Si es un array, se itera sobre sus elementos y se utiliza la estructura de la base de datos para agregar nuevos elementos.
 */
function renderFormFields(data, onChange) {
    return Object.entries(data).map(([key, val]) => {
        // Caso 1: Campo primitivo (string)
        if (typeof val === "string") {
            return (
                <label key={key} className="block mb-4">
                    <span className="font-semibold text-gray-300">{key}:</span>
                    <input
                        type="text"
                        className="mt-1 w-full p-2 bg-[#222222] text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                        value={val}
                        onChange={(e) => onChange(key, e.target.value)}
                    />
                </label>
            );
        }

        // Caso 2: Si es un array, iteramos sobre cada elemento
        if (Array.isArray(val)) {
            return (
                <div key={key} className="mb-6">
                    <h2 className="font-bold text-gray-300 mb-2">{key}</h2>
                    {val.map((item, index) => (
                        <fieldset
                            key={index}
                            className="border border-gray-700 p-4 rounded mb-4 bg-[#1a1a1a]"
                        >
                            <legend className="font-semibold text-gray-200">{`${key} #${
                                index + 1
                            }`}</legend>
                            {renderFormFields(item, (subKey, subVal) => {
                                const newArray = [...val];
                                newArray[index] = { ...item, [subKey]: subVal };
                                onChange(key, newArray);
                            })}
                            <button
                                type="button"
                                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                                onClick={() => {
                                    const newArray = [...val];
                                    newArray.splice(index, 1);
                                    onChange(key, newArray);
                                }}
                            >
                                Eliminar
                            </button>
                        </fieldset>
                    ))}
                    <button
                        type="button"
                        className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
                        onClick={() => {
                            const newArray = [...val];
                            let newItem = {};
                            if (val.length > 0) {
                                // Usamos la estructura del primer elemento del array
                                Object.entries(val[0]).forEach(
                                    ([subKey, subVal]) => {
                                        newItem[subKey] = {
                                            ...subVal,
                                            value: "",
                                        };
                                    }
                                );
                            } else {
                                console.log(
                                    `El array "${key}" está vacío. No se pudo inferir la estructura.`
                                );
                                newItem = {}; // Define la estructura deseada
                            }
                            newArray.push(newItem);
                            onChange(key, newArray);
                        }}
                    >
                        Agregar
                    </button>
                </div>
            );
        }

        // Caso 3: Si es un objeto con "fields" pero sin "type", se trata como grupo simple
        if (
            val &&
            typeof val === "object" &&
            !Array.isArray(val) &&
            "fields" in val &&
            !("type" in val)
        ) {
            return (
                <div
                    key={key}
                    className="border border-gray-700 p-4 rounded mb-6 bg-[#1a1a1a]"
                >
                    <h3 className="font-bold text-gray-300 mb-2">{key}</h3>
                    {renderFormFields(val.fields, (fieldKey, fieldVal) => {
                        onChange(key, {
                            ...val,
                            fields: { ...val.fields, [fieldKey]: fieldVal },
                        });
                    })}
                </div>
            );
        }

        // Caso 4: Sección en grupo (con type:"group")
        if (val && typeof val === "object" && val.type === "group") {
            const { type, label, fields, ...rest } = val;
            return (
                <fieldset
                    key={key}
                    className="border border-gray-700 p-4 rounded mb-6 bg-[#1a1a1a]"
                >
                    <legend className="font-bold text-gray-300">
                        {label || key}
                    </legend>
                    {renderFormFields(fields || {}, (fieldKey, fieldVal) => {
                        onChange(key, {
                            ...val,
                            fields: { ...val.fields, [fieldKey]: fieldVal },
                        });
                    })}
                    {Object.keys(rest).map((subKey) =>
                        renderFormFields(
                            { [subKey]: rest[subKey] },
                            (fieldKey, fieldVal) => {
                                onChange(key, { ...val, [subKey]: fieldVal });
                            }
                        )
                    )}
                </fieldset>
            );
        }

        // Caso 5: Campo final con { type, label, value }
        if (
            val &&
            typeof val === "object" &&
            "type" in val &&
            "label" in val &&
            "value" in val
        ) {
            switch (val.type) {
                case "text":
                    return (
                        <label key={key} className="block mb-4">
                            <span className="font-semibold text-gray-300">
                                {val.label}:
                            </span>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 bg-[#222222] text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                                value={val.value}
                                onChange={(e) =>
                                    onChange(key, {
                                        ...val,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </label>
                    );
                case "textarea":
                    return (
                        <label key={key} className="block mb-4">
                            <span className="font-semibold text-gray-300">
                                {val.label}:
                            </span>
                            <textarea
                                className="mt-1 w-full p-2 bg-[#222222] text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                                value={val.value}
                                onChange={(e) =>
                                    onChange(key, {
                                        ...val,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </label>
                    );
                case "image":
                    return (
                        <label key={key} className="block mb-4">
                            <span className="font-semibold text-gray-300">
                                {val.label}:
                            </span>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 bg-[#222222] text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                                value={val.value}
                                onChange={(e) =>
                                    onChange(key, {
                                        ...val,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </label>
                    );
                default:
                    return (
                        <p key={key} className="text-red-500">
                            Tipo de campo desconocido: {val.type}
                        </p>
                    );
            }
        }

        // Fallback: estructura inválida
        return (
            <p key={key} className="text-red-500">
                Estructura inválida para {key}
            </p>
        );
    });
}
