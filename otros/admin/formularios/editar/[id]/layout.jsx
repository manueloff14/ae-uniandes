import "formiojs/dist/formio.full.min.css";

export const metadata = {
    title: "Editar Formulario < Admin | AE Uniandes",
    description: "Formularios de AE Uniandes",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Bootstrap 3 */}
                {/* <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                /> */}
            </head>
            <body>{children}</body>
        </html>
    );
}
