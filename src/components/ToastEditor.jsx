"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";

// Import dinámico para deshabilitar SSR del Toast UI Editor
const Editor = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
    { ssr: false }
);

const ToastEditor = forwardRef(({ initialValue = "" }, ref) => {
    const editorRef = useRef();

    // Exponemos la función obtenerMarkdown al componente padre
    useImperativeHandle(ref, () => ({
        obtenerMarkdown: () => {
            return editorRef.current.getInstance().getMarkdown();
        },
    }));

    return (
        <div style={{ margin: "" }}>
            <Editor
                initialValue={initialValue}
                previewStyle="vertical"
                height="800px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                ref={editorRef}
            />
        </div>
    );
});

ToastEditor.displayName = "ToastEditor";

export default ToastEditor;
