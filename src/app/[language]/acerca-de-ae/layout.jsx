export const metadata = {
    title: "Acerca de Altruismo Eficaz | AE Uniandes",
    description: "Conoce la misión, visión e historia de AE Uniandes: una comunidad estudiantil comprometida con el altruismo eficaz, la innovación social y el impacto positivo en Colombia desde la Universidad de los Andes."
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
