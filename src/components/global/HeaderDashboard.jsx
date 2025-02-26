import Link from "next/link";

export default function HeaderDashboard() {
    return (
        <header className="flex flex-col justify-between items-start fixed top-0 left-0 w-[250px] h-full bg-gray-800 text-white p-6">
            <div className="logo mb-6">
                <img
                    src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-15.png"
                    alt="Logo"
                    className="w-full h-auto"
                />
            </div>
            <div className="directos mb-6">
                <span className="font-bold text-xl mb-3">ACCESOS DIRECTOS</span>
                <ul className="space-y-3">
                    <li>
                        <Link href="/dashboard" className="hover:text-blue-400">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/miembros" className="hover:text-blue-400">
                            Miembros
                        </Link>
                    </li>
                    <li>
                        <Link href="/editar" className="hover:text-blue-400">
                            Editar
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:text-blue-400">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/formularios"
                            className="hover:text-blue-400"
                        >
                            Formularios
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/estadisticas"
                            className="hover:text-blue-400"
                        >
                            Estadísticas
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="configuracion">
                <span className="font-bold text-xl mb-3">CONFIGURACIÓN</span>
                <ul className="space-y-3">
                    <li>
                        <Link
                            href="/configuracion"
                            className="hover:text-blue-400"
                        >
                            Configuración
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cerrar-sesion"
                            className="hover:text-blue-400"
                        >
                            Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
