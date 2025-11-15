// Este archivo vive en: app/[language]/blog/[id]/layout.jsx

export async function generateMetadata({ params }) {
    const { id } = params;
    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

    try {
        const res = await fetch(
            `${baseUrl}/api/blog-entries?filters[documentId][$eq]=${id}&pLevel=5`,
            {
                // Revalidate cada minuto (opcional)
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            return { title: "Blog no encontrado" };
        }

        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            return { title: "Blog no encontrado" };
        }

        const blog = data.data[0];

        return {
            title: blog.title + " - AE Uniandes Blogs",
            description:
                blog.content
                    .replace(/[\r\n]+/g, " ")
                    .slice(0, 160)
                    .trim() + "...",
        };
    } catch (err) {
        console.error("Error generating metadata:", err);
        return { title: "Error cargando el blog" };
    }
}

export default function BlogLayout({ children }) {
    // En App Router, no envolvemos <html> ni <body> aquí,
    // eso va en app/layout.js
    return <>{children}</>;
}
