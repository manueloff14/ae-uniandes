import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "markdown-navbar/dist/navbar.css";
import localFont from "next/font/local";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = localFont({
    src: [
        {
            path: "./fonts/inter/Inter-VariableFont_opsz,wght.ttf",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "./fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf",
            weight: "100 900",
            style: "italic",
        },
    ],
    variable: "--font-inter",
    display: "swap",
    fallback: ["system-ui", "Segoe UI", "Roboto", "Arial"],
});

export const metadata = {
    title: "AE Uniandes | Unidos para transformar vidas con altruismo eficaz",
    description:
        "AE Uniandes es una comunidad de estudiantes comprometidos con el altruismo eficaz. Impulsamos proyectos con impacto real, promovemos el liderazgo social y trabajamos juntos para ayudar de la manera más efectiva posible.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                {/* Google tag (gtag.js) */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-8J4SLG11YM"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8J4SLG11YM');
            `,
                    }}
                />
                {/* Incluir script inline */}
                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7EHB023GJB');
            `,
                    }}
                ></script>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449384971274211"
                    crossorigin="anonymous"
                ></script> */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
