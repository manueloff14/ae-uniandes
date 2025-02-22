"use client";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="text-gray-400 py-8 px-2 md:px-20">
            <div className="p-4 md:p-6 rounded-3xl bg-[#181818]">
                <div className="space-y-8">
                    {/* Sección: Título, descripción y CTA */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                ¿Quieres hacer parte del cambio?
                            </h2>
                            <p className="text-sm mb-4">
                                Únete ahora para aportar
                            </p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
                            Unirme
                        </button>
                    </div>

                    {/* Sección: Logo, tagline y enlaces */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        {/* Logo y tagline */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={25}
                                    height={25}
                                />
                                <span className="text-lg font-bold text-white">
                                    AE Uniandes
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">
                                ¿Cómo podemos ayudar a otros de la manera más
                                efectiva posible?
                            </span>
                        </div>

                        {/* Enlaces de navegación */}
                        <ul className="flex flex-col items-start md:flex-row md:items-center gap-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Acerca de AE
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Proyectos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Eventos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-xs hover:text-white transition"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sección inferior: Copyright y redes */}
                <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-800 pt-4 text-xs">
                    <span>
                        &copy; {new Date().getFullYear()} AE Uniandes, Todos los
                        derechos reservados.
                    </span>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="hover:text-white transition"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="hover:text-white transition"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="hover:text-white transition"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="hover:text-white transition"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
