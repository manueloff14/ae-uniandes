// lib/strapi-helpers.js
export function unwrap(res) {
    // Acepta { data: {...} } o un objeto plano ya normalizado
    return res?.data ?? res;
}

export function pickStrapiImageUrl(
    media,
    { order = ["medium", "large", "small", "thumbnail"], fallback = "" } = {}
) {
    if (!media) return fallback;
    const fmts = media.formats ?? {};
    for (const key of order) {
        const f = fmts[key];
        if (f?.url) return f.url;
    }
    return media.url ?? fallback;
}
