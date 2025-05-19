"use client";

import Link from "next/link";
import Footer from "@/components/routes/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkExistingToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                try {
                    const response = await fetch(
                        "https://aeuniandes.pythonanywhere.com/api/check-auth",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token }),
                        }
                    );
                    if (response.ok) {
                        router.push("/admin");
                        return;
                    } else {
                        localStorage.removeItem("token");
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error al verificar el token:", error);
                    localStorage.removeItem("token");
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkExistingToken();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "https://aeuniandes.pythonanywhere.com/api/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        correo: email,
                        contraseña: password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                router.push("/admin");
            } else {
                alert(data.mensaje || data.error);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Ocurrió un error. Inténtalo de nuevo.");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center bg-[#ffffff]">
                <p className="text-black text-2xl font-serif">Cargando...</p>
            </div>
        );
    }

    return (
        <>
            <main className="flex h-screen w-screen justify-center items-center bg-[#ffffff]">
                <div className="flex flex-col items-center gap-4">
                    <div className="max-w-md w-full bg-[#EDEDED] p-8 rounded-3xl shadow-lg">
                        <img
                            src="/ae-logo-black.svg"
                            alt="Altruismo Eficaz Uniandes"
                            className="w-[170px] mx-auto"
                        />
                        <h2 className="text-3xl font-bold text-center text-black my-6 mb-2 font-serif">
                            Iniciar sesión
                        </h2>
                        <p className="text-sm text-center text-gray-800 font-serif px-4 mb-10">
                            Ingresa tus datos para acceder al panel de
                            administración del sitio web AE Uniandes
                        </p>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm text-gray-600 font-serif"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 mt-2 text-sm rounded-2xl bg-[#F8F8F8] text-black border border-[#D0D0D0] focus:outline-none focus:ring-2 focus:ring-[#058199] font-serif"
                                    placeholder="admin@empresa.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm text-gray-600 font-serif"
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
                                    className="w-full p-3 mt-2 text-sm rounded-2xl bg-[#F8F8F8] text-black border border-[#D0D0D0] focus:outline-none focus:ring-2 focus:ring-[#058199] font-serif"
                                    placeholder="******"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="font-serif mt-6 mx-auto bg-gradient-to-l from-[#1A627C] to-[#07859B] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                    <span className="text-center text-xs text-black font-serif px-10 mb-10">
                        Uso exclusivo de los miembros de AE Uniandes.
                    </span>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
}
