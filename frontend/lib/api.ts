const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchFromStrapi(endpoint: string) {
  const hasQuery = endpoint.includes("?");

  const url = `${API_URL}/api/${endpoint}${
    hasQuery ? "" : "?populate=*"
  }`;

  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_STRAPI_TOKEN
        ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
        : "",
    },
    cache: "no-store", // 🔥 evita cache fantasma
  });

  if (!res.ok) {
    throw new Error(`Errore Strapi ${res.status}`);
  }

  return res.json(); // ⬅️ RITORNI TUTTO
}
