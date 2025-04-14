// Este archivo vive en: app/blog/[id]/layout.jsx

export async function generateMetadata({ params }) {
    const { id } = params;
    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    try {
        const res = await fetch(`${baseUrl}/api/blog/${id}`, {
            // Revalidate cada minuto (opcional)
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return { title: "Blog no encontrado" };
        }

        const blog = await res.json();

        return {
            title: blog.title + " - AE Uniandes Blogs",
            description:
                blog.content
                    .replace(/[\r\n]+/g, " ")
                    .slice(0, 160)
                    .trim() + "...",
        };
    } catch (err) {
        return { title: "Error cargando el blog" };
    }
}

export default function BlogLayout({ children }) {
    // En App Router, no envolvemos <html> ni <body> aquí,
    // eso va en app/layout.js
    return <>{children}</>;
}
