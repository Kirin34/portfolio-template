const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchFromStrapi(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN || ""}`,
      },
      next: { revalidate: 60 }, // ISR (opzionale)
    });

    if (!res.ok) {
      throw new Error(`Errore nella chiamata a Strapi: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Errore durante fetchFromStrapi:", err);
    return [];
  }
}
