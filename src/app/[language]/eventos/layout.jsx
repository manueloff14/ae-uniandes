export const metadata = {
    title: "Explora nuestros eventos | AE Uniandes",
    description: "Descubre y participa en los eventos organizados por la Asociación de Estudiantes de Administración de Uniandes. Charlas, talleres, networking y más."
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
