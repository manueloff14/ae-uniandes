"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import ToastEditor from "@/components/ToastEditor";
import { FormioProvider, FormEdit } from "@formio/react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";

// Create a wrapper component to isolate Bootstrap styles
const BootstrapFormWrapper = ({ children }) => {
    return (
        <div className="bootstrap-scoped-container">
            {/* Add a local style tag to scope Bootstrap only to this container */}
            <style jsx>{`
                .bootstrap-scoped-container {
                    /* Reset any conflicting styles from parent app */
                    all: initial;
                    /* Ensure the container gets proper display */
                    display: block;
                    width: 100%;
                }

                /* Import Bootstrap only within this scope */
                .bootstrap-scoped-container :global(*) {
                    /* This will apply bootstrap styles only to elements inside this container */
                }
            `}</style>

            {/* Add an additional stylesheet link specifically for this component */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />

            {children}
        </div>
    );
};

export default function EditForm() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [loadingForm, setLoadingForm] = useState(true);
    const editorRef = useRef();

    const { user, loading } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Set isClient to true on component mount
        setIsClient(true);

        if (!id) return;
        fetch(`https://aeuniandes.pythonanywhere.com/api/obtener-form/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setTitulo(data.titulo || "");
                    setForm(data.schema);
                    setDescripcion(data.markdown || "");
                } else {
                    console.error("Error:", data.error);
                }
                setLoadingForm(false);
            })
            .catch((err) => {
                console.error("Error al obtener el formulario:", err);
                setLoadingForm(false);
            });
    }, [id]);

    if (loadingForm) {
        return <div>Cargando formulario...</div>;
    }
    if (!form) {
        return <div>Ocurrió un problema cargando el formulario.</div>;
    }

    // Mientras carga auth, mostramos spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-white text-xl">Cargando...</p>
            </div>
        );
    }

    // Si ya no carga y no hay user, redirigimos o no renderizamos
    if (!user && isClient) {
        router.push("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex">
            <AsideDashboard />
            <main className="flex-1 mx-6 pl-[280px]">
                <HeaderDashboard title="Formularios" user={user} />
                <div
                    className="pt-36 pb-10 mx-auto"
                    style={{ maxWidth: "900px" }}
                >
                    <div
                        className="form-edit-container [&>div>div>div>button]:bg-gradient-to-r [&>div>div>div>button]:from-[#06869B] [&>div>div>div>button]:via-[#11809D] [&>div>div>div>button]:to-[#1B607A] [&>div>div>div>button]:text-white [&>div>div>div>button]:px-4 [&>div>div>div>button]:py-3 [&>div>div>div>button]:rounded-full [&>div>div>div>button]:flex [&>div>div>div>button]:items-center [&>div>div>div>button]:gap-2 [&>div>div>div>button]:font-bold [&>div>div>div>button]:font-serif [&>div>div>div>button]:text-sm [&>div>div>div>button]:my-10"
                        style={{ maxWidth: "900px" }}
                    >
                        <h2 className="mb-4 font-bold font-serif">
                            Editar Formulario
                        </h2>

                        {/* Título */}
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

                        {/* Descripción */}
                        <div className="mb-5">
                            <label className="form-label fw-bold">
                                Descripción
                            </label>
                            <ToastEditor
                                ref={editorRef}
                                initialValue={descripcion}
                            />
                        </div>

                        <h4 className="mb-3">Editor Visual de Componentes</h4>

                        {/* Wrap only the FormEdit component with Bootstrap styles */}
                        <BootstrapFormWrapper>
                            <FormioProvider projectUrl="https://aeuniandes.pythonanywhere.com">
                                <FormEdit
                                    initialForm={{
                                        ...form,
                                        title: titulo,
                                        name: titulo
                                            .toLowerCase()
                                            .replace(/\s+/g, "-"),
                                        path: titulo
                                            .toLowerCase()
                                            .replace(/\s+/g, "-"),
                                    }}
                                    builderOptions={{
                                        noDefaultSubmitButton: true,
                                    }}
                                    saveFormFn={(updatedForm) => {
                                        const markdown =
                                            editorRef.current.obtenerMarkdown();
                                        return fetch(
                                            "http://localhost:5000/api/editar-form",
                                            {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    form_id: form._id || id,
                                                    titulo: updatedForm.title,
                                                    descripcion: markdown,
                                                    schema: updatedForm,
                                                }),
                                            }
                                        ).then((res) => {
                                            if (!res.ok)
                                                throw new Error(
                                                    "Error al guardar cambios"
                                                );
                                            return res.json();
                                        });
                                    }}
                                    onSaveForm={(saved) => {
                                        alert(
                                            `✅ Cambios guardados: ID ${saved.id}`
                                        );
                                    }}
                                />
                            </FormioProvider>
                        </BootstrapFormWrapper>
                    </div>
                </div>
            </main>
        </div>
    );
}
