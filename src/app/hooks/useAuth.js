// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/admin/login");
                return;
            }

            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/obtener_usuario",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                    }
                );

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Token inválido o sesión cerrada
                    localStorage.removeItem("token");
                    router.push("/admin/login");
                }
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                localStorage.removeItem("token");
                router.push("/admin/login");
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [router]);

    return { user, loading };
}
