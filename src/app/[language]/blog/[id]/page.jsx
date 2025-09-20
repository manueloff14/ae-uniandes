"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCircle, Calendar, Share2 } from "lucide-react";
import tocbot from "tocbot";

// ✅ CAMBIO: Se importan las librerías para renderizar Markdown y Ecuaciones
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css"; // Hoja de estilos para las ecuaciones

import "tocbot/dist/tocbot.css";

// --- DATOS DEL BLOG (Contenido con sintaxis de LaTeX corregida) ---
const mockBlog = {
    title: "El Futuro de la Inteligencia Artificial en Colombia",
    authors: ["Ana María Rojas"],
    created_at: "2025-09-17T10:00:00Z",
    featured_image:
        "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    content: `
Este es el párrafo introductorio de nuestro artículo. Aquí exploramos cómo la IA está transformando diversas industrias en el país, desde la agricultura hasta las finanzas.

## 1. IA en el Sector Financiero (FinTech)

El sector financiero ha sido uno de los pioneros en la adopción de IA. Los bancos utilizan algoritmos de *Machine Learning* para la detección de fraudes y la evaluación de riesgos crediticios.

### 1.1. Detección de Fraudes

Los modelos analizan miles de transacciones por segundo para identificar patrones anómalos. Por ejemplo, un \`patrón de gasto inusual\` puede activar una alerta inmediata.

## 2. Los Modelos Matemáticos en IA

En el corazón de la inteligencia artificial se encuentran las matemáticas. Los algoritmos de aprendizaje automático se basan en conceptos estadísticos y de cálculo para "aprender" de los datos.

### 2.1. Regresión Lineal

Uno de los modelos más simples es la regresión lineal, que busca encontrar la mejor línea recta para describir la relación entre dos variables. La ecuación fundamental es la de la recta:

$$ y = mx + b $$

Donde $y$ es la variable dependiente, $x$ la independiente, $m$ la pendiente y $b$ el intercepto. El objetivo del algoritmo es encontrar los valores óptimos para $m$ y $b$ que minimicen el error.

### 2.2. Funciones de Activación en Redes Neuronales

En las redes neuronales, las funciones de activación deciden si una neurona debe "activarse" o no. Una de las más conocidas es la **función Sigmoide**, que convierte cualquier valor a una probabilidad entre 0 y 1. Su fórmula es:

$$
\\sigma(z) = \\frac{1}{1 + e^{-z}}
$$

Esta ecuación es fundamental para problemas de clasificación binaria, como decidir si un correo es spam o no.

## 3. Desafíos y Consideraciones Éticas

A pesar de los beneficios, existen desafíos importantes que deben ser abordados.

1.  **Brecha de Talento:** Necesitamos más profesionales capacitados en ciencia de datos e IA.
2.  **Sesgos en los Algoritmos:** Es crucial asegurar que los modelos de IA sean justos y no discriminen.
3.  **Privacidad de los Datos:** La regulación sobre el uso de datos personales es fundamental.

Aquí hay un ejemplo de código para ilustrar un concepto simple en Python:

\`\`\`python
import numpy as np

def sigmoid(z):
  """Implementación de la función Sigmoide."""
  return 1 / (1 + np.exp(-z))

# Probar la función
print(sigmoid(0))  # Imprime 0.5
\`\`\`
`,
};

export default function BlogPage() {
    const router = useRouter();

    useEffect(() => {
        tocbot.init({
            tocSelector: ".js-toc",
            contentSelector: ".js-content",
            headingSelector: "h2, h3, h4",
            collapseDepth: 3,
            orderedList: false,
            activeLinkClass: "is-active-link",
            listClass: "toc-list",
            linkClass: "toc-link",
            headingTopOffset: 120,
        });
        return () => tocbot.destroy();
    }, []);

    const formattedDate = new Date(mockBlog.created_at).toLocaleString(
        "es-CO",
        {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <>
            <style jsx global>{`
                body {
                    background: linear-gradient(
                        135deg,
                        #f8fafc 0%,
                        #e2e8f0 100%
                    );
                    font-family: "Inter", sans-serif;
                }
                .toc-list {
                    list-style-type: none;
                    padding-left: 0;
                    margin: 0;
                }
                .toc-link {
                    display: block;
                    padding: 8px 0;
                    color: #4b5563;
                    text-decoration: none;
                    transition: all 0.2s ease-in-out;
                    font-size: 0.875rem;
                    border-left: 2px solid transparent;
                    padding-left: 1rem;
                }
                .toc-link:hover {
                    color: #18647e;
                }
                .is-active-link {
                    color: #18647e;
                    font-weight: 600;
                    border-left-color: #18647e;
                }
                .prose h2,
                .prose h3,
                .prose h4 {
                    scroll-margin-top: 120px;
                }
            `}</style>

            <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <img
                            className="h-12 w-auto"
                            src="/ae-blog-logo.svg"
                            alt="Logo AE Uniandes"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-semibold text-sm"
                        >
                            <ArrowLeft size={18} />
                            Volver al Blog
                        </button>
                        <button className="bg-gradient-to-r from-[#18647E] to-[#08849A] hover:from-[#08849A] hover:to-[#0A9B8C] transition-all text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                            ¡Únete ahora!
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28">
                            <h3 className="text-base font-bold text-gray-900 mb-4 tracking-wide uppercase">
                                En este artículo
                            </h3>
                            <div className="js-toc toc"></div>
                        </div>
                    </aside>

                    <article className="lg:col-span-2 js-content">
                        <header className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                {mockBlog.title}
                            </h1>
                            <div className="flex items-center text-gray-500 text-sm">
                                <p>{mockBlog.authors.join(", ")}</p>
                                <span className="mx-2">•</span>
                                <p>{formattedDate}</p>
                            </div>
                        </header>

                        {mockBlog.featured_image && (
                            <figure className="mb-10">
                                <img
                                    src={mockBlog.featured_image}
                                    alt={`Imagen destacada para ${mockBlog.title}`}
                                    className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-lg"
                                />
                            </figure>
                        )}
                        
                        <div className="prose prose-lg max-w-none prose-a:text-[#18647E] prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-img:rounded-lg">
                            {/* ✅ CAMBIO: Se usa ReactMarkdown con los plugins de Matemáticas */}
                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex, rehypeSlug]}
                            >
                                {mockBlog.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-4 tracking-wide uppercase">
                                    {mockBlog.authors.length > 1
                                        ? "Autores"
                                        : "Autor"}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/img/coordinadores/santiago_ramirez.jpg"
                                        alt={mockBlog.authors[0]}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {mockBlog.authors.join(", ")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Editor Principal
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full mt-6 flex items-center justify-center gap-2 text-gray-600 hover:text-white hover:bg-[#18647E] border border-gray-200 p-2.5 rounded-xl transition-colors font-semibold text-sm">
                                    <Share2 size={16} />
                                    <span>Compartir Artículo</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}