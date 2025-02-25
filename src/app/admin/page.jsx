"use client"

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [authStatus, setAuthStatus] = useState("Verificando...");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuthStatus("No autenticado");
            return;
        }

        fetch("https://aeuniandes.pythonanywhere.com/api/check-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        })
            .then((response) => {
                // Si el status es 200, el usuario está autenticado
                if (response.status === 200) {
                    setAuthStatus("Autenticado");
                } else {
                    setAuthStatus("No autenticado");
                }
            })
            .catch((error) => {
                console.error("Error al verificar autenticación:", error);
                setAuthStatus("No autenticado");
            });
    }, []);

    return (
        <div className="py-16 px-6 lg:px-28">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
                Bienvenido, Administrador!
            </h1>
            <p className="text-center text-gray-300">
                Esta es la página de administración. Aquí podrás gestionar todos
                los aspectos importantes.
            </p>
            <p className="text-center text-white mt-4">
                Estado de autenticación: {authStatus}
            </p>
        </div>
    );
}
