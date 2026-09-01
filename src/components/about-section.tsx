import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface WordProps {
  key?: string;
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#3f3f46", "#ffffff"]);
  const y = useTransform(progress, range, [28, 0]);

  return (
    <span className="relative inline-block mr-2 sm:mr-3.5 my-0.5 overflow-visible">
      <motion.span
        style={{ opacity, color, y }}
        className="transition-colors duration-150 inline-block font-sans font-extrabold tracking-tight"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const line1 = "Não fotografamos poses.";
  const line2 = "Fotografamos pessoas, emoções espontâneas e conexões reais.";

  const words1 = line1.split(" ");
  const words2 = line2.split(" ");
  const totalWords = words1.length + words2.length;

  return (
    <section id="sobre" className="relative overflow-hidden py-24 lg:py-36">
      {/* Background Image with Rich Deep Dark Overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-luminosity scale-105"
        style={{ backgroundImage: "url(/images/photographers.png)" }}
      />
      {/* Ambient Lighting Gradients in Warm Gold / Deep Charcoal */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-[#08080a]/90 to-[#08080a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#aa771c]/15 via-transparent to-transparent pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Word-by-Word Scroll Text in 2 Lines with Slogan/Hero Sans-Serif Font and Clean White Transition */}
        <div ref={textRef} className="mx-auto max-w-5xl py-12 text-center select-none">
          {/* Line 1 */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {words1.map((word, i) => {
              const start = i / totalWords;
              const end = start + 1 / totalWords;
              return (
                <Word
                  key={`w1_${i}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </div>

          {/* Line 2 */}
          <div className="mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {words2.map((word, i) => {
              const globalIndex = words1.length + i;
              const start = globalIndex / totalWords;
              const end = start + 1 / totalWords;
              return (
                <Word
                  key={`w2_${i}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </div>
        </div>

        {/* Photographers Showcase Card */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-2.5 backdrop-blur-md shadow-2xl hover:border-[#d4af37]/40 transition-colors"
          >
            <div className="overflow-hidden rounded-2xl relative aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/images/photographers.png"
                alt="Retrato dos fotógrafos Oscar e Kátia no estúdio"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Equipe Solar</p>
                  <p className="text-xs text-zinc-400">Solar Estúdio Fotográfico • Foz do Iguaçu</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#e5c07b] mb-3">
              <span>Sobre o Solar Estúdio Fotográfico</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Quem somos
            </h2>

            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-zinc-300">
              Somos o Solar Estúdio Fotográfico, localizado em Foz do Iguaçu. Apaixonados por registrar histórias reais com sensibilidade, iluminação acolhedora e uma estética contemporânea atemporal.
            </p>

            <p className="mt-4 text-pretty text-sm sm:text-base leading-relaxed text-zinc-400">
              Cada casal, debutante ou família que confia em nossas lentes recebe uma experiência segura, acolhedora e inesquecível em nosso estúdio e em locações externas de Foz do Iguaçu e região.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#e5c07b] transition-colors hover:text-[#f3e5ab]"
              >
                <span>Conheça nossa história e metodologia</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
