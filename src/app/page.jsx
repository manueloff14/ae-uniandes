"use client";

import { useState } from "react";
import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";
import Footer from "@/components/routes/Footer";
import HeaderHome from "@/components/routes/HeaderHome";
import Link from "next/link";

export default function Home() {
    const [reproducir, setReproducir] = useState(false);
    return (
        <>
            <HeaderHome />
            <main>
                <section className="">
                    <div className="py-40 pt-32 text-center w-full px-6 md:px-12 lg:px-20 xl:px-56">
                        <span className="text-xs p-2 px-4 rounded-full border border-black text-black font-serif">
                            Unidos para transformar vidas
                        </span>
                        <h1 className="font-bold font-serif my-10 text-5xl sm:text-4xl md:text-6xl lg:text-7xl w-[90%] m-auto text-black">
                            ¿Cómo ayudar a otros de la manera más{" "}
                            <span className="relative bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] bg-clip-text text-transparent font-serif text-6xl md:text-7xl lg:text-8xl">
                                efectiva
                                <img
                                    src="/text-effect-2.svg"
                                    alt="Efecto decorativo"
                                    className="absolute z-[-1] left-1/2 -translate-x-1/2 top-full mt-[-35px] md:mt-[-40px] sm:mt-[-30px] w-[80%] h-auto rotate-[-2.5deg] scale-x-[-1]"
                                />
                            </span>
                            ?
                        </h1>
                        <p className="mb-4 text-base md:text-lg m-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-900 font-serif">
                            Nuestra misión es impulsar el altruismo eficaz,
                            aplicando estrategias basadas en evidencia para
                            maximizar nuestro impacto.
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <button className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black hover:scale-125 transition-all duration-200 font-serif">
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

                        <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#a7a7a7] to-[#a1a1a1] opacity-20 rounded-full blur-3xl -z-[20]"></div>

                        <div className="absolute top-[0px] left-0 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] opacity-20 rounded-full blur-3xl -z-[20]"></div>

                        <ul className="flex gap-4 mt-16 m-auto justify-center items-center flex-wrap">
                            <li className="relative w-full h-[250px] md:w-[45%] lg:w-[35%] xl:w-[22%] bg-[#1E1E1E] rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl hover:shadow-black hover:scale-105">
                                <img
                                    src="https://www.uniandes.edu.co/sites/default/files/news2/ml_uniandes_.jpg"
                                    alt="Placeholder"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 right-4 border-2 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] rounded-full flex items-center justify-center p-4 shadow-2xl shadow-black">
                                    <span className="text-white font-semibold text-base text-center">
                                        Transformando el futuro
                                    </span>
                                </div>
                            </li>
                            <li className="relative w-full h-[250px] md:w-[45%] lg:w-[35%] xl:w-[30%] xl:h-[270px] bg-[#1E1E1E] rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl hover:shadow-black hover:scale-105">
                                <img
                                    src="https://www.uniandinos.org.co/wp-content/uploads/2021/11/2WhatsApp-Image-2021-11-16-at-11.20.24-PM.jpeg"
                                    alt="Placeholder"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 right-4 border-2 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] rounded-full flex items-center justify-center p-4 shadow-2xl shadow-black">
                                    <span className="text-white font-semibold text-base">
                                        Evidencia y acción
                                    </span>
                                </div>
                            </li>
                            <li className="relative w-full h-[250px] md:w-[45%] lg:w-[35%] xl:w-[22%] bg-[#1E1E1E] rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl hover:shadow-black hover:scale-105">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Uniandes_Campus.jpg"
                                    alt="Placeholder"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 right-4 border-2 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] rounded-full flex items-center justify-center p-4 shadow-2xl shadow-black">
                                    <span className="text-white font-semibold text-base">
                                        Solidaridad inteligente
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 md:px-28 pt-20 pb-16">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#f1f1f1] p-4 rounded-3xl">
                        {/* Imagen de placeholder */}
                        <div className="h-[250px] md:w-1/2">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6159d5d6bdaf2c6fb47aa0ce/a45b6188-7e0a-462d-bd9b-176bb139c74e/1654196864881.JPG?format=2500w"
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
                                    src="https://www.youtube.com/embed/5NV6Rdv1a3I?autoplay=1"
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                // Imagen de carátula con botón de reproducción
                                <div className="relative w-full h-full">
                                    <img
                                        src="https://highwaymagazine.files.wordpress.com/2015/11/effective-altrusim-peter-singer-revista-highway.jpg" // 🔄 Reemplázalo con tu imagen
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
                                    autor: "Administrador",
                                    fecha: "Mar, 30 de Jul",
                                    categoria: "Innovación",
                                    descripcion:
                                        "Una iniciativa revolucionaria que impulsa el cambio con creatividad y tecnología.",
                                    imagen: "https://images.squarespace-cdn.com/content/v1/6159d5d6bdaf2c6fb47aa0ce/04ca8f36-49cb-4b29-9ea9-40aaa1099c5e/_MG_2879.jpg",
                                },
                                {
                                    id: 2,
                                    nombre: "De la Idea a la Realidad",
                                    autor: "Administrador",
                                    fecha: "Mar, 30 de Jul",
                                    categoria: "Tecnología",
                                    descripcion:
                                        "Transformando ideas en soluciones reales para un futuro más eficiente.",
                                    imagen: "https://lirp.cdn-website.com/13a02d1f/dms3rep/multi/opt/Altruismo+eficaz+en+Rotary-640w.jpeg",
                                },
                            ].map((proyecto) => (
                                <Link href={"/proyecto"}>
                                    <div
                                        key={proyecto.id}
                                        className="mb-6 break-inside-avoid rounded-3xl shadow-xls shadow-[#080808] flex flex-col bg-[#f1f1f1] p-5 lg:p-6 hover:shadow-2xl transition-all duration-200"
                                    >
                                        <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
                                            <img
                                                src={proyecto.imagen}
                                                alt={proyecto.nombre}
                                                className="w-full h-[270px] object-cover"
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
                                            <p className="text-sm text-gray-800 font-serif">
                                                {proyecto.descripcion}
                                            </p>
                                            <button className="font-serif text-xs p-2 px-4 rounded-full bg-white text-black font-bold mt-1 flex items-center gap-2 border-2 border-transparent hover:border-black transition-all duration-200 hover:scale-105">
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
                                            </button>
                                        </div>
                                    </div>
                                </Link>
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
                            ¡Participe y haga historia con nosotros!
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
                                },
                            ].map(
                                (
                                    {
                                        id,
                                        mes,
                                        dia,
                                        nombre,
                                        descripcion,
                                        hora,
                                        tipo,
                                    },
                                    index
                                ) => (
                                    <div
                                        key={id}
                                        className={`cursor-pointer relative mb-0 p-6 rounded-3xl shadow-lg flex flex-col gap-4 justify-between text-black transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-gray-400 ${
                                            index % 2 === 0
                                                ? "bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white"
                                                : "bg-[#f1f1f1]"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-serif">
                                                {mes}
                                            </span>
                                            <span className="text-3xl font-extrabold font-serif">
                                                {dia}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="font-extrabold text-xl font-serif">
                                                {nombre}
                                            </h2>
                                            <p className="text-sm font-serif">
                                                {descripcion}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between font-bold">
                                            <div className="flex flex-col gap-0 text-xs">
                                                <span className="font-serif">
                                                    {hora.inicio} - {hora.fin}
                                                </span>
                                                <span className="font-serif">
                                                    {tipo}
                                                </span>
                                            </div>
                                            {/* Botón con animación */}
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
                                Testimonios
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                            ¡Saludos públicos para nosotros!
                        </h2>
                        <p className="text-center text-gray-700 mb-12 font-serif">
                            ¡Descubra cómo las personas están haciendo correr la
                            voz!
                        </p>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                            {[
                                {
                                    id: 1,
                                    nombre: "Hikmet Atçeken",
                                    username: "@hiatceken",
                                    texto: "Pulsefy's our daily tool to bypass averages and reveal true insights, for the whole team!",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                                {
                                    id: 2,
                                    nombre: "Arda Guler",
                                    username: "@ardaguler_",
                                    texto: "Pulsefy levels the analytics field for our team, enabling both beginners and pros to easily bypass average data and uncover actionable insights!",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                                {
                                    id: 3,
                                    nombre: "Maria Ancelotti",
                                    username: "@maria_ancelotti",
                                    texto: "From novice to pro, Pulsefy helps our team uncover the extraordinary in our marketing data!",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                                {
                                    id: 4,
                                    nombre: "Ragip Diler",
                                    username: "@rgdiler",
                                    texto: "Pulsefy empowers our whole team, techies or not, to dive into marketing analytics and spot the insights that really matter—no more average data!",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                                {
                                    id: 5,
                                    nombre: "Jenny Wilson",
                                    username: "@wilson_jenny19",
                                    texto: "Pulsefy’s user-friendly analytics let our whole team, regardless of skill, bypass averages to unearth real, game-changing marketing insights every day.",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                                {
                                    id: 6,
                                    nombre: "Guy Hawkins",
                                    username: "@ghawkins",
                                    texto: "Pulsefy is a game-changer for our team—easy for beginners and powerful for digging beyond average data!",
                                    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                                },
                            ].map(({ id, nombre, username, texto, imagen }) => (
                                <div
                                    key={id}
                                    // break-inside evita que se parta la tarjeta en columnas
                                    className="mb-4 break-inside-avoid bg-[#f1f1f1] p-6 rounded-3xl shadow-lg flex flex-col justify-start"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {/* Imagen de perfil */}
                                            <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
                                                <img
                                                    src={imagen}
                                                    alt={`Foto de ${nombre}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Nombre y usuario */}
                                            <div className="text-left">
                                                <p className="text-base font-bold text-black font-serif">
                                                    {nombre}
                                                </p>
                                                <p className="text-sm text-gray-700 font-serif">
                                                    {username}
                                                </p>
                                            </div>
                                        </div>
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="30"
                                                height="30"
                                                viewBox="0 0 50 50"
                                            >
                                                <path
                                                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                                                    fill="black"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Texto del testimonio */}
                                    <p className="text-gray-700 italic mt-4 text-sm font-serif">
                                        "{texto}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PreguntasFrecuentes />
            </main>
            <Footer />
        </>
    );
}
