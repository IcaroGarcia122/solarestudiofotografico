import { ArrowUpRight, Camera, Lightbulb, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { SolarLogo } from "@/src/components/solar-logo";

export function HeroSection() {
  return (
    <section id="top" className="relative pt-3 sm:pt-4 px-2 sm:px-4 lg:px-6 pb-6">
      {/* Outer Hero Card Container with spacious, balanced proportions matching the reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[98vw] 2xl:max-w-[1650px] overflow-hidden rounded-[2.25rem] sm:rounded-[3rem] border border-white/10 bg-[#000000] shadow-2xl min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-between"
      >
        {/* Background Video in VIBRANT FULL COLOR from provided Imgur source */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-bg.png"
            className="absolute inset-0 h-full w-full object-cover opacity-65 scale-105 transition-transform duration-1000"
          >
            <source
              src="https://i.imgur.com/XFGySlv.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-bride-posing-for-the-camera-in-her-wedding-dress-41619-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Fallback image layer */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 -z-10"
            style={{ backgroundImage: "url(/images/hero-bg.png)" }}
          />
        </div>

        {/* Pure dark gradient overlay to keep text ultra sharp and readable while preserving colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-black/80 pointer-events-none" />

        {/* Top Internal Navigation inside the Hero Card */}
        <div className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12 sm:py-8">
          <a href="#top" className="flex items-center gap-3 group" aria-label="Solar Estúdio Fotográfico - Início">
            <SolarLogo size="md" />
          </a>

          <nav aria-label="Navegação do Hero" className="flex items-center gap-5 sm:gap-8">
            <a
              href="#top"
              className="text-xs sm:text-sm font-semibold text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#d4af37] after:rounded-full"
            >
              Início
            </a>
            <a
              href="#portfolio"
              className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-[#f3e5ab] transition-colors"
            >
              Galeria
            </a>
            <a
              href="#area-cliente"
              className="text-xs sm:text-sm font-semibold text-[#e5c07b] hover:text-white transition-colors hidden sm:inline-block"
            >
              Área do Cliente
            </a>
            <a
              href="#experiencia"
              className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-[#f3e5ab] transition-colors hidden md:inline-block"
            >
              Experiência
            </a>
            <a
              href="#contato"
              className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-[#f3e5ab] transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10 sm:py-16 text-center flex flex-col items-center justify-center my-auto">
          {/* Badge Pill with transparent contour in rich gold */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/60 bg-black/50 px-5 py-2 backdrop-blur-md mb-6 sm:mb-8 transition-colors hover:border-[#f3e5ab]"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#e5c07b] shrink-0" />
            <span className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#f5df9e]">
              FOZ DO IGUAÇU • UMA EXPERIÊNCIA LEVE, HUMANA E PROFISSIONAL
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-balance font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            Fotografia que transforma momentos em memórias eternas.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-zinc-200 font-normal"
          >
            Solar Estúdio Fotográfico. Fotografamos histórias reais com sensibilidade, técnica e um olhar
            que valoriza cada detalhe em Foz do Iguaçu e região.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5"
          >
            <a
              href="https://wa.me/5545991449463?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20um%20ensaio%20no%20Solar%20Est%C3%BAdio%20Fotogr%C3%A1fico."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-8 py-3.5 text-xs sm:text-sm font-bold text-black shadow-2xl shadow-[#d4af37]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-[#d4af37]/40 active:scale-95 cursor-pointer"
            >
              <span>Agendar no WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-black/70 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-zinc-900 hover:border-[#d4af37] active:scale-95 shadow-lg hover:text-[#f3e5ab]"
            >
              <Camera className="w-4 h-4 text-[#e5c07b]" />
              <span>Ver galeria</span>
            </a>
          </motion.div>

          {/* Social Proof Avatars Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 sm:mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Solar Estúdio"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80"
                alt="Ensaio noiva"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                alt="Ensaio 15 anos"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=150&q=80"
                alt="Ensaio casal"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-zinc-300 tracking-wide">
              <strong className="font-semibold text-white">+ 250</strong> ensaios realizados em Foz do Iguaçu
            </span>
          </motion.div>
        </div>

        {/* Bottom subtle accent line */}
        <div className="relative z-10 pb-4 text-center">
          <span className="inline-block h-1 w-12 rounded-full bg-white/10" />
        </div>
      </motion.div>
    </section>
  );
}
