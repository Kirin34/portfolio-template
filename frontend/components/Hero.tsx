export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden text-center text-[--color-foreground]"
    >
      {/* 🎬 Video di sfondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* 🌫️ Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/50 to-white/70" />

      {/* 🖼️ Contenuto */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 md:space-y-10 px-6">
        <img
          src="/logo.png"
          alt="Logo artista"
          className="
            h-28
            sm:h-32
            md:h-36
            xl:h-40
            drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]
            animate-fade-in-slow
          "
        />

        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed tracking-wide opacity-90">
          Trasformo emozioni e ricordi in illustrazioni che raccontano storie,
          con uno stile unico e personale.
        </p>

        <a
          href="#servizi"
          className="
            inline-block
            bg-[--color-primary]
            text-white
            px-10
            py-4
            rounded-full
            font-medium
            text-lg
            shadow-md
            hover:shadow-xl
            hover:bg-[--color-foreground]
            transition-all
            duration-300
          "
        >
          Scopri i miei lavori
        </a>
      </div>
    </section>
  );
}
