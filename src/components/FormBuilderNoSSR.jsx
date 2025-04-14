"use client";

import dynamic from "next/dynamic";
import "formiojs/dist/formio.full.min.css";

// Cargamos FormBuilder de @formio/react de manera dinámica y sin SSR.
const FormBuilderNoSSR = dynamic(
    () => import("@formio/react").then((mod) => mod.FormBuilder),
    { ssr: false }
);

export default FormBuilderNoSSR;
