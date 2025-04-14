"use client";

import { useState, useRef } from "react";
import { FormBuilder } from "@formio/react";
import ToastEditor from "@/components/ToastEditor"; // Asegúrate de que la ruta es correcta
import "formiojs/dist/formio.full.min.css";

export default function FormioBuilder() {
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
    // Valor inicial para el editor
    const [descripcion, setDescripcion] = useState("¡Empieza a escribir aquí!");
    const editorRef = useRef();

    // Al guardar, se obtiene el markdown del ToastEditor y se envía junto al formulario
    const handleSave = async () => {
        const markdown = editorRef.current.obtenerMarkdown();

        const formData = {
            titulo,
            descripcion: markdown, // Usamos el contenido del editor como descripción (en formato Markdown)
            schema: form,
        };

        try {
            const res = await fetch("https://aeuniandes.pythonanywhere.com/api/crear-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

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

    return (
        <>
            <div className="container mt-4" style={{ maxWidth: "900px" }}>
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

                {/* Editor de Descripción usando ToastEditor global */}
                <div className="mb-5">
                    <label className="form-label fw-bold">Descripción</label>
                    <ToastEditor ref={editorRef} initialValue={descripcion} />
                </div>

                <h4 className="mb-3">Editor Visual de Componentes</h4>
                <FormBuilder
                    form={form}
                    onChange={(schema) => setForm(schema)}
                />

                <button className="btn btn-success mt-4" onClick={handleSave}>
                    💾 Publicar formulario
                </button>

                <pre className="mt-4 bg-light p-3">
                    {JSON.stringify({ titulo, schema: form }, null, 2)}
                </pre>
            </div>

            <style jsx>{`
                * {
                    font-family: "serif";
                }
            `}</style>
        </>
    );
}
