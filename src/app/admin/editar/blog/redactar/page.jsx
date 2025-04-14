// pages/index.jsx
import ToastEditor from "@/components/ToastEditor";

export default function RedactarBlog() {
    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1>Editor con Toast UI</h1>
            <ToastEditor initialValue="¡Empieza a escribir aquí!" />
        </div>
    );
}
