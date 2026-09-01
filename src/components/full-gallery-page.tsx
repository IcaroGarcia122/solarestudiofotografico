import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Camera,
  Sparkles,
  Grid,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SolarLogo } from "@/src/components/solar-logo";
import { cn } from "@/src/lib/utils";

export interface FullGalleryPhoto {
  id: number;
  code: string;
  title: string;
  category: "Casamento" | "15 Anos" | "Ensaios" | "Estúdio";
  src: string;
  alt: string;
  desc: string;
}

export const allFullGalleryPhotos: FullGalleryPhoto[] = [
  {
    id: 1,
    code: "#SOLAR-01",
    title: "O Primeiro Olhar do Casal",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Casal de noivos em momento de carinho e emoção",
    desc: "A captura espontânea do exato instante em que o olhar diz tudo. Luz dourada suave e enquadramento intimista.",
  },
  {
    id: 2,
    code: "#SOLAR-02",
    title: "Brilho & Celebração de 15 Anos",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
    alt: "Debutante com vestido iluminado em celebração mágica",
    desc: "A transição de uma fase inesquecível registrada com sofisticação, dinamismo e a energia vibrante da juventude.",
  },
  {
    id: 3,
    code: "#SOLAR-03",
    title: "Retrato Editorial de Estúdio",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    alt: "Retrato feminino com iluminação suave em estúdio",
    desc: "Dominando contrastes e nuances com equipamentos profissionais para revelar sua melhor versão com naturalidade.",
  },
  {
    id: 4,
    code: "#SOLAR-04",
    title: "Luz Natural & Conexão Autêntica",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    alt: "Ensaio autoral ao ar livre ao pôr do sol",
    desc: "A beleza do cotidiano elevada à arte. Ensaios externos aproveitando o melhor da luz de Foz do Iguaçu.",
  },
  {
    id: 5,
    code: "#SOLAR-05",
    title: "A Aliança e o Juramento",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85",
    alt: "Detalhes das alianças e mãos dadas dos noivos",
    desc: "Macrofotografia sensorial dos pequenos detalhes que constroem a grandiosidade do seu casamento.",
  },
  {
    id: 6,
    code: "#SOLAR-06",
    title: "Sensibilidade & Poesia Visual",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    alt: "Noiva em meio à natureza com véu ao vento",
    desc: "Composição poética onde o movimento do vento e a natureza compõem uma moldura etérea e inesquecível.",
  },
  {
    id: 7,
    code: "#SOLAR-07",
    title: "A Magia dos 15 Anos ao Ar Livre",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    alt: "Debutante em ensaio pré-festa com luz dourada",
    desc: "Ensaio externo repleto de personalidade, cores vivas e sorrisos sinceros que antecedem a grande festa.",
  },
  {
    id: 8,
    code: "#SOLAR-08",
    title: "Expressão & Alma em Estúdio",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    alt: "Retrato com luzes quentes no estúdio",
    desc: "Foco absoluto no olhar, emoldurado pelo encanto da iluminação de estúdio do Solar.",
  },
  {
    id: 9,
    code: "#SOLAR-09",
    title: "Votos e Emoção no Altar",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85",
    alt: "Cerimônia de casamento emocionante",
    desc: "A cumplicidade e a promessa de amor eterno eternizadas em ângulos sensíveis.",
  },
  {
    id: 10,
    code: "#SOLAR-10",
    title: "A Dança dos Sonhos",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
    alt: "Debutante e vestido deslumbrante",
    desc: "Produção de luz e enquadramento cinematográfico para um marco inesquecível.",
  },
  {
    id: 11,
    code: "#SOLAR-11",
    title: "Conexão & Afeto",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85",
    alt: "Casal em ensaio pré-wedding",
    desc: "Retratos espontâneos com paleta quente e narrativa visual acolhedora.",
  },
  {
    id: 12,
    code: "#SOLAR-12",
    title: "Harmonia & Retrato Artístico",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
    alt: "Fotografia autoral em estúdio",
    desc: "Iluminação precisa e atmosfera clássica para valorizar sua autoridade e beleza.",
  },
  {
    id: 13,
    code: "#SOLAR-13",
    title: "Pôr do Sol Dourado",
    category: "Ensaios",
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85",
    alt: "Ensaio na hora dourada ao ar livre",
    desc: "Aproveitando a luz natural única da tarde para criar contrastes quentes e cinematográficos.",
  },
  {
    id: 14,
    code: "#SOLAR-14",
    title: "Retrato Contemporâneo",
    category: "Estúdio",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85",
    alt: "Retrato expressivo em estúdio",
    desc: "Tratamento de pele refinado mantendo as texturas orgânicas e a essência verdadeira de cada pessoa.",
  },
  {
    id: 15,
    code: "#SOLAR-15",
    title: "Detalhes e Véu Imperial",
    category: "Casamento",
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85",
    alt: "Noiva com vestido e véu clássico",
    desc: "Cuidado absoluto na composição de ângulos nobres para valorizar o vestido e a serenidade da noiva.",
  },
  {
    id: 16,
    code: "#SOLAR-16",
    title: "Ensaio Debutante Fashion",
    category: "15 Anos",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    alt: "Debutante com produção moderna",
    desc: "Estilo jovial e espontâneo transmitindo toda a energia dos 15 anos com direção artística leve.",
  },
];

const categories = ["Todos", "Casamento", "15 Anos", "Ensaios", "Estúdio"] as const;

interface FullGalleryPageProps {
  onBackToSite: () => void;
}

export function FullGalleryPage({ onBackToSite }: FullGalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [lightboxItem, setLightboxItem] = useState<FullGalleryPhoto | null>(null);

  const filteredPhotos = useMemo(() => {
    return allFullGalleryPhotos.filter((item) => {
      const matchCat =
        selectedCategory === "Todos" || item.category === selectedCategory;
      const matchSearch =
        searchTerm.trim() === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxItem(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxItem(filteredPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/10 py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-200 transition-all hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black hover:border-[#d4af37] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </button>
            <div className="hidden sm:block">
              <SolarLogo size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5545991449463?text=Ol%C3%A1!%20Estou%20vendo%20a%20galeria%20completa%20do%20Solar%20Est%C3%BAdio%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-black transition-all hover:brightness-110 shadow-md shadow-[#d4af37]/20"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              <span className="hidden xs:inline">Agendar Ensaio</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        {/* Page Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5df9e] mb-4 backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-[#e5c07b]" />
            <span>Acervo Completo</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Galeria Completa
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Explore todos os nossos ensaios de casamentos, 15 anos, ensaios externos e retratos em estúdio em Foz do Iguaçu e região.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg shadow-[#d4af37]/25 scale-105"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar ensaio ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950/40 rounded-3xl border border-white/10">
            <p className="text-lg text-zinc-400">Nenhuma foto encontrada com esses filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory("Todos");
                setSearchTerm("");
              }}
              className="mt-4 rounded-full bg-gradient-to-r from-[#f3d789] to-[#d4af37] px-6 py-2.5 text-xs font-bold text-black hover:brightness-110"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxItem(photo)}
                className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-950 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border hover:border-[#d4af37]/60"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#f5df9e] border border-white/10">
                      {photo.category}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f3d789] to-[#d4af37] text-black shadow-md">
                      <Expand className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <p className="font-mono text-[0.7rem] text-[#e5c07b] font-bold mb-0.5">
                      {photo.code}
                    </p>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white leading-tight truncate">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/15 via-zinc-900/60 to-black p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          <Sparkles className="w-8 h-8 text-[#e5c07b] mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pronto para viver essa experiência?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Reserve sua data com antecedência para garantir a melhor experiência no Solar Estúdio Fotográfico.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5545991449463?text=Ol%C3%A1!%20Vi%20a%20galeria%20completa%20do%20Solar%20Est%C3%BAdio%20e%20gostaria%20de%20saber%20as%20datas%20dispon%C3%ADveis!"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-8 py-3.5 text-sm font-bold text-black transition-all hover:brightness-110 shadow-xl flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar Orçamento no WhatsApp</span>
            </a>
            <button
              onClick={onBackToSite}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              Voltar ao Site
            </button>
          </div>
        </div>
      </main>

      {/* Lightbox Modal (No Download Button as requested) */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-xl"
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

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
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
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white leading-tight">
                    {lightboxItem.title}
                  </h3>
                  <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {lightboxItem.desc}
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
