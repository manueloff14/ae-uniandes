export const metadata = {
    title: "Galería AE Uniandes",
    description: "Explora los momentos que definen nuestra labor. En esta galería, descubrirás cómo la comunidad de AE Uniandes trabaja unida para generar impacto positivo a través del altruismo eficaz."
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
