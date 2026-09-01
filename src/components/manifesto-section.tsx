import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  key?: string;
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#52525b", "#ffffff"]);
  const y = useTransform(progress, range, [24, 0]);

  return (
    <span className="relative inline-block mr-2 sm:mr-3.5 my-1 overflow-visible">
      <motion.span
        style={{ opacity, color, y }}
        className="transition-colors duration-150 inline-block font-sans font-extrabold tracking-tight"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ManifestoSection() {
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
    <section className="relative bg-[#000000] py-20 lg:py-28 overflow-hidden text-white border-t border-white/5">
      {/* Subtle gold ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Word-by-Word Scroll Text with Slogan/Hero Sans-Serif Font and Clean White Transition */}
        <div ref={textRef} className="mx-auto max-w-5xl py-8 sm:py-12 text-center select-none">
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
          <div className="mt-3 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
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

          <div className="mt-8 flex items-center justify-center">
            <span className="h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
