import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
  Camera,
  Expand,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MessageCircle,
  Grid,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface GalleryPhoto {
  id: number;
  code: string;
  title: string;
  category: "Casamento" | "15 Anos" | "Ensaios" | "Estúdio";
  src: string;
  alt: string;
  desc: string;
}

// 4 distinct collections of high-resolution square-optimized photos with plenty of items to avoid any gaps
const col1Images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
];

const col2Images = [
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
];

const col3Images = [
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
];

const col4Images = [
  "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
];

// Rich set of static projects for the portfolio grid
const staticProjects: GalleryPhoto[] = [
  {
    id: 1,
    code: "#SOLAR-01",
    title: "A Magia do Véu e Emoção",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    alt: "Noiva com véu e buquê em iluminação acolhedora",
    desc: "A pureza do olhar e a sutileza do véu registrados com luz suave e emoção autêntica em cores vivas.",
  },
  {
    id: 2,
    code: "#SOLAR-02",
    title: "Valsa das Estrelas",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    alt: "Debutante com vestido iluminado e fundo natural",
    desc: "O conto de fadas traduzido em brilho, imponência e um instante inesquecível de celebração.",
  },
  {
    id: 3,
    code: "#SOLAR-03",
    title: "Reflexos & Serenidade",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    alt: "Ensaio feminino na natureza com luz suave",
    desc: "Composição poética onde a iluminação suave encontra a calmaria e as cores da natureza.",
  },
  {
    id: 4,
    code: "#SOLAR-04",
    title: "Celebração a Dois",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    alt: "Casamento ao ar livre com cores vibrantes",
    desc: "Elegância atemporal com cores naturais vibrantes, valorizando o charme e a história do casal.",
  },
  {
    id: 5,
    code: "#SOLAR-05",
    title: "Luz Dourada & Natureza",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80",
    alt: "Retrato ao ar livre na hora dourada",
    desc: "Cores acolhedoras e conexão genuína com a paisagem natural da região.",
  },
  {
    id: 6,
    code: "#SOLAR-06",
    title: "Presença & Autenticidade",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=80",
    alt: "Debutante em ensaio autoral colorido",
    desc: "Presença marcante com direção leve que valoriza a personalidade única da aniversariante.",
  },
  {
    id: 7,
    code: "#SOLAR-07",
    title: "O Abraço ao Pôr do Sol",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    alt: "Casal abraçado sobre ponte de pedra ao entardecer",
    desc: "Romantismo espontâneo emoldurado pelos tons alaranjados e dourados do pôr do sol.",
  },
  {
    id: 8,
    code: "#SOLAR-08",
    title: "Brilho & Profundidade",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    alt: "Retrato com luzes quentes no estúdio",
    desc: "Foco absoluto no olhar, emoldurado pelo encanto da iluminação de estúdio do Solar.",
  },
  {
    id: 9,
    code: "#SOLAR-09",
    title: "Votos e Emoção no Altar",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
    alt: "Cerimônia de casamento emocionante",
    desc: "A cumplicidade e a promessa de amor eterno eternizadas em ângulos sensíveis.",
  },
  {
    id: 10,
    code: "#SOLAR-10",
    title: "A Dança dos Sonhos",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
    alt: "Debutante e vestido deslumbrante",
    desc: "Produção de luz e enquadramento cinematográfico para um marco inesquecível.",
  },
  {
    id: 11,
    code: "#SOLAR-11",
    title: "Conexão & Afeto",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    alt: "Casal em ensaio pré-wedding",
    desc: "Retratos espontâneos com paleta quente e narrativa visual acolhedora.",
  },
  {
    id: 12,
    code: "#SOLAR-12",
    title: "Harmonia & Retrato Artístico",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
    alt: "Fotografia autoral em estúdio",
    desc: "Iluminação precisa e atmosfera clássica para valorizar sua autoridade e beleza.",
  },
];

/* ----------------------------------------------------
 * PARALLAX MULTI-COLUMN COMPONENT (Full screen fill, Square photos)
 * ---------------------------------------------------- */
interface ColumnProps {
  images: string[];
  y: MotionValue<number>;
  onSelectPhoto: (src: string) => void;
}

function ParallaxColumn({ images, y, onSelectPhoto }: ColumnProps) {
  return (
    <motion.div
      className="relative flex flex-col gap-3.5 sm:gap-5 w-full flex-1"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          onClick={() => onSelectPhoto(src)}
          className="group relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:ring-2 hover:ring-[#d4af37]"
        >
          {/* Full Color Vibrant Square Image */}
          <img
            src={src}
            alt="Ensaio Solar Estúdio Fotográfico"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 sm:p-4">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#f5df9e]">
              <Expand className="w-4 h-4 text-[#e5c07b]" />
              <span>Ver Detalhes</span>
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white bg-black/70 px-2 py-0.5 rounded-full border border-white/20">
              Solar Estúdio
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

interface PortfolioSectionProps {
  onOpenFullGallery?: () => void;
}

export function PortfolioSection({ onOpenFullGallery }: PortfolioSectionProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryPhoto | null>(null);

  // Parallax Scroll Tracking with smooth contained offsets so columns never reveal black holes
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-160, 160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -260]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-180, 140]);

  const handleOpenImage = (src: string) => {
    const found = staticProjects.find((p) => p.src === src);
    if (found) {
      setLightboxItem(found);
    } else {
      setLightboxItem({
        id: 99,
        code: "#SOLAR-ACERVO",
        title: "Ensaio Fotográfico Solar",
        category: "Ensaios",
        src,
        alt: "Fotografia Solar Estúdio",
        desc: "Fotografia autoral realizada pela equipe do Solar Estúdio Fotográfico em Foz do Iguaçu.",
      });
    }
  };

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = staticProjects.findIndex((p) => p.id === lightboxItem.id);
    if (currentIndex === -1) {
      setLightboxItem(staticProjects[0]);
      return;
    }
    const nextIndex = (currentIndex + 1) % staticProjects.length;
    setLightboxItem(staticProjects[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = staticProjects.findIndex((p) => p.id === lightboxItem.id);
    if (currentIndex === -1) {
      setLightboxItem(staticProjects[0]);
      return;
    }
    const prevIndex = (currentIndex - 1 + staticProjects.length) % staticProjects.length;
    setLightboxItem(staticProjects[prevIndex]);
  };

  return (
    <section id="portfolio" className="relative bg-[#000000] py-16 lg:py-24 overflow-hidden text-white">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Header of Portfolio */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 mb-8 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5df9e] mb-4 backdrop-blur-md">
          <Camera className="w-3.5 h-3.5 text-[#e5c07b]" />
          <span>Portfólio &amp; Acervo</span>
        </div>

        {/* Section title strictly named "Galeria" */}
        <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Galeria
        </h2>

        <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
          Explore nossos registros autorais em cores vivas, luz natural e alta definição.
        </p>
      </div>

      {/* -----------------------------------------------------------------
       * 1. 4-COLUMN SQUARE PARALLAX GALLERY - FULLY FILLED WITH ZERO HOLES
       * ----------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden my-4 px-2 sm:px-4 lg:px-6 max-w-[98vw] 2xl:max-w-[1700px] mx-auto">
        <div
          ref={galleryRef}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 h-[110vh] sm:h-[130vh] md:h-[145vh] box-border overflow-hidden bg-black w-full"
        >
          <ParallaxColumn
            images={col1Images}
            y={y1}
            onSelectPhoto={handleOpenImage}
          />
          <ParallaxColumn
            images={col2Images}
            y={y2}
            onSelectPhoto={handleOpenImage}
          />
          <ParallaxColumn
            images={col3Images}
            y={y3}
            onSelectPhoto={handleOpenImage}
          />
          <ParallaxColumn
            images={col4Images}
            y={y4}
            onSelectPhoto={handleOpenImage}
          />
        </div>

        {/* Soft Top and Bottom Gradient Fades */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* -----------------------------------------------------------------
       * 2. CLEAN CALL-TO-ACTION DIRECTLY ON CANVAS (NO CARD, NO MINI-GALLERY)
       * ----------------------------------------------------------------- */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center pt-16 sm:pt-20 pb-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
              },
            },
          }}
          className="flex flex-col items-center justify-center gap-6 sm:gap-8"
        >
          {/* Frase animada palavra por palavra com efeito suave e elegante */}
          <motion.h3 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-center max-w-3xl flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {["Cada", "ensaio", "conta", "uma", "história", "única"].map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 28, filter: "blur(6px)", scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 18,
                      stiffness: 120,
                    },
                  },
                }}
                className={cn(
                  "inline-block",
                  word === "história" || word === "única"
                    ? "text-[#f5df9e] drop-shadow-[0_0_20px_rgba(212,175,55,0.45)]"
                    : "text-white"
                )}
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>

          {/* Botão animado que surge suavemente logo após a frase */}
          <motion.button
            type="button"
            onClick={onOpenFullGallery}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: 0.7,
                  type: "spring",
                  damping: 18,
                  stiffness: 120,
                },
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/5 hover:bg-gradient-to-r hover:from-[#f3d789] hover:via-[#d4af37] hover:to-[#be9032] hover:text-black hover:border-[#d4af37] px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base font-bold text-white transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Ver Galeria Completa</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* -----------------------------------------------------------------
       * LIGHTBOX MODAL (NO DOWNLOAD BUTTON AS REQUESTED)
       * ----------------------------------------------------------------- */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] max-h-[60vh] md:max-h-[85vh]">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 flex flex-col justify-between bg-zinc-950 border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-mono text-[#e5c07b] font-bold">{lightboxItem.code}</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 uppercase tracking-wider text-[0.65rem] text-zinc-300 font-semibold">
                      {lightboxItem.category}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-extrabold text-white">
                    {lightboxItem.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    {lightboxItem.desc}
                  </p>
                  <p className="mt-4 text-xs text-[#e5c07b] font-semibold">
                    📍 Solar Estúdio Fotográfico • Foz do Iguaçu - PR
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/5545991449463?text=${encodeURIComponent(
                      `Olá! Vi a foto "${lightboxItem.title}" (${lightboxItem.code}) na galeria do Solar Estúdio Fotográfico e gostaria de saber valores para um ensaio nesse estilo!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] py-3.5 text-sm font-bold text-black transition-all hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Orçamento no WhatsApp</span>
                  </a>
                  <p className="text-center text-xs text-zinc-400">
                    Solar Estúdio Fotográfico • Foz do Iguaçu
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
