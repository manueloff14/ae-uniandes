"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form } from "@formio/react";
import Markdown from "markdown-to-jsx";
import "formiojs/dist/formio.full.min.css";

export default function FormView() {
    const { id } = useParams(); // Obtenemos el ID del formulario desde la URL.
    const [formSchema, setFormSchema] = useState(null);
    const [markdownContent, setMarkdownContent] = useState("");
    const [titulo, setTitulo] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        console.log("Cargando formulario con id:", id);
        // Obtenemos el formulario desde la API
        fetch(`https://aeuniandes.pythonanywhere.com/api/obtener-form/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    // Se espera que el JSON tenga { id, schema, markdown, titulo, created_at }
                    setFormSchema(data.schema);
                    setTitulo(data.titulo);
                    if (data.markdown) {
                        setMarkdownContent(data.markdown);
                    }
                }
            })
            .catch((err) => {
                console.error("Error al obtener el formulario:", err);
                setError("Error al obtener el formulario");
            });
    }, [id]);

    // Función que se ejecutará al enviar el formulario.
    const handleSubmit = (submission) => {
        console.log("Datos enviados desde el formulario:", submission);
        fetch(`https://aeuniandes.pythonanywhere.com/api/submit-form/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission.data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Respuesta del servidor:", data);
                // Alerta al usuario cuando se envíe el formulario
                alert("¡Formulario enviado con éxito!");
            })
            .catch((err) => {
                console.error("Error al enviar el formulario:", err);
                alert("Error al enviar el formulario, intenta nuevamente.");
            });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!formSchema) {
        return <div>Cargando formulario...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* HEADER */}
            <header className="bg-white shadow-lg fixed w-full top-0 z-50">
                <div className="container mx-auto flex items-center justify-between py-2 px-4 bg-transparent">
                    <img
                        className="w-[170px]"
                        src="/ae-logo-black.svg"
                        alt="Altruismo Eficaz Uniandes"
                    />
                    <span className="ml-4 text-black font-bold font-serif text-lg">
                        Formularios
                    </span>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow mt-36 mb-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold font-serif mb-4">
                        {titulo}
                    </h1>
                    <hr className="mb-4" />
                    {/* Renderizamos el contenido Markdown si está disponible */}
                    {markdownContent && (
                        <div className="markdown-content prose prose-sm max-w-none font-serif mb-4 break-words">
                            <Markdown>{markdownContent}</Markdown>
                        </div>
                    )}
                    <hr className="mb-4" />
                    {/* <div className="text-lg font-serif mb-4 font-bold">
                        Rellena el formulario
                    </div> */}
                    <div className="form-container mb-8">
                        {/* Se le pasa el controlador onSubmit para interceptar el envío */}
                        <Form form={formSchema} onSubmit={handleSubmit} />
                        {/* <a
                            className="bg-red-500 p-3 text-white"
                            target="_blank"
                            href="https://docs.google.com/forms/d/e/1FAIpQLScLJYC_psHxRF5jD4_LfAckJILUmP73ev8Dw6-EP1Lp5-ztFQ/viewform"
                        >
                            Completar formulario
                        </a> */}
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-[#141414] py-4 pb-0">
                <div className="container mx-auto text-center">
                    <p className="text-white font-serif text-xs lg:text-sm pb-0 mb-0">
                        © {new Date().getFullYear()} Altruismo Eficaz Uniandes.
                        Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            <style jsx global>{`
                .page-wrapper {
                    min-height: 100vh;
                }
                .navbar {
                    background-color: #333;
                    padding: 1rem 0;
                }
                .form-container {
                    font-family: serif;
                }
                .col-form-label {
                    font-size: 12px;
                }
                .form-control {
                    border-radius: 100px;
                }
                .btn {
                    background: linear-gradient(to right, #07869c, #1b617b);
                    border-radius: 100px;
                    font-weight: bold;
                    padding: 10px 20px;
                    border: none;
                    margin-top: 10px;
                }
                .form-check-label {
                    font-size: 12px;
                }
                .markdown-content {
                    margin-bottom: 20px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                }
            `}</style>
        </div>
    );
}
