import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Search,
  KeyRound,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  Heart,
  Expand,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useSessions } from "@/src/context/session-context";
import { ClientSession, SessionPhoto } from "@/src/types/session";
import { cn } from "@/src/lib/utils";
import { downloadImage } from "@/src/lib/download-helper";

const STAGES_CONFIG = [
  { key: "lead", label: "Briefing", desc: "Alinhamento de expectativas" },
  { key: "agendado", label: "Agendado", desc: "Data e local confirmados" },
  { key: "fotografado", label: "Fotografado", desc: "Sessão concluída com sucesso" },
  { key: "selecao", label: "Seleção", desc: "Curadoria das melhores fotos" },
  { key: "edicao", label: "Em Edição", desc: "Tratamento de cor e refinamento" },
  { key: "entregue", label: "Galeria Pronta", desc: "Disponível em alta resolução" },
];

const steps = [
  {
    n: "01",
    title: "Conexão Inicial",
    desc: "Conversamos para entender seus sonhos, gostos e a essência da sua história antes de qualquer clique.",
  },
  {
    n: "02",
    title: "Direção Leve e Fluida",
    desc: "Guiamos você com naturalidade, sem poses travadas ou artificiais. O foco é a sua autenticidade.",
  },
  {
    n: "03",
    title: "Técnica e Sensibilidade",
    desc: "Equipamentos de padrão cinematográfico, domínio de luz natural e um olhar atento a cada detalhe.",
  },
  {
    n: "04",
    title: "Entrega em Alta Resolução",
    desc: "Tratamento de cor primoroso e entrega pontual em galeria digital interativa de fácil compartilhamento.",
  },
];

export function ClientGallerySection() {
  const { findSessionByCode, sessions, togglePhotoFavorite } = useSessions();
  const [inputCode, setInputCode] = useState<string>("");
  const [searchedSession, setSearchedSession] = useState<ClientSession | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SessionPhoto | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string>("");
  const [singleDownloadingId, setSingleDownloadingId] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) return;

    setHasSearched(true);
    const result = findSessionByCode(inputCode);
    setSearchedSession(result || null);
  };

  const handleQuickCode = (code: string) => {
    setInputCode(code);
    setHasSearched(true);
    const result = findSessionByCode(code);
    setSearchedSession(result || null);
  };

  const handleToggleFav = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (searchedSession) {
      togglePhotoFavorite(searchedSession.id, photoId);
      // Refresh local view
      const updated = findSessionByCode(searchedSession.code);
      if (updated) setSearchedSession(updated);
    }
  };

  const getStageIndex = (stage: string) => {
    return STAGES_CONFIG.findIndex((s) => s.key === stage);
  };

  const handleDownloadSingle = async (photo: SessionPhoto, index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSingleDownloadingId(photo.id);
    const safeClient = (searchedSession?.clientName || "Cliente")
      .replace(/[^a-zA-Z0-9]/g, "-");
    const filename = `Solar-Estudio-${safeClient}-Foto-${index + 1}.jpg`;
    await downloadImage(photo.url, filename);
    setSingleDownloadingId(null);
  };

  const handleDownloadAllPhotos = async () => {
    if (!searchedSession || !searchedSession.photos || searchedSession.photos.length === 0) return;
    setDownloadingAll(true);
    setDownloadProgress("Preparando fotos em alta resolução...");

    const safeClient = searchedSession.clientName.replace(/[^a-zA-Z0-9]/g, "-");

    for (let i = 0; i < searchedSession.photos.length; i++) {
      const p = searchedSession.photos[i];
      setDownloadProgress(`Baixando foto ${i + 1} de ${searchedSession.photos.length}...`);
      const filename = `Solar-Estudio-${safeClient}-Foto-${i + 1}.jpg`;
      await downloadImage(p.url, filename);
      // Small pause between multiple downloads to avoid browser block
      await new Promise((r) => setTimeout(r, 400));
    }

    setDownloadProgress("Download concluído com sucesso!");
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setDownloadingAll(false);
      setDownloadProgress("");
    }, 2500);
  };

  return (
    <section id="area-cliente" className="relative bg-[#16171d] pt-24 pb-28 lg:pt-36 lg:pb-36 overflow-hidden text-white scroll-mt-16 border-t border-white/10">
      {/* Subtle single global ambient glow in gold across the whole unified section */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#d4af37]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5df9e] mb-4 backdrop-blur-md">
            <KeyRound className="w-3.5 h-3.5 text-[#e5c07b]" />
            <span>Área Exclusiva do Cliente</span>
          </div>

          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Encontre seu Ensaio
          </h2>

          <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-zinc-300">
            Digite o código exclusivo fornecido pelo Solar Estúdio Fotográfico para acessar sua galeria privada, acompanhar o status e baixar todas as suas fotos.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-8 mx-auto max-w-xl">
            <div className="relative flex items-center rounded-full border border-white/20 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/30">
              <div className="pl-4 text-[#e5c07b]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Ex: SOLAR-15-VALENTINA ou SOLAR-CASAMENTO-LUCAS"
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base font-medium text-white placeholder-zinc-500 focus:outline-none uppercase tracking-wider"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
              >
                <span>Acessar</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </form>

          {/* Quick Demo / Active Codes for Testing */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Códigos disponíveis para teste:</span>
            {sessions.slice(0, 5).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleQuickCode(s.code)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[#f5df9e] transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/15 cursor-pointer"
              >
                {s.code}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        <div className="mt-14">
          {searchedSession ? (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/15 bg-zinc-950 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl"
            >
              {/* Session Top Header Banner */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f5df9e]">
                      {searchedSession.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      Código: {searchedSession.code}
                    </span>
                  </div>
                  <h3 className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                    {searchedSession.clientName}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#e5c07b]" />
                      <span>
                        {new Date(searchedSession.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#e5c07b]" />
                      <span>{searchedSession.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Galeria Protegida &amp; Ativa</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Acesse nossa galeria de fotos do Solar Estúdio Fotográfico com o código: ${searchedSession.code}!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <Share2 className="w-4 h-4 text-[#e5c07b]" />
                    <span>Compartilhar</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadAllPhotos}
                    disabled={downloadingAll || !searchedSession.photos?.length}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-6 py-2.5 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {downloadingAll ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>
                      {downloadingAll
                        ? downloadProgress
                        : `Baixar Todas (${searchedSession.photos?.length || 0} fotos)`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Progress Timeline Tracker */}
              <div className="py-8 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Linha do Tempo da Produção
                  </span>
                  <span className="text-xs font-semibold text-[#e5c07b]">
                    Etapa Atual: {STAGES_CONFIG.find((s) => s.key === searchedSession.stage)?.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {STAGES_CONFIG.map((stage, idx) => {
                    const currentStageIdx = getStageIndex(searchedSession.stage);
                    const isCompleted = idx <= currentStageIdx;
                    const isCurrent = idx === currentStageIdx;

                    return (
                      <div
                        key={stage.key}
                        className={cn(
                          "relative rounded-2xl p-3.5 transition-all border",
                          isCurrent
                            ? "border-[#d4af37] bg-[#d4af37]/15 shadow-lg shadow-[#d4af37]/15"
                            : isCompleted
                            ? "border-emerald-500/30 bg-emerald-950/20"
                            : "border-white/5 bg-white/[0.02] opacity-50"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[0.65rem] font-mono font-bold text-zinc-400">
                            0{idx + 1}
                          </span>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-zinc-600" />
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-xs font-bold",
                            isCurrent
                              ? "text-[#f5df9e]"
                              : isCompleted
                              ? "text-white"
                              : "text-zinc-400"
                          )}
                        >
                          {stage.label}
                        </p>
                        <p className="text-[0.65rem] text-zinc-400 mt-0.5 line-clamp-1">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Private Photo Grid */}
              <div className="pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-sans text-xl font-bold text-white">
                      Acervo Fotográfico em Alta Resolução ({searchedSession.photos?.length || 0} fotos)
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Clique em qualquer foto para ampliar, favoritar ou baixar individualmente.
                    </p>
                  </div>
                </div>

                {searchedSession.photos && searchedSession.photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {searchedSession.photos.map((photo, i) => {
                      const isFav = photo.favorite;
                      const isThisDownloading = singleDownloadingId === photo.id;

                      return (
                        <div
                          key={photo.id || i}
                          onClick={() => setSelectedPhoto(photo)}
                          className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-[#d4af37]"
                        >
                          {/* Full Color Image */}
                          <img
                            src={photo.url}
                            alt={photo.title || `Foto ${i + 1}`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Top Controls */}
                          <div className="absolute top-3 right-3 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleToggleFav(photo.id, e)}
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer",
                                isFav
                                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                                  : "bg-black/60 text-white hover:bg-black hover:text-red-400 border border-white/20"
                              )}
                              aria-label="Favoritar foto"
                            >
                              <Heart className={cn("w-4 h-4", isFav && "fill-white text-white")} />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleDownloadSingle(photo, i, e)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                              aria-label="Baixar foto individual"
                            >
                              {isThisDownloading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-[#e5c07b]" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Bottom Info */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-semibold truncate pr-2 text-zinc-200">
                              {photo.title || `Foto #${i + 1}`}
                            </span>
                            <span className="p-1.5 rounded-full bg-gradient-to-r from-[#f3d789] to-[#d4af37] text-black">
                              <Expand className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sm text-zinc-400">
                      As fotos deste ensaio estão sendo processadas pela equipe de edição.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : hasSearched ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center backdrop-blur-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#e5c07b] border border-[#d4af37]/30 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-xl font-bold text-white">
                Nenhum ensaio encontrado para o código digitado
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Verifique se o código foi digitado corretamente ou utilize um dos códigos de teste acima.
              </p>
              <div className="mt-6">
                <a
                  href="https://wa.me/5545991449463?text=Ol%C3%A1%2C%20n%C3%A3o%20consegui%20localizar%20meu%20c%C3%B3digo%20de%20ensaio%20no%20site%20do%20Solar%20Est%C3%BAdio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-[#f5df9e] hover:bg-gradient-to-r hover:from-[#f3d789] hover:to-[#d4af37] hover:text-black transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Falar com Solar Estúdio no WhatsApp: (45) 99144-9463</span>
                </a>
              </div>
            </motion.div>
          ) : null}
        </div>

        {/* =========================================================
         * INTEGRATED PART 2: COMO TRABALHAMOS / A EXPERIÊNCIA SOLAR
         * (FROSTED GLASS EFFECT CARDS + GOLD ACCENTS)
         * ========================================================= */}
        <div id="experiencia" className="mt-28 sm:mt-36 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5df9e] mb-4 backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e5c07b]" />
              <span>Como Trabalhamos</span>
            </div>

            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              A Experiência Solar
            </h2>

            <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-zinc-300">
              Toda sessão no Solar Estúdio Fotográfico é planejada para ser leve, acolhedora e memorável em Foz do Iguaçu e região, desde o primeiro contato até a entrega do seu acervo final.
            </p>
          </div>

          {/* Cards with Premium Glassmorphism (Frosted Glass Effect) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-500 hover:border-[#d4af37]/60 hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.2)]"
              >
                {/* Top specular reflection / glass edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                
                {/* Ambient glass light glow in bottom right on hover */}
                <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="font-sans text-4xl font-extrabold gold-gradient-text tracking-tight block">
                  {step.n}
                </span>
                <h3 className="mt-4 font-sans text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300/90 group-hover:text-zinc-100 transition-colors">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for Client Session Photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[88vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-black flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title || "Foto"}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              <div className="p-4 bg-zinc-950 flex items-center justify-between border-t border-white/10">
                <span className="text-sm font-semibold text-white">
                  {selectedPhoto.title || "Foto em Alta Resolução"}
                </span>

                <button
                  type="button"
                  onClick={() => handleDownloadSingle(selectedPhoto, 0)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-5 py-2 text-xs font-bold text-black hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Esta Foto</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

