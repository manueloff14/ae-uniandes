"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import Link from "next/link";
import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";

/** Helper: elige una URL de imagen de Strapi sin repetir chains */
function pickStrapiImageUrl(media, fallback = "") {
    if (!media) return fallback;
    const fmts = media.formats ?? {};
    return (
        fmts?.medium?.url ||
        fmts?.large?.url ||
        fmts?.small?.url ||
        fmts?.thumbnail?.url ||
        media.url ||
        fallback
    );
}

export default function Home() {
    const { language } = useParams();

    const [loading, setLoading] = useState(true);
    const [headerData, setHeaderData] = useState(null);
    const [footerData, setFooterData] = useState(null);
    const [homeData, setHomeData] = useState(null);

    const [reproducir, setReproducir] = useState(false);

    useEffect(() => {
        const ctrl = new AbortController();

        async function load() {
            try {
                setLoading(true);

                // idioma desde URL o localStorage (cliente)
                let lang = "es";
                try {
                    lang = language ?? localStorage.getItem("language") ?? "es";
                    localStorage.setItem("language", lang);
                } catch {}

                const base = process.env.NEXT_PUBLIC_API_URL;
                const pLevel = 5;

                const [headerRes, homeRes, footerRes] = await Promise.all([
                    fetch(`${base}/api/header?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/home-page?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/footer?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                ]);

                if (!headerRes.ok || !homeRes.ok || !footerRes.ok) {
                    throw new Error(
                        `HTTP: header ${headerRes.status}, home ${homeRes.status}, footer ${footerRes.status}`
                    );
                }

                // Estos endpoints ya devuelven el JSON listo (o translated_json)
                const [headerJson, homeJson, footerJson] = await Promise.all([
                    headerRes.json(),
                    homeRes.json(),
                    footerRes.json(),
                ]);

                const header = headerJson?.translated_json ?? headerJson;
                const homeRaw = homeJson?.translated_json ?? homeJson;
                const footer = footerJson?.translated_json ?? footerJson;

                // Normaliza portada una sola vez
                const portadaUrl = pickStrapiImageUrl(
                    homeRaw?.HeroSection?.portada,
                    "/fallback-hero.jpg"
                );

                setHeaderData(header);
                setHomeData({
                    ...homeRaw,
                    HeroSection: {
                        ...homeRaw?.HeroSection,
                        portadaUrl,
                    },
                });
                setFooterData(footer);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Fallo cargando datos:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => ctrl.abort();
    }, [language]);

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
                            <span key={index} className=" font-inter">
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
                                <span className=" font-inter relative bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] bg-clip-text text-transparent">
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
                        <span key={index} className=" font-inter text-white">
                            {word}{" "}
                        </span>
                    );
                })}
            </>
        );
    }

    const home = homeData?.data;
    const header = headerData?.data;
    const footer = footerData?.data;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]"
                />
                <p className="mt-4 text-sm font-bold font-inter text-black">
                    Cargando...
                </p>
                <style jsx>{`
                    img {
                        animation: scale-up-down 0.5s ease-in-out infinite;
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

    return (
        <div>
            {headerData && <HeaderHome data={header} />}

            <main>
                <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                    {/* Fondo e imagen */}
                    <div className="absolute inset-0 z-[-20] overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={home.HeroSection.portada.url}
                            alt="Fondo Uniandes"
                        />
                        <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-[10px] z-[-10]" />
                    </div>

                    {/* Overlay adicional para oscurecer y aplicar un blur suave */}
                    <div className="absolute inset-0 bg-[#0000006b] backdrop-blur-[2px]" />

                    {/* Figuras decorativas */}
                    <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#a7a7a7] to-[#a1a1a1] opacity-20 rounded-full blur-3xl" />
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#000000] via-[#000000] to-[#1B607A] opacity-20 rounded-full blur-3xl" />

                    {/* Contenido principal */}
                    <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-56 pt-32 pb-32">
                        <span className="inline-block text-xs p-2 px-4 mb-5 rounded-full border border-white text-white  font-inter">
                            {home.HeroSection.preTitle}
                        </span>

                        <h1 className="relative font-bold mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                            <HighlightEfText
                                text={home.HeroSection.title.title}
                            />
                            <div className="absolute top-0 left-24 transform -translate-x-1/2 w-full h-64 bg-gradient-to-r from-transparent via-transparent to-[white] opacity-20 rounded-full blur-3xl" />
                        </h1>

                        <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-100 font-inter">
                            {home.HeroSection.subtitle}
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <a
                                target="_blank"
                                href={`${home.HeroSection.button.link}`}
                                className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black hover:scale-105 transition-all duration-200  font-inter"
                            >
                                <span>{home.HeroSection.button.text}</span>
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
                                src={home.whyAE.image.url}
                                alt="Placeholder"
                                className="w-full h-full object-cover rounded-3xl shadow-lg"
                            />
                        </div>
                        {/* Contenido: pregunta y respuesta */}
                        <div className="md:w-1/2 pr-4">
                            <h2 className="text-2xl font-bold  font-inter text-black mb-4">
                                {(() => {
                                    const text = home.whyAE.question;
                                    return text.replace(
                                        /'ae uni\S*/gi,
                                        "'AE Uniandes'"
                                    );
                                })()}
                            </h2>
                            <p className="text-sm text-gray-800  font-inter">
                                {home.whyAE.answer}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6 md:px-28">
                        <div className="flex justify-center mb-4">
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black  font-inter">
                                {home.importantVideo.info.preTitle}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2  font-inter">
                            {home.importantVideo.info.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12  font-inter">
                            {home.importantVideo.info.description}
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
                                    src={home.importantVideo.videoLink}
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                // Imagen de carátula con botón de reproducción
                                <div className="relative w-full h-full">
                                    <img
                                        src={home.importantVideo.portada.url}
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
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black  font-inter">
                                {home.importantEvents.info.preTitle}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2  font-inter">
                            {home.importantEvents.info.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12  font-inter">
                            {home.importantEvents.info.description}
                        </p>
                        <iframe
                            src={home.importantEvents.linkEmbed}
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
                            <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black  font-inter">
                                {home.books.info.preTitle}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-black mb-2  font-inter">
                            {home.books.info.title}
                        </h2>
                        <p className="text-center text-gray-700 mb-12  font-inter">
                            {home.books.info.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {home.books.book.map(
                                (libro, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-3xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src={libro.portada.url}
                                            alt={`Portada de ${libro.title}`}
                                            className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#000000bd] backdrop-blur-[5px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                                            <h3 className="text-white text-base font-bold mb-2 text-center  font-inter">
                                                {libro.title}
                                            </h3>
                                            {
                                                libro.author && (
                                                    <p className="text-white text-xs mb-2 text-center  font-inter">
                                                        {libro.author}
                                                    </p>
                                                )
                                            }
                                            <p className="text-gray-300 text-xs text-center  font-inter">
                                                {libro.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex justify-center mt-12">
                            <Link
                                href={home.books.buttonAction.link}
                                target="_blank"
                            >
                                <button className=" font-inter text-black bg-white p-3 px-6 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-200 active:scale-95 shadow-md">
                                    {home.books.buttonAction.text}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <PreguntasFrecuentes data={home} />
            </main>

            <Footer
                data={{
                    header,
                    footer,
                }}
                unirmeLink={
                    "s"
                }
            />
        </div>
    );
}
