"use client";

import { useRef, useEffect, useState } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import PreguntasFrecuentes from "@/components/routes/home/sections/FAQ";

export default function Fellowship() {
    // Referencias al contenedor scrollable (una para vigentes y otra para pasados)
    const scrollRefVigentes = useRef(null);
    const scrollRefPasados = useRef(null);

    const { language } = useParams();

    const [loading, setLoading] = useState(true);
    const [headerData, setHeaderData] = useState(null);
    const [footerData, setFooterData] = useState(null);
    const [pageData, setPageData] = useState(null);

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

                const [headerRes, pageRes, footerRes] = await Promise.all([
                    fetch(`${base}/api/header?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/fellowship-page?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                    fetch(`${base}/api/footer?pLevel=${pLevel}`, {
                        signal: ctrl.signal,
                    }),
                ]);

                if (!headerRes.ok || !pageRes.ok || !footerRes.ok) {
                    throw new Error(
                        `HTTP: header ${headerRes.status}, page ${pageRes.status}, footer ${footerRes.status}`
                    );
                }

                // Estos endpoints ya devuelven el JSON listo (o translated_json)
                const [headerJson, pageJson, footerJson] = await Promise.all([
                    headerRes.json(),
                    pageRes.json(),
                    footerRes.json(),
                ]);

                const header = headerJson?.translated_json ?? headerJson;
                const pageRaw = pageJson?.translated_json ?? pageJson;
                const footer = footerJson?.translated_json ?? footerJson;

                setHeaderData(header);
                setPageData(pageRaw);
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

    const page = pageData?.data;
    const header = headerData?.data;
    const footer = footerData?.data;

    // Funciones de scroll para la sección de "Proyectos vigentes"
    const scrollLeftVigentes = () => {
        if (scrollRefVigentes.current) {
            scrollRefVigentes.current.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth",
            });
        }
    };
    const scrollRightVigentes = () => {
        if (scrollRefVigentes.current) {
            scrollRefVigentes.current.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth",
            });
        }
    };

    // Funciones de scroll para la sección de "Proyectos pasados"
    const scrollLeftPasados = () => {
        if (scrollRefPasados.current) {
            scrollRefPasados.current.scrollBy({
                top: 0,
                left: -300,
                behavior: "smooth",
            });
        }
    };
    const scrollRightPasados = () => {
        if (scrollRefPasados.current) {
            scrollRefPasados.current.scrollBy({
                top: 0,
                left: 300,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <img
                    src="/ae-icon.svg"
                    alt="Logo"
                    className="w-[55px] h-[55px]"
                />
                <p className="mt-4 text-sm font-bold font-serif text-black">
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

    const data = {
        frequentlyQuestions: {
            id: 4,
            title: "Preguntas Frecuentes",
            question: [
                {
                    question: "¿Cuál es el formato de la Arete Fellowship?",
                    answer: "La beca consiste en una serie de 7 sesiones presenciales de 2 horas cada una, basadas en lecturas y discusiones con 5–8 participantes y 1–2 líderes de discusión. Los líderes plantean preguntas sobre las lecturas, pero la mayor parte de la conversación la llevan los participantes.",
                },
                {
                    question:
                        "¿Cuándo se llevarán a cabo las secciones? ¿Qué ocurre si no puedo asistir a alguno de los horarios?",
                    answer: "En la solicitud se muestra una lista de franjas horarias. Si no puedes asistir a ninguna, intentaremos acomodar tus preferencias; si no es posible, podrás participar en otro semestre sin necesidad de volver a postularte.",
                },
                {
                    question:
                        "¿Quién debería postularse a la Arete Fellowship?",
                    answer: "La beca es una excelente introducción al altruismo eficaz para estudiantes de Uniandes de cualquier facultad que nunca hayan oído hablar de AE Uniandes o no estén muy involucrados. Si ya participas en AE Uniandes, explora el sitio de AE Uniandes o contacta a miembros actuales para oportunidades más específicas.",
                },
                {
                    question: "¿Cuánto tiempo deben dedicar los participantes?",
                    answer: "Aproximadamente la mitad de cada sesión de dos horas se dedica a leer los artículos asignados y la otra mitad a la discusión.",
                },
                {
                    question:
                        "¿Puedo participar en la Arete Fellowship si no soy estudiante de Uniandes?",
                    answer: "Cualquier persona afiliada a Uniandes puede unirse. Si no lo estás, te recomendamos el Programa Virtual Introductorio de EA (https://www.effectivealtruism.org/virtual-programs/introductory-program).",
                },
                {
                    question:
                        "¿Cuál es el cronograma de la beca, incluida la fecha límite de solicitud?",
                    answer: "Las solicitudes para el primer semestre de 2025 deben presentarse antes del 9 de febrero de 2025. La beca se desarrollará durante siete semanas a partir de la semana del 17 de febrero de 2025.",
                },
                {
                    question:
                        "¿A quién debo contactar para preguntas adicionales?",
                    answer: "Por favor, envía un correo a altruismoeficaz@uniandes.edu.co con cualquier duda.",
                },
            ],
        },
    };

    console.log("page:", page);

    return (
        <div>
            <HeaderHome data={header} />

            {/* Sección Hero (primera sección) */}
            <section className="relative w-full min-h-screen flex flex-col justify-center text-center">
                {/* Fondo e imagen */}
                <div className="absolute inset-0 z-[-20] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={page.heroSection.portada.url}
                        /* src={translatedData.hero.imageLink} */
                        alt="Fondo Uniandes"
                    />
                    <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-[10px] z-[-10]" />
                </div>

                {/* Overlay adicional */}
                <div className="absolute inset-0 bg-[#00000044] backdrop-blur-[2px]" />

                {/* Figuras decorativas */}
                <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#a7a7a7] to-[#a1a1a1] opacity-20 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 transform -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#000000] via-[#000000] to-[#1B607A] opacity-20 rounded-full blur-3xl" />

                {/* Contenido principal */}
                <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-56 pt-32 pb-32">
                    <h1 className="font-bold font-inter mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-[90%] mx-auto text-white">
                        {page.heroSection.title.title}
                        {/* {translatedData.hero.title} */}
                    </h1>
                    <p className="mb-8 text-base md:text-lg mx-auto w-[80%] md:w-[60%] lg:w-[40%] text-gray-200 font-inter">
                        {page.heroSection.subtitle}
                        {/* Maximiza tu impacto en siete semanas de lecturas,
                        debates y mentoría práctica para aplicar evidencia y
                        colaborar con líderes del cambio.
                        {/* {translatedData.hero.description} */}
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 md:px-28 py-16 pb-20 font-inter">
                <article
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>

            {page.buttonApply.link ? (
                <div className="flex flex-col items-center justify-center">
                    <a href={page.buttonApply.link}>
                        <button className="bg-[#1B607A] text-white py-2 px-4 rounded-full text-center font-inter font-bold">
                            {page.buttonApply.text}
                        </button>
                    </a>
                    <span className="text-black font-inter text-xs mt-6">
                        Contacta al equipo de la Arete Fellowship en{" "}
                        <a
                            className="text-blue-500"
                            href="mailto:altruismoeficaz@uniandes.edu.co"
                        >
                            altruismoeficaz@uniandes.edu.co
                        </a>
                        .
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <button className="cursor-not-allowed bg-[#1B607A] text-white py-2 px-4 rounded-full text-center font-inter font-bold">
                            ¡POR EL MOMENTO NO ESTÁ DISPONIBLE!
                        </button>
                    </div>
                    <span className="text-black font-inter text-xs mt-6">
                        Contacta al equipo de la Arete Fellowship en{" "}
                        <a
                            className="text-blue-500"
                            href="mailto:altruismoeficaz@uniandes.edu.co"
                        >
                            altruismoeficaz@uniandes.edu.co
                        </a>
                        .
                    </span>
                </div>
            )}

            <PreguntasFrecuentes data={page} />

            <div className="py-6"></div>

            {/* Estilos específicos para este componente */}
            <style jsx>{`
                /* Oculta la barra de scroll en Chrome/Safari */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Oculta la barra de scroll en IE, Edge y Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Footer data={{ header, footer }} />
        </div>
    );
}
