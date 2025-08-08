"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";
import { useParams } from "next/navigation";
import IdentidadSection from "@/components/routes/home/sections/IdentidadSection";

export default function AcercaAEPage() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [modalAnimation, setModalAnimation] = useState(false);
    const { language } = useParams(); // Se espera que la URL tenga /[language]/page.jsx, por ejemplo, /en
    const [loading, setLoading] = useState(true);
    const [translatedData, setTranslatedData] = useState(null);

    // Hook para bloquear el scroll cuando se abre el modal
    useEffect(() => {
        // Bloquea o desbloquea el scroll del body según si el modal está abierto o no
        document.body.style.overflow = selectedMember ? "hidden" : "auto";
    }, [selectedMember]);

    // Hook para cargar los datos traducidos
    useEffect(() => {
        const savedLanguage =
            language || localStorage.getItem("language") || "es"; // Usa language de la URL o el valor guardado
        localStorage.setItem("language", savedLanguage);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/traducir`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lang: savedLanguage,
                section: "AcercaDeAE", // Asegúrate de que la sección sea la correcta
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
    }, [language]); // Solo depende de language

    // Función para abrir el modal con animación de entrada
    const openModal = (member) => {
        setSelectedMember(member);
        setModalAnimation(false);
        setTimeout(() => {
            setModalAnimation(true);
        }, 10);
    };

    // Función para cerrar el modal con animación de salida
    const closeModal = () => {
        setModalAnimation(false);
        setTimeout(() => {
            setSelectedMember(null);
        }, 300);
    };

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

    if (!translatedData) {
        return <div>Error al cargar datos traducidos.</div>;
    }

    const voluntariosCount = translatedData?.voluntarios?.miembros?.length;
    const coordinadoresCount = translatedData?.coordinadores?.miembros?.length;

    const coordinadoresGrid = `grid-cols-${coordinadoresCount}`;
    const voluntariosGrid = `grid-cols-${voluntariosCount}`;
    

    return (
        <div>
            <HeaderHome black={true} data={translatedData} />

            <main>
                <section className="pt-28 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:py-40 lg:px-28">
                    <div className="flex justify-center mb-4">
                        <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                            {translatedData.coordinadores.tagline}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-serif">
                        {translatedData.coordinadores.title}
                    </h2>
                    <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-serif">
                        {translatedData.coordinadores.description}
                    </p>

                    {/* Contenedor de integrantes */}
                    <div
                        className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:${coordinadoresGrid}`}
                    >
                        {translatedData?.coordinadores?.miembros?.map(
                            (member) => (
                                <div
                                    key={member.id ?? member.name}
                                    className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                                >
                                    <img
                                        src={member.imageLink}
                                        alt={`Integrante ${member.name}`}
                                        className="w-[280px] h-[280px] rounded-3xl object-cover mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-black font-serif">
                                        {member.name}
                                    </h3>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="pt-10 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:py-40 lg:pt-10 lg:px-96">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-serif">
                        {translatedData.voluntarios.title}
                    </h2>
                    <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-serif">
                        {translatedData.voluntarios.description}
                    </p>

                    {/* Contenedor de voluntarios */}
                    <div
                        className={`grid gap-8 font-serif grid-cols-1 sm:${voluntariosGrid}`}
                    >
                        {translatedData?.voluntarios?.miembros?.map(
                            (member) => (
                                <div
                                    key={member.id ?? member.name}
                                    className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
                                >
                                    <img
                                        src={member.imageLink}
                                        alt={`Integrante ${member.name}`}
                                        className="w-[280px] h-[280px] rounded-3xl object-cover mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-black font-serif">
                                        {member.name}
                                    </h3>
                                </div>
                            )
                        )}
                    </div>
                </section>
            </main>

            {/* Modal para mostrar detalles del miembro */}
            {selectedMember && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-[200]"
                    onClick={closeModal}
                >
                    {/* Fondo semitransparente */}
                    <div
                        className="absolute inset-0 bg-[#ffffff75] backdrop-blur-[3px] transition-opacity duration-300"
                        aria-hidden="true"
                    ></div>

                    <div
                        className={`relative bg-[#f1f1f1] shadow-xl shadow-gray-300 rounded-3xl p-4 max-w-3xl w-full mx-4 z-50 transform transition-all duration-300 h-auto overflow-y-auto ${
                            modalAnimation
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            X
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Panel Izquierdo */}
                            <div className="md:w-1/3 border-r border-gray-300 pr-4 flex flex-col items-center">
                                <img
                                    src={selectedMember.imageLink}
                                    alt={`Integrante ${selectedMember.name}`}
                                    className="w-[150px] h-[150px] rounded-3xl object-cover mb-4"
                                />
                                <h3 className="text-2xl font-bold text-center mb-2 text-black">
                                    {selectedMember.name}
                                </h3>
                                <div>
                                    <p className="text-center text-gray-700 mb-4">
                                        {selectedMember.role}
                                    </p>
                                    <div className="flex justify-center space-x-4 mb-5">
                                        <a
                                            href={
                                                selectedMember.social.facebook
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 hover:scale-[1.2] transition-all duration-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M11.666,2.005C6.62,2.17,2.374,6.251,2.025,11.288c-0.369,5.329,3.442,9.832,8.481,10.589V14.65H8.892 c-0.726,0-1.314-0.588-1.314-1.314v0c0-0.726,0.588-1.314,1.314-1.314h1.613v-1.749c0-2.896,1.411-4.167,3.818-4.167 c0.357,0,0.662,0.008,0.921,0.021c0.636,0.031,1.129,0.561,1.129,1.198v0c0,0.663-0.537,1.2-1.2,1.2h-0.442 c-1.022,0-1.379,0.969-1.379,2.061v1.437h1.87c0.591,0,1.043,0.527,0.953,1.111l-0.108,0.701c-0.073,0.47-0.477,0.817-0.953,0.817 h-1.762v7.247C18.235,21.236,22,17.062,22,12C22,6.366,17.341,1.821,11.666,2.005z"
                                                    fill="#11809D"
                                                ></path>
                                            </svg>
                                        </a>
                                        <a
                                            href={
                                                selectedMember.social.instagram
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:text-pink-800 hover:scale-[1.2] transition-all duration-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M 16.5 5 C 10.159 5 5 10.159 5 16.5 L 5 31.5 C 5 37.841 10.159 43 16.5 43 L 31.5 43 C 37.841 43 43 37.841 43 31.5 L 43 16.5 C 43 10.159 37.841 5 31.5 5 L 16.5 5 z M 34 12 C 35.105 12 36 12.895 36 14 C 36 15.104 35.105 16 34 16 C 32.895 16 32 15.104 32 14 C 32 12.895 32.895 12 34 12 z M 24 14 C 29.514 14 34 18.486 34 24 C 34 29.514 29.514 34 24 34 C 18.486 34 14 29.514 14 24 C 14 18.486 18.486 14 24 14 z M 24 17 A 7 7 0 1 0 24 31 A 7 7 0 1 0 24 17 z"
                                                    fill="#11809D"
                                                ></path>
                                            </svg>
                                        </a>
                                        <a
                                            href={
                                                selectedMember.social.linkedin
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 hover:scale-[1.2] transition-all duration-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 50 50"
                                            >
                                                <path
                                                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                                                    fill="#11809D"
                                                ></path>
                                            </svg>
                                        </a>
                                        <a
                                            href={selectedMember.social.x}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-700 hover:text-gray-900 hover:scale-[1.2] transition-all duration-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 50 50"
                                            >
                                                <path
                                                    d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"
                                                    fill="#11809D"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    {/* <p className="text-gray-800 mb-2">
                                        <strong>Nacimiento:</strong>{" "}
                                        {selectedMember.dob}
                                    </p> */}
                                    <p className="text-gray-800 mb-4">
                                        <strong>Estudios:</strong>{" "}
                                        {selectedMember.studies}
                                    </p>
                                    <p className="text-gray-800 mb-4">
                                        <strong>Universidad:</strong>{" "}
                                        <a
                                            href="https://www.uniandes.edu.co"
                                            target="_black"
                                        >
                                            Universidad de Los Andes
                                        </a>
                                    </p>

                                    <div className="text-center">
                                        <span className="font-bold text-center">
                                            Agendar uno a uno
                                        </span>
                                        <a
                                            className="mt-2 bg-white border rounded-xl p-2 px-3"
                                            href="https://calendly.com/denverparamo19/30min?month=2025-05"
                                            target="_blank"
                                        >
                                            <img
                                                className=""
                                                src="https://images.squarespace-cdn.com/content/v1/61afae73df19ee3879a26ab9/1638903671873-B54ETTH512UZRSHSG1FA/CC_CalendlyLogo.png"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3 pl-4 mt-4 md:mt-0 h-[550px] overflow-y-auto custom-scrollbar pr-2">
                                <ReactMarkdown className="prose text-black">
                                    {selectedMember.bio}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <IdentidadSection data={translatedData} />

            <section className="pt-10 pb-16 px-4 sm:py-28 sm:px-8 md:py-32 md:px-16 lg:pb-40 lg:pt-28 lg:px-28">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border text-xs text-center text-black font-serif">
                        {translatedData.ImpactoEficaz.tagline}
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-2 font-serif">
                    {translatedData.ImpactoEficaz.title}
                </h2>
                <p className="text-center text-gray-800 mt-4 mb-12 max-w-3xl mx-auto font-serif">
                    {translatedData.ImpactoEficaz.description}
                </p>
            </section>

            <section className="bg-white mb-36">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center rounded-[2.5rem] overflow-hidden shadow-md bg-gray-100">
                        {/* Imagen con gradiente */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                            <img
                                src={translatedData.AEGlobal.imageLink}
                                alt="Foto grupal de la comunidad"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Capa de gradiente: móvil hacia arriba, tablet/PC hacia la derecha */}
                            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-gray-100" />
                        </div>

                        {/* Contenido textual */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col items-start gap-2 md:text-left">
                            <img
                                className="w-[150px]"
                                src={translatedData.AEGlobal.aeLogoLink}
                                alt="Logo EA"
                            />
                            <p className="text-gray-600 mt-2 text-lg md:text-xl font-serif">
                                {translatedData.AEGlobal.text}
                            </p>
                            <a
                                href={translatedData.AEGlobal.button.buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer p-4 px-5 flex items-center gap-2 bg-gradient-to-r from-[#06869b] via-[#11809D] to-[#1B607A] mt-4 text-sm font-serif font-bold rounded-full hover:scale-110 transition-all duration-200"
                            >
                                {translatedData.AEGlobal.button.text}
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
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer data={translatedData} />
        </div>
    );
}
