import React, { useState } from "react";
import {
  Search,
  Phone,
  Edit,
  Trash2,
  Image as ImageIcon,
  Copy,
  Check,
  Calendar,
  MapPin,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { ClientSession, SessionCategory, SessionStage } from "@/src/types/session";
import { cn } from "@/src/lib/utils";

interface StageInfo {
  key: SessionStage;
  label: string;
  color: string;
  badgeBg: string;
}

interface AdminSessionsTabProps {
  sessions: ClientSession[];
  stages: StageInfo[];
  categories: SessionCategory[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
  onManagePhotos: (session: ClientSession) => void;
  onEditSession: (session: ClientSession) => void;
  onDeleteSession: (id: string) => void;
  onUpdateSessionStage: (id: string, stage: SessionStage) => void;
}

export function AdminSessionsTab({
  sessions,
  stages,
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  onManagePhotos,
  onEditSession,
  onDeleteSession,
  onUpdateSessionStage,
}: AdminSessionsTabProps) {
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSessionId(id);
    setTimeout(() => setCopiedSessionId(null), 2000);
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.clientPhone.includes(searchTerm) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === "Todas" || s.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search & Category Filter */}
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, código, WhatsApp..."
            className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4af37] min-h-[44px]"
          />
        </div>

        {/* Scrollable Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[0.7rem] sm:text-xs font-semibold text-zinc-400 shrink-0 mr-1">
            Filtrar:
          </span>
          {["Todas", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer min-h-[36px] flex items-center",
                selectedCategoryFilter === cat
                  ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black font-bold shadow-sm"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------
       * MOBILE SESSIONS CARDS LIST (Visible on small screens)
       * ------------------------------------------------------------- */}
      <div className="block md:hidden space-y-3">
        {filteredSessions.map((session) => {
          const stageObj = stages.find((s) => s.key === session.stage);
          const isCopied = copiedSessionId === session.id;

          return (
            <div
              key={session.id}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-lg space-y-3"
            >
              {/* Header: Photo, Name, Code */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={session.coverImage || "/images/portfolio-1.png"}
                    alt={session.clientName}
                    className="h-12 w-12 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{session.clientName}</h4>
                    <span className="text-xs text-zinc-400 block">{session.clientPhone}</span>
                    <span className="text-[0.65rem] text-zinc-500">{session.category}</span>
                  </div>
                </div>

                {/* Code badge with 1-tap copy */}
                <button
                  type="button"
                  onClick={() => handleCopyCode(session.code, session.id)}
                  className="flex items-center gap-1 font-mono text-xs font-bold text-[#f3d789] bg-[#d4af37]/10 px-2.5 py-1.5 rounded-xl border border-[#d4af37]/20 active:scale-95 transition-transform shrink-0 min-h-[36px]"
                  title="Copiar código"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{session.code}</span>
                </button>
              </div>

              {/* Details & Stage Row */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                <div>
                  <span className="text-[0.65rem] text-zinc-500 block uppercase">Data &amp; Local</span>
                  <span className="text-zinc-300 font-medium truncate block">{session.date}</span>
                </div>
                <div>
                  <span className="text-[0.65rem] text-zinc-500 block uppercase">Valor Contrato</span>
                  <span className="text-emerald-400 font-bold block">
                    R$ {session.contractValue.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>

              {/* Stage Selector */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs text-zinc-400">Etapa:</span>
                <select
                  value={session.stage}
                  onChange={(e) => onUpdateSessionStage(session.id, e.target.value as SessionStage)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-xs font-bold border focus:outline-none cursor-pointer",
                    stageObj?.badgeBg,
                    stageObj?.color
                  )}
                >
                  {stages.map((s) => (
                    <option key={s.key} value={s.key} className="bg-zinc-900 text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onManagePhotos(session)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#f3d789] font-bold bg-[#d4af37]/10 border border-[#d4af37]/20 px-3.5 py-2 rounded-xl active:scale-95 transition-transform min-h-[38px]"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{session.photos?.length || 0} fotos</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/${session.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Olá ${session.clientName}! Aqui é do Solar Estúdio Fotográfico (Foz do Iguaçu). Seu código exclusivo é: ${session.code}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-300 min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onEditSession(session)}
                    className="p-2.5 rounded-xl bg-white/5 text-zinc-300 hover:text-white min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja remover o ensaio "${session.clientName}"?`)) {
                        onDeleteSession(session.id);
                      }
                    }}
                    className="p-2.5 rounded-xl bg-white/5 text-zinc-300 hover:text-red-400 min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSessions.length === 0 && (
          <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-xs text-zinc-400">Nenhum ensaio encontrado para a busca.</p>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------
       * DESKTOP TABLE VIEW (Visible on md and above)
       * ------------------------------------------------------------- */}
      <div className="hidden md:block rounded-3xl border border-white/10 bg-zinc-950 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-white/10 bg-black/50 text-[0.7rem] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Código &amp; Capa</th>
                <th className="px-6 py-4">Cliente / Casal</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data &amp; Local</th>
                <th className="px-6 py-4">Etapa CRM</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Fotos</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredSessions.map((session) => {
                const stageObj = stages.find((s) => s.key === session.stage);
                return (
                  <tr key={session.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={session.coverImage || "/images/portfolio-1.png"}
                          alt={session.clientName}
                          className="h-11 w-11 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <span className="font-mono font-bold text-[#f3d789] text-xs sm:text-sm">
                            {session.code}
                          </span>
                          <span className="block text-[0.65rem] text-zinc-500">
                            {session.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm mt-0.5">
                          {session.clientName}
                        </span>
                        <span className="text-zinc-400 text-xs">{session.clientPhone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                        {session.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-300 text-xs">
                        <div className="font-medium text-white">{session.date}</div>
                        <div className="text-zinc-400">{session.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={session.stage}
                        onChange={(e) =>
                          onUpdateSessionStage(session.id, e.target.value as SessionStage)
                        }
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border cursor-pointer",
                          stageObj?.badgeBg,
                          stageObj?.color
                        )}
                      >
                        {stages.map((s) => (
                          <option key={s.key} value={s.key} className="bg-zinc-900 text-white">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-400">
                      R$ {session.contractValue.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => onManagePhotos(session)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#f3d789] hover:underline font-bold bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1.5 rounded-full cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{session.photos?.length || 0} fotos</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${session.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Olá ${session.clientName}! Aqui é do Solar Estúdio Fotográfico (Foz do Iguaçu). Seu código exclusivo é: ${session.code}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-300 transition-colors"
                          title="Enviar WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onEditSession(session)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              confirm(`Tem certeza que deseja remover o ensaio "${session.clientName}"?`)
                            ) {
                              onDeleteSession(session.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
