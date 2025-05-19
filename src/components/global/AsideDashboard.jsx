"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AsideDashboard() {
    const router = useRouter();
    const url_base = "/admin";

    const handleLogout = () => {
        // Eliminar el token y redirigir al login
        localStorage.removeItem("token");
        router.push("/admin/login");
    };

    return (
        <header className="flex flex-col justify-between items-start fixed top-0 left-0 w-[15%] h-full text-black p-8 bg-[#f7f7f7] font-bold">
            <div className="w-full text-[17px]">
                <div className="logo mb-14">
                    <img
                        src="/ae-logo-black.svg"
                        alt="Logo"
                        className="w-[180px] h-auto"
                    />
                </div>
                <div className="w-full [&>ul>li]:w-full [&>ul>li>a]:flex [&>ul>li>a]:items-center [&>ul>li>a]:gap-3 [&>ul>li>a]:w-full">
                    <span className="font-bold text-xs font-serif">
                        ACCESOS DIRECTOS
                    </span>
                    <ul className="space-y-8 mt-6 [&>li>a]:text-black">
                        <li>
                            <Link
                                href={`${url_base}`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"
                                        fill="black"
                                    />
                                </svg>
                                Inicio
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                href={`${url_base}/miembros`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M 16 5 C 12.14 5 9 8.14 9 12 C 9 15.86 12.14 19 16 19 C 19.86 19 23 15.86 23 12 C 23 8.14 19.86 5 16 5 z M 32 5 C 28.14 5 25 8.14 25 12 C 25 15.86 28.14 19 32 19 C 35.86 19 39 15.86 39 12 C 39 8.14 35.86 5 32 5 z M 9.5 21 C 7.57 21 6 22.57 6 24.5 L 6 34 C 6 39.514 10.486 44 16 44 C 18.542 44 20.859 43.039703 22.625 41.470703 C 20.987 39.418703 20 36.824 20 34 L 20 24.5 C 20 23.172 20.474719 21.952 21.261719 21 L 9.5 21 z M 25.5 21 C 23.57 21 22 22.57 22 24.5 L 22 34 C 22 39.514 26.486 44 32 44 C 37.514 44 42 39.514 42 34 L 42 24.5 C 42 22.57 40.43 21 38.5 21 L 25.5 21 z"
                                        fill="black"
                                    />
                                </svg>
                                Miembros
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                href={`${url_base}/editar`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"
                                        fill="black"
                                    />
                                </svg>
                                Editar
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${url_base}/blog`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M14,2H4v20h16V8L14,2z M13,19H8v-2h5V19z M16,16H8v-2h8V16z M16,13H8v-2h8V13z M13,9V3.5L18.5,9H13z"
                                        fill="black"
                                    />
                                </svg>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${url_base}/formularios`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
                                        fill="black"
                                    />
                                </svg>
                                Formularios
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${url_base}/estadisticas`}
                                className="hover:text-blue-400 font-serif flex items-center gap-3"
                            >
                                <img
                                    className="w-[25px]"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nGNgGAXDBfzHgkctoH4Q/cdjyKgF1Asicg35P2oBCIwG0TBJRaOA/gAA8rizTdMxxx0AAAAASUVORK5CYII="
                                    alt="estadísticas"
                                />
                                Estadísticas
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full [&>ul>li]:w-full [&>ul>li>a, &>ul>li>button]:flex [&>ul>li>a, &>ul>li>button]:items-center [&>ul>li>a, &>ul>li>button]:gap-3 [&>ul>li>a, &>ul>li>button]:w-full">
                <span className="font-bold text-xs font-serif">
                    CONFIGURACIONES
                </span>
                <ul className="space-y-6 mt-6 [&>li>a]:text-black">
                    <li>
                        <Link
                            href={`${url_base}/configuracion`}
                            className="hover:text-blue-400 font-serif flex items-center gap-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M21,12c0-0.532-0.052-1.075-0.154-1.622l1.933-1.708l-2.505-4.339l-2.442,0.818c-0.83-0.705-1.786-1.256-2.812-1.621L14.505,1h-5.01L8.981,3.528C7.955,3.893,6.999,4.444,6.169,5.149L3.727,4.331L1.222,8.669l1.933,1.708C3.052,10.925,3,11.468,3,12s0.052,1.075,0.154,1.622l-1.933,1.708l2.505,4.339l2.442-0.818c0.83,0.705,1.786,1.256,2.812,1.621L9.495,23h5.01l0.514-2.528c1.026-0.365,1.982-0.917,2.812-1.621l2.442,0.818l2.505-4.339l-1.933-1.708C20.948,13.075,21,12.532,21,12z M12,15.5c-1.933,0-3.5-1.567-3.5-3.5s1.567-3.5,3.5-3.5s3.5,1.567,3.5,3.5S13.933,15.5,12,15.5z"
                                    fill="black"
                                />
                            </svg>
                            Configuración
                        </Link>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-[#ff6464] hover:text-[#ff4f4f] font-serif flex items-center gap-3"
                        >
                            <img
                                className="w-[20px]"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVElEQVR4nM3TXQoAEBAE4LmruYdXtx4pD36LJZnyZr7aLCBHpFYPRtEtANboBaB0x7lwBnCCaAcYIWqApRcpEVkA0ttHKMsGoC5vAn0ZX23i898YAc2dIij/HCI2AAAAAElFTkSuQmCC"
                                alt="exit"
                            />
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}
