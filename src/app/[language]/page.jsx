"use client";

import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";
import Footer from "@/components/routes/Footer";
import HeaderHome from "@/components/routes/HeaderHome";
import Link from "next/link";
import IdentidadSection from "@/components/routes/home/sections/IdentidadSection";
import { useRouter } from "next/navigation";

export default function Home() {
    const [reproducir, setReproducir] = useState(false);
    const router = useRouter();

    const { language } = useParams(); // Se espera que la URL tenga /[language]/page.jsx, por ejemplo, /en
    const [translatedData, setTranslatedData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (language) {
            localStorage.setItem("language", language);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/traducir`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lang: language,
                    section: "HomePage",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setTranslatedData(data.translated_json);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al traducir:", error);
                    setLoading(false);
                });
        } else {
            const savedLanguage = localStorage.getItem("language") || "es";
        }
    }, [language]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]" // Tamaño de la imagen a 55px
                />
                <p className="mt-4 text-sm font-bold font-serif text-black">
                    Cargando...
                </p>

                <style jsx>{`
                    img {
                        animation: scale-up-down 0.5s ease-in-out infinite; /* Animación más rápida */
                    }

                    @keyframes scale-up-down {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.2);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `}</style>
            </div>
        );
    }
    if (!translatedData) return <div>Error al cargar datos traducidos.</div>;

    // Devuelve la palabra que empiece por "ef" (ignorando mayúsculas)
    function getEfHighlight(title) {
        // \b: límites de palabra, (ef\S*): “ef” seguido de cualquier carácter
        const match = title.match(/\b(ef\S*)\b/i);
        return match ? match[1] : "";
    }

    function HighlightEfText({ text }) {
        return (
            <>
                {text.split(" ").map((word, index) => {
                    // Usamos un regex para separar prefijo, núcleo y sufijo de signos de interrogación
                    // ^([¿?]+)?  -> opcionalmente, uno o más signos ? o ¿ al inicio
                    // (.*?)      -> núcleo (cualquier caracter, no codicioso)
                    // ([¿?]+)?$  -> opcionalmente, uno o más signos ? o ¿ al final
                    const match = word.match(/^([¿?]+)?(.*?)([¿?]+)?$/);

                    // Si no hay match (raro, pero por seguridad), devolvemos la palabra tal cual
                    if (!match) {
                        return (
                            <span key={index} className="font-serif">
                                {word}{" "}
                            </span>
                        );
                    }

                    const prefix = match[1] || ""; // Signos de interrogación iniciales
                    const core = match[2] || ""; // Núcleo
                    const suffix = match[3] || ""; // Signos de interrogación finales

                    // Comprobamos si el núcleo comienza por "ef" (ignorando mayúsculas)
                    if (core.toLowerCase().startsWith("ef")) {
                        // Resaltamos solo el núcleo, manteniendo prefijo/sufijo normales
                        return (
                            <span key={index} className="font- text-white">
                                {prefix}
                                <span className="font-serif relative bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] bg-clip-text text-transparent">
                                    {core}
                                    <img
                                        src="/text-effect-2.svg"
                                        alt="Efecto decorativo"
                                        className={`absolute z-[-1] left-1/2 -translate-x-1/2 top-full mt-[-20px] md:mt-[-30px] sm:mt-[-30px] lg:mt-[-40px] w-[80%] h-auto rotate-[-2.5deg] scale-x-[-1] ${
                                            language === "pt"
                                                ? "lg:mt-[-30px]"
                                                : ""
                                        } ${
                                            language === "de"
                                                ? "lg:mt-[-45px]"
                                                : ""
                                        }`}
                                    />
                                    <div className="z-[-10] absolute top-[-30px] right-0 transform w-full h-64 bg-gradient-to-r from-[white] via-[white] to-[white] opacity-20 rounded-full blur-3xl" />
                                </span>
                                {suffix + " "}
                            </span>
                        );
                    }

                    // Si el núcleo no empieza por “ef”, mostramos la palabra sin estilos
                    return (
                        <span key={index} className="font-serif text-white">
                            {word}{" "}
                        </span>
                    );
                })}
            </>
        );
    }

    return (
        <>
            <HeaderHome data={translatedData} />
            <main>
                <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                    {/* Fondo e imagen */}
                    <div className="absolute inset-0 z-[-20] overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={translatedData.HeroSection.fields.imageLink}
                            alt="Fondo Uniandes"
                        />
                        <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-[10px] z-[-10]" />
                    </div>

                    {/* Overlay adicional para oscurecer y aplicar un blur suave */}
                    <div className="absolute inset-0 bg-[#00000044] backdrop-blur-[2px]" />

                    {/* Figuras decorativas */}
                    <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#a7a7a7] to-[#a1a1a1] opacity-20 rounded-full blur-3xl" />
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#000000] via-[#000000] to-[#1B607A] opacity-20 rounded-full blur-3xl" />

                    {/* Contenido principal */}
                    <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-56 pt-32 pb-32">
                        <span className="inline-block text-xs p-2 px-4 mb-5 rounded-full border border-white text-white font-serif">
                            {translatedData.HeroSection.fields.tagline.value}
                        </span>

                        <h1 className="font-bold font-serif mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                            <HighlightEfText
                                text={
                                    translatedData.HeroSection.fields.title
                                        .value
                                }
                            />
                        </h1>

                        <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-100 font-serif">
                            {translatedData.HeroSection.fields.paragraph.value}
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <a
                                target="_blank"
                                href={`${translatedData.HeroSection.fields.buttonText.buttonLink}`}
                                className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black hover:scale-105 transition-all duration-200 font-serif"
                            >
                                <span>
                                    {
                                        translatedData.HeroSection.fields
                                            .buttonText.value
                                    }
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                >
                                    <path
                                        d="M7 17L17 7M17 7H8M17 7V16"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 md:px-28 pt-20 pb-16">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#f1f1f1] p-4 rounded-3xl">
                        {/* Imagen de placeholder */}
                        <div className="h-[250px] w-full md:w-1/2">
                            <img
                                src={
                                    translatedData.WhyJoinSection.fields
                                        .imageLink
                                }
                                alt="Placeholder"
                                className="w-full h-full object-cover rounded-3xl shadow-lg"
                            />
                        </div>
                        {/* Contenido: pregunta y respuesta */}
                        <div className="md:w-1/2 pr-4">
                            <h2 className="text-2xl font-bold font-serif text-black mb-4">
                                {(() => {
                                    const text =
                                        translatedData.WhyJoinSection.fields
                                            .title.value;
                                    return text.replace(
                                        /'ae uni\S*/gi,
                                        "'AE Uniandes'"
                                    );
                                })()}
                            </h2>
                            <p className="text-sm text-gray-800 font-serif">
                                {
                                    translatedData.WhyJoinSection.fields
                                        .description.value
                                }
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                {
                                    translatedData.VideoSection.fields.tagline
                                        .value
                                }
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            {translatedData.VideoSection.fields.title.value}
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            {
                                translatedData.VideoSection.fields.description
                                    .value
                            }
                        </p>

                        {/* Contenedor del video */}
                        <div
                            className="relative w-full mx-auto aspect-video cursor-pointer"
                            onClick={() => setReproducir(true)}
                        >
                            {reproducir ? (
                                // Video de YouTube
                                <iframe
                                    className="w-full h-full rounded-3xl"
                                    src={
                                        translatedData.VideoSection.fields
                                            .videoLink
                                    }
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                // Imagen de carátula con botón de reproducción
                                <div className="relative w-full h-full">
                                    <img
                                        src={
                                            translatedData.VideoSection.fields
                                                .imageLink
                                        }
                                        alt="Carátula del video"
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                    {/* Botón de reproducción */}
                                    <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-bold rounded-3xl">
                                        <svg
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] flex items-center justify-center rounded-full p-3 hover:scale-[1.3] transition-all duration-200"
                                        >
                                            <path
                                                d="M8 5L19 12L8 19V5Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                {translatedData.ProjectsSection.tagline}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            {translatedData.ProjectsSection.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            {translatedData.ProjectsSection.description}
                        </p>

                        {/* Diseño con columnas para la sección de proyectos */}
                        <div className="columns-1 sm:columns-2 gap-6">
                            {translatedData.ProjectsSection.projects.map(
                                (proyecto, index) => (
                                    <div
                                        key={index}
                                        className="mb-6 break-inside-avoid rounded-3xl shadow-xls shadow-[#080808] flex flex-col bg-[#f1f1f1] p-5 lg:p-6 hover:shadow-2xl transition-all duration-200"
                                    >
                                        <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
                                            <img
                                                src={proyecto.image}
                                                alt={proyecto.title}
                                                className="w-full h-[470px] object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
                                            <div className="absolute bottom-0 left-0 w-full p-6 text-white flex items-start justify-between backdrop-blur-sm bg-[#ffffff31] rounded-b-2xl">
                                                <div>
                                                    <p className="text-sm font-bold font- text-white font-serif">
                                                        {
                                                            proyecto.responsableName
                                                        }
                                                    </p>
                                                    <p className="text-sm opacity-80 font-serif text-white">
                                                        {proyecto.vigencia
                                                            ? "Proyecto Vigente"
                                                            : "Proyecto Finalizado"}
                                                    </p>
                                                </div>
                                                <p className="text-sm opacity-80 font-serif text-white">
                                                    {proyecto.label}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-col items-start gap-2">
                                            <h2 className="text-xl font-semibold text-black font-serif">
                                                {proyecto.title}
                                            </h2>
                                            <p className="text-sm text-gray-800 font-serif">
                                                {proyecto.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="flex justify-center mt-4">
                            <Link
                                href={`${translatedData.ProjectsSection.buttonLink}`}
                            >
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    {translatedData.ProjectsSection.buttonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="hidden py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                {translatedData.EventsSection.tagline}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            {translatedData.EventsSection.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            {translatedData.EventsSection.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {translatedData.EventsSection.events.map(
                                (evento, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer relative mb-0 p-6 rounded-3xl shadow-lg overflow-hidden flex flex-col gap-4 justify-between text-white transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-gray-400"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={evento.imageLink}
                                                alt="s"
                                            />
                                            <div className="absolute inset-0 bg-[#0000008c] backdrop-blur-[5px]"></div>
                                        </div>

                                        <div className="relative z-10 flex flex-col gap-1">
                                            <span className="text-sm font-serif text-white">
                                                {evento.date}
                                            </span>
                                            <span className="text-3xl font-extrabold font-serif text-white">
                                                {evento.date}
                                            </span>
                                        </div>
                                        <div className="relative z-10 flex flex-col gap-2">
                                            <h2 className="font-extrabold text-xl font-serif text-white">
                                                {evento.title}
                                            </h2>
                                            <p className="text-sm font-serif text-white">
                                                {evento.description}
                                            </p>
                                        </div>
                                        <div className="relative z-10 flex items-center justify-between font-bold">
                                            <div className="flex flex-col gap-0 text-xs">
                                                <span className="font-serif text-white">
                                                    s - s
                                                </span>
                                                <span className="font-serif text-white">
                                                    {evento.modalidad}
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 font-bold mt-1">
                                                <span className="text-sm opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-serif text-white">
                                                    {evento.inscribirme}
                                                </span>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="flex justify-center mt-12">
                            <Link
                                href={`${translatedData.EventsSection.buttonLink}`}
                            >
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    {translatedData.EventsSection.buttonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                {translatedData.EventsSection.tagline}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            {translatedData.EventsSection.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            {translatedData.EventsSection.description}
                        </p>
                        <iframe
                            src="https://lu.ma/embed/calendar/cal-UNNJDLVBWrEroMd/events?past=true"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            className="rounded-xl shadow-lg"
                            title="Calendario de Eventos"
                            allowFullScreen
                        />
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                {translatedData.Biblioteca.tagline}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            {translatedData.Biblioteca.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            {translatedData.Biblioteca.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {translatedData.Biblioteca.books.map(
                                (libro, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-3xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src={libro.imageLink}
                                            alt={`Portada de ${libro.title}`}
                                            className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#000000bd] backdrop-blur-[5px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                            <h3 className="text-white text-base font-bold mb-2 text-center font-serif">
                                                {libro.title}
                                            </h3>
                                            <p className="text-white text-xs mb-2 text-center font-serif">
                                                {libro.author}
                                            </p>
                                            <p className="text-gray-300 text-xs text-center font-serif">
                                                {libro.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex justify-center mt-12">
                            <Link href={translatedData.Biblioteca.buttonLink} target="_blank">
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    {translatedData.Biblioteca.buttonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <PreguntasFrecuentes data={translatedData} />
            </main>
            <Footer data={translatedData} unirmeLink={translatedData.HeroSection.fields.buttonText.buttonLink} />
        </>
    );
}
