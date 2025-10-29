export default function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 bg-[--color-accent]/30 text-[--color-foreground]">
      <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 🔹 Logo o nome */}
        <h2 className="text-2xl font-serif tracking-wide">
          Test portfolio
        </h2>

        {/* 🔹 Link social */}
        <div className="flex gap-6 text-lg">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[--color-primary] transition"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[--color-primary] transition"
          >
            Facebook
          </a>
          <a
            href="mailto:info@elisaattiliillustratrice.it"
            className="hover:text-[--color-primary] transition"
          >
            Contatti
          </a>
        </div>

        {/* 🔹 Copyright */}
        <p className="text-sm opacity-70 font-sans text-center md:text-right">
          © {new Date().getFullYear()} Portfolio Template · Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}
