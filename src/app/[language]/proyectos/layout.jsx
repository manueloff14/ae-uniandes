export const metadata = {
    title: "Nuestros Proyectos | AE Uniandes",
    description: "Conoce los proyectos liderados por estudiantes de Administración en Uniandes. Innovación, impacto social y colaboración para construir comunidad."
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body
            >
                {children}
            </body>
        </html>
    );
}
