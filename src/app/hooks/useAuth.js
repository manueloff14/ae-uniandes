"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";

// Función para obtener los datos del usuario a partir del token.
const fetchUser = async (token) => {
    const response = await fetch(
        "https://aeuniandes.pythonanywhere.com/api/obtener_usuario",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        }
    );

    if (!response.ok) {
        throw new Error("Token inválido o error al obtener el usuario");
    }
    return response.json();
};

export function useAuth() {
    const router = useRouter();

    // Lectura síncrona del token (disponible en el navegador).
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Si no existe token, redirigimos inmediatamente.
    if (!token) {
        router.push("/admin/login");
        return { user: null, loading: false, error: "No token" };
    }

    // Si el token existe, usamos SWR para obtener los datos del usuario.
    const { data, error } = useSWR(token, fetchUser);

    // En caso de error (por ejemplo, token inválido), redirigimos.
    if (error) {
        router.push("/admin/login");
    }

    return { user: data, loading: !data && !error, error };
}
