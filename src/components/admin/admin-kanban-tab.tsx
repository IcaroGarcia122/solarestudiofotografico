import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  Edit,
  Phone,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { ClientSession, SessionStage } from "@/src/types/session";
import { cn } from "@/src/lib/utils";

interface StageInfo {
  key: SessionStage;
  label: string;
  color: string;
  badgeBg: string;
}

interface AdminKanbanTabProps {
  sessions: ClientSession[];
  stages: StageInfo[];
  dragOverStage: SessionStage | null;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent, stage: SessionStage) => void;
  handleDrop: (e: React.DragEvent, targetStage: SessionStage) => void;
  onUpdateSessionStage: (id: string, stage: SessionStage) => void;
  onManagePhotos: (session: ClientSession) => void;
  onEditSession: (session: ClientSession) => void;
}

export function AdminKanbanTab({
  sessions,
  stages,
  dragOverStage,
  handleDragStart,
  handleDragOver,
  handleDrop,
  onUpdateSessionStage,
  onManagePhotos,
  onEditSession,
}: AdminKanbanTabProps) {
  // Mobile Stage Filter: 'all' or specific stage
  const [mobileSelectedStage, setMobileSelectedStage] = useState<SessionStage | "all">("all");

  const visibleStages = mobileSelectedStage === "all"
    ? stages
    : stages.filter((s) => s.key === mobileSelectedStage);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Stage Selector (Horizontal Swipeable Chips) */}
      <div className="block lg:hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setMobileSelectedStage("all")}
            className={cn(
              "px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[36px] flex items-center",
              mobileSelectedStage === "all"
                ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-md font-extrabold"
                : "bg-white/10 text-zinc-300 hover:bg-white/15"
            )}
          >
            Todas as Etapas ({sessions.length})
          </button>

          {stages.map((stage) => {
            const count = sessions.filter((s) => s.stage === stage.key).length;
            const isSelected = mobileSelectedStage === stage.key;

            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setMobileSelectedStage(stage.key)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 min-h-[36px]",
                  isSelected
                    ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-md font-extrabold"
                    : "bg-white/10 text-zinc-300 hover:bg-white/15"
                )}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isSelected ? "bg-black" : stage.badgeBg
                  )}
                />
                <span>{stage.label}</span>
                <span
                  className={cn(
                    "text-[0.65rem] px-1.5 py-0.2 rounded-full font-extrabold",
                    isSelected ? "bg-black/20 text-black" : "bg-white/10 text-zinc-300"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Kanban Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
        <p className="text-[0.75rem] sm:text-xs">
          💡 No celular, utilize o seletor <strong className="text-[#f3d789] font-bold">Mover Etapa</strong> em cada card. No computador, arraste e solte livremente.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-semibold text-white">{sessions.length}</span> ensaios no pipeline
        </div>
      </div>

      {/* Kanban Grid / Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 items-start pb-4">
        {visibleStages.map((stage) => {
          const stageSessions = sessions.filter((s) => s.stage === stage.key);
          const isOver = dragOverStage === stage.key;

          return (
            <div
              key={stage.key}
              onDragOver={(e) => handleDragOver(e, stage.key)}
              onDrop={(e) => handleDrop(e, stage.key)}
              className={cn(
                "flex flex-col rounded-2xl sm:rounded-3xl border bg-zinc-950/90 p-3.5 sm:p-4 transition-all",
                isOver
                  ? "border-[#d4af37] bg-[#d4af37]/5 shadow-xl shadow-[#d4af37]/10"
                  : "border-white/10"
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full border",
                      stage.badgeBg,
                      stage.color
                    )}
                  />
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                    {stage.label}
                  </h3>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold text-zinc-300">
                  {stageSessions.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1">
                {stageSessions.map((session) => (
                  <div
                    key={session.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, session.id)}
                    className="group relative rounded-2xl border border-white/10 bg-zinc-900/90 p-3.5 sm:p-4 shadow-lg hover:border-[#d4af37]/80 transition-all cursor-grab active:cursor-grabbing"
                  >
                    {/* Card Top */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[0.65rem] font-mono font-bold text-[#f3d789] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
                        {session.code}
                      </span>
                      <span className="text-[0.65rem] text-zinc-400 font-semibold">
                        {session.category}
                      </span>
                    </div>

                    <h4 className="font-sans text-sm font-bold text-white group-hover:text-[#f3d789] transition-colors">
                      {session.clientName}
                    </h4>

                    <div className="mt-2 text-xs text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span className="truncate">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span className="truncate">{session.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <DollarSign className="w-3 h-3 shrink-0" />
                        <span>R$ {session.contractValue.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>

                    {/* Mobile Stage Selector Dropdown (Crucial for mobile touch) */}
                    <div className="mt-3 pt-2.5 border-t border-white/5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <label className="text-[0.65rem] text-zinc-400 font-medium">
                          Mover Etapa:
                        </label>
                        <select
                          value={session.stage}
                          onChange={(e) =>
                            onUpdateSessionStage(session.id, e.target.value as SessionStage)
                          }
                          className="bg-black/80 border border-white/15 rounded-lg px-2.5 py-1.5 text-[0.7rem] font-semibold text-[#f3d789] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                        >
                          {stages.map((s) => (
                            <option key={s.key} value={s.key} className="bg-zinc-900 text-white">
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Photos & Quick Actions */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          onClick={() => onManagePhotos(session)}
                          className="inline-flex items-center gap-1 text-[0.7rem] text-[#f3d789] font-bold hover:underline"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>{session.photos?.length || 0} fotos</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEditSession(session)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-zinc-300 hover:text-white"
                            title="Editar"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`https://wa.me/${session.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Olá ${session.clientName}! Aqui é do Solar Estúdio Fotográfico (Foz do Iguaçu). Seu ensaio está na etapa "${stage.label}". Seu código exclusivo é: ${session.code}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-300"
                            title="WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {stageSessions.length === 0 && (
                  <div className="h-28 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-center p-4">
                    <span className="text-xs text-zinc-500">Nenhum ensaio nesta etapa</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
