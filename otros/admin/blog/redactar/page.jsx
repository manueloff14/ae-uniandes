"use client"

// pages/index.jsx
import { useState, useRef } from "react";
import ToastEditor from "@/components/ToastEditor";

export default function RedactarBlog() {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const editorRef = useRef();

    // Función para manejar el envío de datos
    const handleSubmit = async () => {
        const markdown = editorRef.current.obtenerMarkdown();

        if (!title || !authors || !markdown) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const response = await fetch("http://localhost:5000/api/publicar-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                authors: authors.split(",").map((author) => author.trim()), // Convertimos los autores en un array
                markdown,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`¡Blog publicado con éxito! ID: ${data.id}`);
        } else {
            alert(`Error: ${data.error}`);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1>Editor con Toast UI</h1>

            <div>
                <input
                    type="text"
                    placeholder="Título del blog"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="Autores (separados por comas)"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
            </div>

            <ToastEditor initialValue="¡Empieza a escribir aquí!" ref={editorRef} />

            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Publicar Blog
            </button>
        </div>
    );
}
