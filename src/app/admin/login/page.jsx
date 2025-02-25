"use client"

import Link from "next/link";
import Footer from "@/components/routes/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://aeuniandes.pythonanywhere.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: email,
                    contraseña: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardamos el token directamente en localStorage
                localStorage.setItem("token", data.token);
                // Navegamos a /admin usando Next.js navigation
                router.push("/admin");
            } else {
                alert(data.mensaje || data.error);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Ocurrió un error. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            <header className="bg-[#111111] py-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
                    <h1 className="text-2xl font-bold">Acceso Administrador</h1>
                    <nav>
                        <ul className="flex gap-6">
                            <li>
                                <Link href="/login" className="hover:underline">
                                    Inicio
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section className="py-16 px-6 lg:px-28">
                    <div className="max-w-lg mx-auto bg-[#111111] p-8 rounded-3xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-white mb-6">
                            Iniciar sesión como Administrador
                        </h2>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm text-gray-300"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 mt-2 text-sm rounded-lg bg-gray-800 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="admin@empresa.com"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm text-gray-300"
                                >
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full p-3 mt-2 text-sm rounded-lg bg-gray-800 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="******"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-6 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-800 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
