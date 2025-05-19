"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import "formiojs/dist/formio.full.min.css";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

// Importamos FormBuilder sólo en cliente
const FormBuilder = dynamic(
    () => import("@formio/react").then((mod) => mod.FormBuilder),
    { ssr: false }
);

// Importamos ToastEditor sólo en cliente
const ToastEditor = dynamic(() => import("@/components/ToastEditor"), {
    ssr: false,
});

export default function FormioBuilder() {
    const { user, loading } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [forms, setForms] = useState({});
    const [loadingForms, setLoadingForms] = useState(true);
    const [errorForms, setErrorForms] = useState(null);

    const [form, setForm] = useState({
        display: "form",
        components: [
            {
                type: "textfield",
                key: "nombre",
                label: "Nombre",
                input: true,
            },
        ],
    });

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("¡Empieza a escribir aquí!");
    const editorRef = useRef();

    const handleSave = async () => {
        const markdown = editorRef.current.obtenerMarkdown();

        const formData = {
            titulo,
            descripcion: markdown,
            schema: form,
        };

        try {
            const res = await fetch(
                "http://localhost:5000/api/crear-form",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if (res.ok) {
                alert(`✅ Guardado: ID ${data.id}`);
            } else {
                throw new Error(data.error || "Error al guardar");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error: " + err.message);
        }
    };

    // 3. Primero: mientras carga auth, mostramos spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-white text-xl">Cargando...</p>
            </div>
        );
    }

    // 4. Si ya no carga y no hay user, redirigimos o no renderizamos
    if (!user && isClient) {
        router.push("/login");
        return null;
    }

    // 5. Render final, una vez que loadingForms ya refleje el estado de la petición
    return (
        <div className="min-h-screen flex">
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Formularios" user={user} />
                <div
                    className="pt-36 pb-10 mx-auto"
                    style={{ maxWidth: "900px" }}
                >
                    <h2 className="mb-4 font-bold font-serif">
                        Crear Nuevo Formulario
                    </h2>

                    {/* Campo para el Título */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">
                            Título del Formulario
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej: Encuesta de satisfacción"
                        />
                    </div>

                    {/* Editor de Descripción */}
                    <div className="mb-5 font-serif">
                        <label className="form-label font-bold font-serif">
                            Descripción
                        </label>
                        <ToastEditor
                            ref={editorRef}
                            initialValue={descripcion}
                        />
                    </div>

                    <h4 className="mb-3">Editor Visual de Componentes</h4>
                    <FormBuilder
                        form={form}
                        onChange={(schema) => setForm(schema)}
                    />

                    <button
                        className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-4 py-3 rounded-full flex items-center gap-2 font-bold font-serif text-sm mt-8"
                        onClick={handleSave}
                    >
                        <img
                            className="w-[15px]"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmElEQVR4nO2UMQ6DMAxFcwxob1LRvfQ2DISOPSvtWuZ2el2IBJJBNpgtT/L2k2fHUkLIWADuwBsbA9BoBS+289QIEhdFtjJLUko1bpg1NKU5WvDRHKgUl1+XlmHtyEwWHPJEX6AFyrEi8PMUtEK28xQUQrbwFJRC9uwpiEL24b3kCJzG6rYuec93nejXBPVOSQ/cFgWZIPAHEbMQcpWkB6QAAAAASUVORK5CYII="
                            alt="save"
                        ></img>{" "}
                        Publicar formulario
                    </button>

                    {/* <pre className="mt-4 bg-light p-3">
                        {JSON.stringify({ titulo, schema: form }, null, 2)}
                    </pre> */}
                </div>
            </main>
        </div>
    );
}
