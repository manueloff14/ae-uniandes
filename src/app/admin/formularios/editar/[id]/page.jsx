"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import ToastEditor from "@/components/ToastEditor";
import FormBuilderNoSSR from "@/components/FormBuilderNoSSR";

export default function EditForm() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [loading, setLoading] = useState(true);

    const editorRef = useRef();

    useEffect(() => {
        if (!id) return;
        fetch(`https://aeuniandes.pythonanywhere.com/api/obtener-form/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error:", data.error);
                } else {
                    setTitulo(data.titulo || "");
                    // We expect data.schema to be the JSON for the form:
                    setForm({
                        ...data.schema,
                        display: data.schema.components || "",
                    });
                    if (data.markdown) {
                        setDescripcion(data.markdown);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener el formulario:", err);
                setLoading(false);
            });
    }, [id]);

    const handleSave = async () => {
        const markdown = editorRef.current.obtenerMarkdown();
        const formData = {
            titulo,
            descripcion: markdown,
            schema: form, // Send back the updated form schema
        };

        try {
            const res = await fetch(
                `https://aeuniandes.pythonanywhere.com/api/editar-form/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if (res.ok) {
                alert(`✅ Cambios guardados: ID ${data.id}`);
            } else {
                throw new Error(data.error || "Error al guardar cambios");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error: " + err.message);
        }
    };

    if (loading) {
        return <div>Cargando formulario...</div>;
    }
    if (!form) {
        return <div>Ocurrió un problema cargando el formulario.</div>;
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "900px" }}>
            <h2 className="mb-4 font-bold font-serif">Editar Formulario</h2>

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

            <div className="mb-5">
                <label className="form-label fw-bold">Descripción</label>
                <ToastEditor ref={editorRef} initialValue={descripcion} />
            </div>

            <h4 className="mb-3">Editor Visual de Componentes</h4>

            {form.components && (
                <FormBuilderNoSSR
                    // Use a "key" if you want to reset the builder on changes to form.components:
                    key={form.components.length}
                    form={form}
                    onChange={(newSchema) => setForm(newSchema)}
                />
            )}

            <button className="btn btn-success mt-4" onClick={handleSave}>
                💾 Guardar cambios
            </button>

            <pre className="mt-4 bg-light p-3">
                {JSON.stringify({ titulo, schema: form }, null, 2)}
            </pre>
        </div>
    );
}
