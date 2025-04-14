import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@toast-ui/editor/dist/toastui-editor.css'
import "markdown-navbar/dist/navbar.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "AE Uniandes | Unidos para transformar vidas con altruismo eficaz",
    description:
        "AE Uniandes es una comunidad de estudiantes comprometidos con el altruismo eficaz. Impulsamos proyectos con impacto real, promovemos el liderazgo social y trabajamos juntos para ayudar de la manera más efectiva posible.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
