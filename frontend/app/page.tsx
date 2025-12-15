import Hero from "@/components/Hero";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import { fetchFromStrapi } from "@/lib/api";
import Header from "@/components/Header";


export default async function Home() {

  const res = await fetchFromStrapi("/services?populate=*");
  const services = res?.data ?? [];

  return (
    
    <main className="min-h-screen bg-[--color-background] text-[--color-foreground]">
      <Header />
      <Hero />
      <Divider />

      <section id="servizi" className="py-20 text-center">
        <h1 className="text-5xl font-serif mb-10">Servizi</h1>

        {services.length === 0 ? (
          <p className="text-gray-500">Nessun servizio disponibile al momento.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {services.map((s: any) => {
              const img = s.service_image?.[0];
              const imgUrl = img
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
                : "/placeholder.jpg";
              const descBlock = Array.isArray(s.description)
                ? s.description[0]?.children?.[0]?.text
                : s.description || "";

              return (
                <div
                  key={s.id}
                  className="p-6 rounded-xl shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition"
                >
                  <img
                    src={imgUrl}
                    alt={img?.alternativeText || s.title || "Servizio"}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
                  <p className="text-sm opacity-80 mb-3">{descBlock}</p>
                  {s.price && (
                    <p className="text-primary font-bold">{s.price}€</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 👇 Footer alla fine del main */}
      <Footer />
    </main>
  );
}
