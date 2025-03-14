"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";
import Footer from "@/components/routes/Footer";
import HeaderHome from "@/components/routes/HeaderHome";
import Link from "next/link";
import IdentidadSection from "@/components/routes/home/sections/IdentidadSection";

export default function Home() {
    const [reproducir, setReproducir] = useState(false);
    return (
        <>
            <HeaderHome />
            <main>
                <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                    {/* Fondo e imagen */}
                    <div className="absolute inset-0 z-[-20] overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="/img/uniandes.jpg"
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
                            Unidos para transformar vidas
                        </span>

                        <h1 className="font-bold font-serif mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                            ¿Cómo ayudar a otros de la manera más{" "}
                            <span className="relative bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] bg-clip-text text-transparent font-serif">
                                efectiva
                                <img
                                    src="/text-effect-2.svg"
                                    alt="Efecto decorativo"
                                    className="absolute z-[-1] left-1/2 -translate-x-1/2 top-full mt-[-35px] md:mt-[-30px] sm:mt-[-30px] w-[80%] h-auto rotate-[-2.5deg] scale-x-[-1]"
                                />
                            </span>
                            ?
                        </h1>

                        <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-300 font-serif">
                            Nuestra misión es impulsar el altruismo eficaz,
                            aplicando estrategias basadas en evidencia para
                            maximizar nuestro impacto.
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <button className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black hover:scale-105 transition-all duration-200 font-serif">
                                ¡Unirme ahora!
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
                            </button>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 md:px-28 pt-20 pb-16">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#f1f1f1] p-4 rounded-3xl">
                        {/* Imagen de placeholder */}
                        <div className="h-[250px] md:w-1/2">
                            <img
                                src="/img/ae-grupo.jpg"
                                alt="Placeholder"
                                className="w-full h-full object-cover rounded-3xl shadow-lg"
                            />
                        </div>
                        {/* Contenido: pregunta y respuesta */}
                        <div className="md:w-1/2 pr-4">
                            <h2 className="text-2xl font-bold font-serif text-black mb-4">
                                ¿Por qué unirse a AE Uniandes?
                            </h2>
                            <p className="text-sm text-gray-800 font-serif">
                                Al ser parte de AE Uniandes, te unes a un
                                movimiento comprometido con la transformación
                                social y el impacto positivo en la comunidad.
                                Nuestra red impulsa proyectos innovadores y
                                genera oportunidades de crecimiento para todos.
                                ¡Tu participación marca la diferencia!
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                En la Acción
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            Explora nuestras iniciativas más impactantes
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            Descubre cómo convertimos ideas en cambios reales.
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
                                    src="https://www.youtube.com/embed/WyprXhvGVYk"
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                // Imagen de carátula con botón de reproducción
                                <div className="relative w-full h-full">
                                    <img
                                        src="/img/WyprXhvGVYk_1280x720.jpg" // 🔄 Reemplázalo con tu imagen
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
                                Nuestros Proyectos
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            Conoce nuestros proyectos destacados
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            Descubre cómo estamos transformando ideas en
                            realidad.
                        </p>

                        {/* Diseño con columnas */}
                        <div className="columns-1 sm:columns-2 gap-6">
                            {[
                                {
                                    id: 1,
                                    nombre: "Reimaginando el Futuro",
                                    autor: "Santiago Ramírez",
                                    fecha: "Proyecto vigente",
                                    categoria: "Impacto social",
                                    descripcion: `El Semillero de Impacto Social ha permitido a estudiantes de primeros semestres desarrollar habilidades clave a través de proyectos reales y mentoría personalizada.<br/><br/>Gracias a este espacio, han podido transformar su pasión por el impacto social en acciones concretas, conectando con una comunidad comprometida con el cambio.`,
                                    imagen: "/img/proyecto-1.jpg",
                                },
                                {
                                    id: 2,
                                    nombre: "Reencuentro de Alumni de Altruismo Eficaz",
                                    autor: "Deiver Romero",
                                    fecha: "Proyecto vigente",
                                    categoria: "Networking",
                                    descripcion: `Este encuentro hace parte de una iniciativa en desarrollo que busca fortalecer los lazos entre profesionales altruistas y miembros altamente involucrados de la comunidad en etapas avanzadas de su carrera, creando oportunidades de mentoría y colaboración.  
<br/>A través de este espacio, queremos compartir experiencias, intercambiar ideas y explorar formas de generar un impacto aún mayor dentro y fuera de nuestra comunidad.`,
                                    imagen: "/img/proyecto-2.jpg",
                                },
                            ].map((proyecto) => (
                                <div
                                    key={proyecto.id}
                                    className="mb-6 break-inside-avoid rounded-3xl shadow-xls shadow-[#080808] flex flex-col bg-[#f1f1f1] p-5 lg:p-6 hover:shadow-2xl transition-all duration-200"
                                >
                                    <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
                                        <img
                                            src={proyecto.imagen}
                                            alt={proyecto.nombre}
                                            className="w-full h-[470px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 text-white flex items-start justify-between backdrop-blur-sm bg-[#ffffff31] rounded-b-2xl">
                                            <div>
                                                <p className="text-sm font-bold font-serif">
                                                    {proyecto.autor}
                                                </p>
                                                <p className="text-sm opacity-80 font-serif">
                                                    {proyecto.fecha}
                                                </p>
                                            </div>
                                            <p className="text-sm opacity-80 font-serif">
                                                {proyecto.categoria}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-col items-start gap-2">
                                        <h2 className="text-xl font-semibold text-black font-serif">
                                            {proyecto.nombre}
                                        </h2>
                                        <ReactMarkdown
                                            className="text-sm text-gray-800 font-serif prose"
                                            rehypePlugins={[rehypeRaw]}
                                        >
                                            {proyecto.descripcion}
                                        </ReactMarkdown>
                                        {/* <button className="font-serif text-xs p-2 px-4 rounded-full bg-white text-black font-bold mt-1 flex items-center gap-2 border-2 border-transparent hover:border-black transition-all duration-200 hover:scale-105">
                                            Leer ahora
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"
                                                    fill="black"
                                                ></path>
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link href={"/"}>
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    Ver todos
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                Eventos
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            Nuestros Eventos
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            ¡Explore los próximos eventos y únase a la acción!
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 1,
                                    mes: "Nov",
                                    dia: 15,
                                    nombre: "Conferencia de Innovación",
                                    descripcion:
                                        "Descubra cómo la innovación está transformando la sociedad.",
                                    hora: { inicio: "9:00", fin: "12:00" },
                                    tipo: "Presencial",
                                    img: "/img/eventos/evento-1.jpg",
                                },
                                {
                                    id: 2,
                                    mes: "Nov",
                                    dia: 25,
                                    nombre: "Taller de Emprendimiento",
                                    descripcion:
                                        "Aprenda a emprender y a crear soluciones innovadoras.",
                                    hora: { inicio: "14:00", fin: "17:00" },
                                    tipo: "Virtual",
                                    img: "/img/eventos/evento-2.jpg",
                                },
                                {
                                    id: 3,
                                    mes: "Dic",
                                    dia: 10,
                                    nombre: "Charla de Impacto",
                                    descripcion:
                                        "Conozca cómo el impacto social puede cambiar vidas.",
                                    hora: { inicio: "10:00", fin: "13:00" },
                                    tipo: "Presencial",
                                    img: "/img/eventos/evento-3.jpg",
                                },
                                {
                                    id: 4,
                                    mes: "Dic",
                                    dia: 20,
                                    nombre: "Conferencia de Solidaridad",
                                    descripcion:
                                        "Descubra cómo la solidaridad puede transformar comunidades.",
                                    hora: { inicio: "15:00", fin: "18:00" },
                                    tipo: "Virtual",
                                    img: "/img/eventos/evento-4.jpg",
                                },
                                {
                                    id: 5,
                                    mes: "Ene",
                                    dia: 5,
                                    nombre: "Taller de Creatividad",
                                    descripcion:
                                        "Aprenda a potenciar su creatividad y a innovar en su entorno.",
                                    hora: { inicio: "9:00", fin: "12:00" },
                                    tipo: "Presencial",
                                    img: "/img/eventos/evento-5.jpg",
                                },
                                {
                                    id: 6,
                                    mes: "Ene",
                                    dia: 15,
                                    nombre: "Charla de Cambio",
                                    descripcion:
                                        "Conozca cómo el cambio social puede impulsar la transformación.",
                                    hora: { inicio: "14:00", fin: "17:00" },
                                    tipo: "Virtual",
                                    img: "/img/eventos/evento-6.jpg",
                                },
                            ].map(
                                ({
                                    id,
                                    mes,
                                    dia,
                                    nombre,
                                    descripcion,
                                    hora,
                                    tipo,
                                    img,
                                }) => (
                                    <div
                                        key={id}
                                        className="cursor-pointer relative mb-0 p-6 rounded-3xl shadow-lg overflow-hidden flex flex-col gap-4 justify-between text-white transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-gray-400"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={img}
                                                alt={nombre}
                                            />
                                            <div className="absolute inset-0 bg-[#0000008c] backdrop-blur-[5px]"></div>
                                        </div>

                                        <div className="relative z-10 flex flex-col gap-1">
                                            <span className="text-sm font-serif">
                                                {mes}
                                            </span>
                                            <span className="text-3xl font-extrabold font-serif">
                                                {dia}
                                            </span>
                                        </div>
                                        <div className="relative z-10 flex flex-col gap-2">
                                            <h2 className="font-extrabold text-xl font-serif">
                                                {nombre}
                                            </h2>
                                            <p className="text-sm font-serif">
                                                {descripcion}
                                            </p>
                                        </div>
                                        <div className="relative z-10 flex items-center justify-between font-bold">
                                            <div className="flex flex-col gap-0 text-xs">
                                                <span className="font-serif">
                                                    {hora.inicio} - {hora.fin}
                                                </span>
                                                <span className="font-serif">
                                                    {tipo}
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 font-bold mt-1">
                                                <span className="text-sm opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-serif">
                                                    ¡Inscribirme!
                                                </span>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        stroke="currentColor"
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
                            <Link href={"/"}>
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    Ver todos
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                                Biblioteca
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            ¡Pide tu libro prestado!
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            Explora nuestro catálogo y solicita el préstamo de
                            tu libro favorito.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                                {
                                    id: 1,
                                    titulo: "The Precipice",
                                    autor: "Toby Ord",
                                    resumen:
                                        "Riesgos existenciales y el futuro de la humanidad.",
                                    cover: "https://images.cdn2.buscalibre.com/fit-in/360x360/61/4c/614c78b014e6e14996d5df405037436b.jpg",
                                },
                                {
                                    id: 2,
                                    titulo: "What We Owe The Future",
                                    autor: "William MacAskill",
                                    resumen:
                                        "Una visión de largo plazo para moldear el futuro de la humanidad de forma positiva.",
                                    cover: "https://m.media-amazon.com/images/I/61Vqr5z54PL._AC_UF1000,1000_QL80_.jpg",
                                },
                                {
                                    id: 3,
                                    titulo: "The Scout Mindset",
                                    autor: "Julia Galef",
                                    resumen:
                                        "Aprende a ver las cosas con claridad y tomar decisiones más inteligentes.",
                                    cover: "https://impactbooks.store/cdn/shop/products/image.jpg?v=1655480548",
                                },
                                {
                                    id: 4,
                                    titulo: "Doing Good Better",
                                    autor: "William MacAskill",
                                    resumen:
                                        "Cómo el altruismo eficaz puede ayudarte a marcar una mayor diferencia en el mundo.",
                                    cover: "https://m.media-amazon.com/images/I/61403U-SXEL.jpg",
                                },
                                {
                                    id: 5,
                                    titulo: "IA: Más Allá de los Algoritmos",
                                    autor: "Víctor M. Muñoz y María Paula Muñoz Ramírez",
                                    resumen:
                                        "Explorando la IA más allá del código.",
                                    cover: "https://www.planetadelibros.com.co/usuaris/libros/fotos/404/m_libros/portada_ia-mas-alla-de-los-algoritmos__202407151835.jpg",
                                },
                            ].map(({ id, titulo, autor, resumen, cover }) => (
                                <div
                                    key={id}
                                    className="relative group rounded-3xl overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={cover}
                                        alt={`Portada de ${titulo}`}
                                        className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-[#000000bd] backdrop-blur-[5px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                        <h3 className="text-white text-base font-bold mb-2 text-center font-serif">
                                            {titulo}
                                        </h3>
                                        <p className="text-white text-xs mb-2 text-center font-serif">
                                            {autor}
                                        </p>
                                        <p className="text-gray-300 text-xs text-center font-serif">
                                            {resumen}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-12">
                            <Link href={"/"}>
                                <button className="font-serif text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    Pedir un libro prestado
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <PreguntasFrecuentes />
            </main>
            <Footer />
        </>
    );
}
