"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [language, setLanguage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language");
        if (lang) {
            setLanguage(lang);
            router.push(`/${lang}`);
        } else {
            localStorage.setItem("language", "es");
            setLanguage("es");
            router.push("/es");
        }
    }, [router]);

    if (!language) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
            <img
                src="/ae-icon.svg"
                alt="Logo"
                className="w-[55px] h-[55px]" // Tamaño de la imagen a 55px
            />
            {/* <p className="mt-4 text-sm font-bold font-serif text-black">Cargando...</p> */}
            
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

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <img
                src="/ae-icon.svg"
                alt="Logo"
                className="w-[55px] h-[55px]" // Tamaño de la imagen a 55px
            />
            {/* <p className="mt-4 text-sm font-bold font-serif text-black">Cargando...</p> */}
            
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
