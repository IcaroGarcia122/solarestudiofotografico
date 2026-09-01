import { ArrowUpRight, MessageCircle, Heart, Shield, KeyRound, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SolarLogo } from "@/src/components/solar-logo";

interface CtaFooterProps {
  onOpenAdmin?: () => void;
}

export function CtaFooter({ onOpenAdmin }: CtaFooterProps) {
  const line1Words = "Se essas imagens falam com você,".split(" ");
  const line2Words = "é hora de criarmos memórias juntos.".split(" ");

  return (
    <>
      <section id="contato" className="relative bg-[#060608] py-14 lg:py-20 overflow-hidden scroll-mt-20 border-t border-white/5">
        {/* Background glow in warm gold */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Animated Word-by-Word Rising Headline */}
          <h2 className="text-balance font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-white">
            <div className="inline-block">
              {line1Words.map((word, i) => (
                <motion.span
                  key={`l1_${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-1.5 sm:mr-2.5"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <span className="hidden sm:inline"> </span>
            <div className="inline-block gold-gradient-text">
              {line2Words.map((word, i) => (
                <motion.span
                  key={`l2_${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (line1Words.length + i) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-1.5 sm:mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (line1Words.length + line2Words.length) * 0.04 }}
            className="mt-4 max-w-xl mx-auto text-pretty text-sm sm:text-base text-zinc-300"
          >
            Consulte datas disponíveis para casamentos, 15 anos, ensaios autorais e projetos em Foz do Iguaçu e região.
          </motion.p>

          {/* Location & Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur-md text-left flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#e5c07b] border border-[#d4af37]/30">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5df9e]">
                  Solar Estúdio Fotográfico
                </h4>
                <p className="text-xs sm:text-sm text-zinc-200 mt-0.5 font-medium">
                  Rua Cardeal, 545, Portal da Foz • Foz do Iguaçu, PR
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://wa.me/5545991449463?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20o%20Solar%20Est%C3%BAdio%20Fotogr%C3%A1fico!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-4 py-2 text-xs font-bold text-black transition-all hover:brightness-110 shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-black" />
                <span>(45) 99144-9463</span>
              </a>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/5545991449463?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20o%20Solar%20Est%C3%BAdio%20Fotogr%C3%A1fico!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-7 py-3 text-sm sm:text-base font-bold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#d4af37]/30"
            >
              <span>Falar no WhatsApp: (45) 99144-9463</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="#area-cliente"
              className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-zinc-900/80 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:border-[#d4af37] shadow-lg"
            >
              <KeyRound className="w-4 h-4 text-[#e5c07b]" />
              <span>Acessar Meu Ensaio por Código</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#040405] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <SolarLogo size="md" />

          <div className="flex flex-col items-center md:items-start text-xs text-zinc-400 gap-1">
            <p className="font-medium text-zinc-300">
              © 2026 Solar Estúdio Fotográfico — Todos os direitos reservados.
            </p>
            <p className="text-zinc-500">
              Rua Cardeal, 545, Portal da Foz, Foz do Iguaçu - PR, 85859-620, Brasil
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <a href="#top" className="hover:text-[#f5df9e] transition-colors">Início</a>
            <a href="#portfolio" className="hover:text-[#f5df9e] transition-colors">Galeria</a>
            <a href="#area-cliente" className="hover:text-[#f5df9e] transition-colors">Área do Cliente</a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold text-[#f5df9e] hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black transition-all cursor-pointer shadow-md"
              >
                <Shield className="w-4 h-4 text-[#e5c07b]" />
                <span>Painel Fotógrafo &amp; CRM</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
