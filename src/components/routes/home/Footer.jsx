"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="text-gray-300 py-12 px-6 md:px-8 lg:px-20">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Logo, descripción y redes sociales */}
                <div className="mr-4 text-center lg:text-left">
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={25}
                            height={25}
                        />
                        <h2 className="text-3xl font-bold font-serif italic">
                            AE Uniandes
                        </h2>
                    </div>
                    <p className="mt-4 text-sm">
                        Promoviendo el altruismo eficaz y el impacto social en
                        cada acción.
                    </p>
                    <div className="mt-4 flex justify-center lg:justify-start space-x-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                {/* Enlaces rápidos y contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold mb-4">
                            Enlaces Rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-white transition-colors"
                                >
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/projects"
                                    className="hover:text-white transition-colors"
                                >
                                    Proyectos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold mb-4">
                            Contáctanos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="font-semibold">Tel:</span> +57
                                1234567890
                            </li>
                            <li>
                                <span className="font-semibold">Email:</span>{" "}
                                info@aeuniandes.org
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Dirección:
                                </span>{" "}
                                Bogotá, Colombia
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="mt-8 border-t border-gray-800 pt-4">
                <div className="max-w-6xl mx-auto text-center text-sm">
                    &copy; {new Date().getFullYear()} AE Uniandes. Todos los
                    derechos reservados.
                </div>
            </div>
        </footer>
    );
}
