import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import ReactMarkdown from "react-markdown";

const articleContent = `
## ¿Por qué mejorar tus habilidades de UI Design?

El diseño de interfaces de usuario (UI) es un factor clave para ofrecer experiencias memorables. 
Con una buena UI, no solo facilitas la interacción de los usuarios, sino que también potencias la 
eficiencia y la estética de tus productos digitales.

---

### Técnicas para entrenar tu “ojo” de diseñador

1. **Observa** otros productos y analiza qué te gusta o no.  
2. **Practica** con proyectos personales y desafíos de diseño.  
3. **Comparte** tu trabajo y solicita retroalimentación constructiva.

> “En un mundo cada vez más competitivo, el diseño de calidad puede marcar la diferencia.”  
> — Anónimo

![Equipo de diseño trabajando](https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg)

El objetivo es ir más allá de lo meramente estético y entender cómo cada elección de color, tipografía 
y espaciado impacta en la experiencia de las personas.

---

### Conclusión

Con dedicación y práctica constante, tu ojo de diseñador se agudizará rápidamente. 
Recuerda que el diseño es un proceso iterativo: la **perseverancia** y la **curiosidad** 
son tus mejores aliadas para seguir evolucionando.
`;

export default function BlogIDPage() {
    return (
        <div className="bg-black text-gray-100 min-h-screen flex flex-col">
            <HeaderHome blog={true} />

            <main className="flex-1 mb-10">
                {/* Hero / Imagen destacada */}
                <section className="relative w-full h-[600px] md:h-[500px]">
                    <div
                        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg')",
                        }}
                    />
                    {/* Capa oscura para mejor contraste */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-[1px]" />

                    {/* Texto superpuesto */}
                    <div className="relative z-10 flex flex-col items-start justify-end h-full p-6 md:p-20">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 max-w-3xl">
                            How to improve your UI design skills:
                            <br className="hidden md:block" /> Quickly develop
                            an “eye” for great design
                        </h1>
                        <p className="text-base md:text-lg max-w-2xl">
                            Consejos, técnicas y prácticas recomendadas para
                            llevar tus habilidades al siguiente nivel
                        </p>
                        <ul className="flex gap-2 text-xs mt-4 flex-wrap">
                            <li className="border rounded-xl p-2 px-4">
                                Tecnologia
                            </li>
                            <li className="border rounded-xl p-2 px-4">
                                Inteligencia Artificial
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Contenedor principal */}
                <section className="container mx-auto px-4 md:px-20 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna izquierda (artículo) */}
                    <article className="col-span-1 md:col-span-2">
                        {/* Autor y fecha */}
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                alt="Autor"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold">Por Jane Doe</p>
                                <p className="text-sm text-gray-400">
                                    Publicado el 22 de Febrero, 2025
                                </p>
                            </div>
                        </div>

                        <ReactMarkdown
                            className="prose prose-invert lg:prose-base max-w-none leading-relaxed"
                            components={{
                                img: ({ node, ...props }) => (
                                    <img
                                        className="rounded-xl"
                                        alt={props.alt || ""}
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {articleContent}
                        </ReactMarkdown>
                    </article>

                    {/* Columna derecha (sidebar) */}
                    <aside className="space-y-8">
                        {/* Sección de “Otros blogs” */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">
                                Otros blogs
                            </h2>
                            <ul className="space-y-4">
                                {Array(3)
                                    .fill(null)
                                    .map((_, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="relative group cursor-pointer overflow-hidden rounded-xl w-[80px] h-[50px] flex-shrink-0">
                                                <img
                                                    src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                                    alt="Miniatura"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm leading-tight">
                                                    Cómo optimizar tu flujo de
                                                    trabajo
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    18 de Feb, 2025
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </aside>
                </section>
            </main>

            <Footer />
        </div>
    );
}
