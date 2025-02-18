import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";
import Footer from "@/components/routes/home/Footer";
import HeaderHome from "@/components/routes/HeaderHome";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <HeaderHome />
            <main>
                <section className="relative">
                    <img
                        src="https://www.uniandes.edu.co/sites/default/files/news2/ml_uniandes_.jpg"
                        alt="Imagen de la sección"
                        className="w-full h-screen object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[90%]">
                        <span className="text-xs p-2 px-4 rounded-full border">
                            Unidos para transformar vidas
                        </span>
                        <h1 className="mt-4 text-4xl font-bold text-white">
                            ¿Cómo podemos ayudar a otros de la manera más{" "}
                            <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent font-serif italic text-5xl">
                                efectiva
                            </span>{" "}
                            posible?
                        </h1>
                        <p className="mt-4 text-sm text-gray-300">
                            Nuestra misión es impulsar el altruismo eficaz,
                            aplicando estrategias basadas en evidencia para
                            maximizar nuestro impacto.
                        </p>
                        <div className="flex items-center justify-center gap-2 w-full">
                            <button className="text-sm font-bold mt-6 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-800 text-white px-6 py-3 rounded-full hover:bg-red-600">
                                Más información
                            </button>
                            <button className="text-sm font-bold mt-6 border text-white px-6 py-3 rounded-full hover:bg-gray-800">
                                ¡Unirme ahora!
                            </button>
                        </div>

                        <div className="absolute top-[20px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#030303] to-[#030303] opacity-20 rounded-full blur-3xl -z-[20]"></div>
                    </div>
                </section>
                <section className="py-16 bg-black">
                    <div className="max-w-6xl mx-auto px-6 lg:px-28 flex flex-col md:flex-row items-center gap-8">
                        {/* Imagen de placeholder */}
                        <div className="md:w-1/2">
                            <img
                                src="https://placehold.co/600x300?text=Imagen%20aquí"
                                alt="Placeholder"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                        {/* Contenido: pregunta y respuesta */}
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-gray-100 mb-4">
                                ¿Por qué unirse a AE Uniandes?
                            </h2>
                            <p className="text-base text-gray-200">
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

                <section className="py-16 bg-black">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border text-xs text-center text-white">
                                Nuestros Proyectos
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">
                            Conoce nuestros proyectos destacados
                        </h2>
                        <p className="text-center text-gray-400 mb-12">
                            Descubre cómo estamos transformando ideas en
                            realidad.
                        </p>

                        {/* Diseño con columnas */}
                        <div className="columns-1 sm:columns-2 gap-6">
                            {[
                                {
                                    id: 1,
                                    nombre: "Proyecto Uno",
                                    autor: "Administrador",
                                    fecha: "Mar, 30 de Ago del 2023",
                                    categoria: "Innovación",
                                    descripcion:
                                        "Descripción breve del proyecto uno que destaca su innovación.",
                                    imagen: "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg",
                                },
                                {
                                    id: 2,
                                    nombre: "Proyecto Dos",
                                    autor: "Administrador",
                                    fecha: "Mar, 30 de Ago del 2023",
                                    categoria: "Tecnología",
                                    descripcion:
                                        "Proyecto que transforma ideas en soluciones concretas.",
                                    imagen: "https://placehold.co/600x400?text=Proyecto+Dos",
                                },
                            ].map((proyecto) => (
                                <Link href={"/proyecto"}>
                                    <div
                                        key={proyecto.id}
                                        className="mb-6 break-inside-avoid rounded-3xl shadow-lg flex flex-col"
                                    >
                                        <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
                                            <img
                                                src={proyecto.imagen}
                                                alt={proyecto.nombre}
                                                className="w-full h-[270px] object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
                                            <div className="absolute bottom-0 left-0 w-full p-6 text-white flex items-start justify-between backdrop-blur-sm bg-[#ffffff31] rounded-b-2xl">
                                                <div>
                                                    <p className="text-sm font-bold">
                                                        {proyecto.autor}
                                                    </p>
                                                    <p className="text-sm opacity-80">
                                                        {proyecto.fecha}
                                                    </p>
                                                </div>
                                                <p className="text-sm opacity-80">
                                                    {proyecto.categoria}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex flex-col items-start gap-2">
                                            <h2 className="text-xl font-semibold text-white">
                                                {proyecto.nombre}
                                            </h2>
                                            <p className="text-sm text-gray-200">
                                                {proyecto.descripcion}
                                            </p>
                                            <button className="text-xs p-2 px-4 rounded-full bg-white text-black font-bold mt-1 flex items-center gap-2 hover:bg-gray-100 transition-colors">
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
                                <button className="text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    Ver todos
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-black">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border text-xs text-center">
                                Testimonios
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">
                            ¡Saludos públicos para nosotros!
                        </h2>
                        <p className="text-center text-gray-400 mb-12">
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
                                    className="mb-4 break-inside-avoid bg-[#111111] p-6 rounded-3xl shadow-lg flex flex-col justify-start"
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
                                                <p className="text-base font-bold text-white">
                                                    {nombre}
                                                </p>
                                                <p className="text-sm text-gray-500">
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
                                                viewBox="0 0 30 30"
                                            >
                                                <path
                                                    d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"
                                                    fill="white"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Texto del testimonio */}
                                    <p className="text-gray-300 italic mt-4 text-sm">
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
