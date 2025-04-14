import "formiojs/dist/formio.full.min.css";

export async function generateMetadata({ params }) {
    const { id } = params;
    const baseUrl = "https://aeuniandes.pythonanywhere.com";

    try {
        const res = await fetch(`${baseUrl}/api/obtener-form/${id}`, {
            // Revalidate cada minuto (opcional)
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return { title: "Formulario no encontrado" };
        }

        const form = await res.json();

        return {
            title: form.titulo + " - AE Uniandes Formularios",
            description: "Formulario de AE Uniandes",
        };
    } catch (err) {
        return { title: "Error cargando el formulario" };
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Bootstrap 3 */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
