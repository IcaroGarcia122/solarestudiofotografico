import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Camera,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  MessageCircle,
  Copy,
  Sparkles,
  LayoutDashboard,
  Kanban,
  FileText,
  Save,
  Check,
} from "lucide-react";
import { useSessions } from "@/src/context/session-context";
import { ClientSession, SessionCategory, SessionStage, PaymentStatus } from "@/src/types/session";
import { cn } from "@/src/lib/utils";

interface AdminCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: SessionCategory[] = [
  "Casamento",
  "15 Anos",
  "Ensaio Autoral",
  "Pré-Wedding",
  "Família",
  "Corporativo",
];

const STAGES: { key: SessionStage; label: string }[] = [
  { key: "lead", label: "Briefing / Lead" },
  { key: "agendado", label: "Agendado" },
  { key: "fotografado", label: "Fotografado" },
  { key: "selecao", label: "Em Seleção" },
  { key: "edicao", label: "Em Edição" },
  { key: "entregue", label: "Entregue" },
];

export function AdminCrmModal({ isOpen, onClose }: AdminCrmModalProps) {
  const { sessions, addSession, updateSession, deleteSession } = useSessions();
  const [activeTab, setActiveTab] = useState<"list" | "new" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingSession, setEditingSession] = useState<ClientSession | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    code: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    category: "Casamento" as SessionCategory,
    date: new Date().toISOString().split("T")[0],
    location: "São Paulo, SP",
    contractValue: 3500,
    paymentStatus: "sinal" as PaymentStatus,
    stage: "agendado" as SessionStage,
    notes: "",
    coverImage: "/images/portfolio-1.png",
    photoUrls: "/images/portfolio-1.png\n/images/portfolio-4.png\n/images/portfolio-7.png",
  });

  const resetForm = () => {
    setFormData({
      code: `SOLAR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      category: "Casamento",
      date: new Date().toISOString().split("T")[0],
      location: "Foz do Iguaçu, PR",
      contractValue: 3500,
      paymentStatus: "sinal",
      stage: "agendado",
      notes: "",
      coverImage: "/images/portfolio-1.png",
      photoUrls: "/images/portfolio-1.png\n/images/portfolio-4.png\n/images/portfolio-7.png",
    });
    setEditingSession(null);
  };

  const handleOpenNew = () => {
    resetForm();
    setActiveTab("new");
  };

  const handleEdit = (session: ClientSession) => {
    setEditingSession(session);
    setFormData({
      code: session.code,
      clientName: session.clientName,
      clientEmail: session.clientEmail,
      clientPhone: session.clientPhone,
      category: session.category,
      date: session.date,
      location: session.location,
      contractValue: session.contractValue,
      paymentStatus: session.paymentStatus,
      stage: session.stage,
      notes: session.notes,
      coverImage: session.coverImage,
      photoUrls: session.photos.map((p) => p.url).join("\n"),
    });
    setActiveTab("new");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photosArray = formData.photoUrls
      .split("\n")
      .map((url, i) => url.trim())
      .filter(Boolean)
      .map((url, i) => ({
        id: `p_${Date.now()}_${i}`,
        url,
        title: `Foto #${i + 1} - ${formData.clientName}`,
        favorite: false,
      }));

    if (editingSession) {
      updateSession(editingSession.id, {
        code: formData.code.toUpperCase(),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        contractValue: Number(formData.contractValue),
        paymentStatus: formData.paymentStatus,
        stage: formData.stage,
        notes: formData.notes,
        coverImage: formData.coverImage || photosArray[0]?.url || "/images/portfolio-1.png",
        photos: photosArray.length > 0 ? photosArray : editingSession.photos,
      });
    } else {
      addSession({
        code: formData.code.toUpperCase() || `OK-${Date.now().toString().slice(-4)}`,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        contractValue: Number(formData.contractValue),
        paymentStatus: formData.paymentStatus,
        stage: formData.stage,
        notes: formData.notes,
        coverImage: formData.coverImage || photosArray[0]?.url || "/images/portfolio-1.png",
        photos: photosArray.length > 0 ? photosArray : [
          { id: "def_1", url: "/images/portfolio-1.png", title: "Foto do Ensaio" }
        ],
      });
    }

    resetForm();
    setActiveTab("list");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Metrics
  const totalRevenue = sessions.reduce((acc, s) => acc + (s.contractValue || 0), 0);
  const activeSessionsCount = sessions.filter((s) => s.stage !== "entregue").length;
  const completedSessionsCount = sessions.filter((s) => s.stage === "entregue").length;

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative flex flex-col h-[92vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0a0d] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Admin Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 bg-zinc-950/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-black font-extrabold shadow-lg shadow-amber-400/20">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-sans text-xl font-bold text-white">
                    Painel Administrativo &amp; CRM
                  </h2>
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                    Solar Estúdio Fotográfico • Foz do Iguaçu
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Gerenciamento de contratos, ensaios, códigos de clientes e pipeline de entrega
                </p>
              </div>
            </div>

            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "list"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Ensaios ({sessions.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("kanban")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "kanban"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10"
                )}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Pipeline CRM</span>
              </button>

              <button
                type="button"
                onClick={handleOpenNew}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "new"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-amber-400 hover:text-black"
                )}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Ensaio</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Fechar Painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CRM Quick Stat Cards Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-6 border-b border-white/10 bg-black/40">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Total de Ensaios</p>
                <p className="font-sans text-2xl font-bold text-white">{sessions.length}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Em Produção</p>
                <p className="font-sans text-2xl font-bold text-white">{activeSessionsCount}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Galerias Entregues</p>
                <p className="font-sans text-2xl font-bold text-white">{completedSessionsCount}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Contratos Ativos</p>
                <p className="font-sans text-2xl font-bold text-amber-300">
                  R$ {totalRevenue.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>

          {/* Main Body per Tab */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* TAB 1: LIST / TABLE */}
            {activeTab === "list" && (
              <div className="space-y-4">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por cliente, código..."
                      className="w-full rounded-full border border-white/15 bg-zinc-900/90 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
                    <button
                      type="button"
                      onClick={() => setCategoryFilter("all")}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                        categoryFilter === "all"
                          ? "bg-amber-400 text-black"
                          : "bg-white/5 text-zinc-400 hover:text-white"
                      )}
                    >
                      Todos
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                          categoryFilter === cat
                            ? "bg-amber-400 text-black"
                            : "bg-white/5 text-zinc-400 hover:text-white"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[0.7rem] tracking-wider">
                      <tr>
                        <th className="px-4 py-3.5">Código &amp; Cliente</th>
                        <th className="px-4 py-3.5">Categoria</th>
                        <th className="px-4 py-3.5">Data &amp; Local</th>
                        <th className="px-4 py-3.5">Etapa CRM</th>
                        <th className="px-4 py-3.5">Contrato</th>
                        <th className="px-4 py-3.5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {filteredSessions.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={s.coverImage}
                                alt={s.clientName}
                                className="h-10 w-10 rounded-xl object-cover border border-white/10 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-white">{s.clientName}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="font-mono text-[0.7rem] text-amber-300 font-bold">
                                    {s.code}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyCode(s.code)}
                                    className="text-zinc-500 hover:text-white"
                                    title="Copiar código"
                                  >
                                    {copiedCode === s.code ? (
                                      <Check className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10">
                              {s.category}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-white">{new Date(s.date).toLocaleDateString("pt-BR")}</p>
                            <p className="text-xs text-zinc-500 truncate max-w-[150px]">{s.location}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                                s.stage === "entregue"
                                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                                  : s.stage === "edicao" || s.stage === "selecao"
                                  ? "bg-amber-950/40 text-amber-300 border border-amber-500/30"
                                  : "bg-blue-950/40 text-blue-300 border border-blue-500/30"
                              )}
                            >
                              {STAGES.find((st) => st.key === s.stage)?.label || s.stage}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-white">
                              R$ {s.contractValue.toLocaleString("pt-BR")}
                            </p>
                            <span
                              className={cn(
                                "text-[0.68rem] font-bold uppercase tracking-wider",
                                s.paymentStatus === "pago"
                                  ? "text-emerald-400"
                                  : s.paymentStatus === "sinal"
                                  ? "text-amber-400"
                                  : "text-red-400"
                              )}
                            >
                              {s.paymentStatus === "pago" ? "Pago Integral" : s.paymentStatus === "sinal" ? "50% Sinal" : "Pendente"}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/${s.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `Olá ${s.clientName}! Aqui é do Solar Estúdio Fotográfico (Foz do Iguaçu). Seu código exclusivo para acompanhar o ensaio e ver suas fotos é: *${s.code}*. Qualquer dúvida estamos à disposição!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 transition-colors"
                                title="Enviar no WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleEdit(s)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/20 hover:text-amber-400 text-zinc-400 transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Deseja excluir o ensaio de ${s.clientName}?`)) {
                                    deleteSession(s.id);
                                  }
                                }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: NEW / EDIT FORM */}
            {activeTab === "new" && (
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-sans text-xl font-bold text-white">
                    {editingSession ? `Editar Ensaio: ${editingSession.clientName}` : "Cadastrar Novo Ensaio no CRM"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Voltar para lista
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Code */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Código de Acesso do Cliente *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="Ex: OK-CASAMENTO-ISABELA"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm font-mono font-bold text-amber-300 focus:border-amber-400 focus:outline-none uppercase"
                    />
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Nome do Cliente / Casal / Debutante *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Ex: Amanda &amp; Felipe"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Categoria do Ensaio *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as SessionCategory })}
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Data do Evento / Sessão
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      WhatsApp do Cliente
                    </label>
                    <input
                      type="text"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+55 11 99999-9999"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Local do Ensaio / Cerimônia
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ex: Buffet Villa Lobos"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Contract Value */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Valor do Contrato (R$)
                    </label>
                    <input
                      type="number"
                      value={formData.contractValue}
                      onChange={(e) => setFormData({ ...formData, contractValue: Number(e.target.value) })}
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Status do Pagamento
                    </label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="sinal">50% Sinal Pago</option>
                      <option value="pago">Pago Integral</option>
                      <option value="pendente">Pagamento Pendente</option>
                    </select>
                  </div>

                  {/* Production Stage */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Etapa de Produção CRM
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value as SessionStage })}
                      className="w-full rounded-xl border border-white/15 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none font-semibold text-amber-300"
                    >
                      {STAGES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Photo URLs */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Fotos do Ensaio (URLs das Imagens - 1 por linha)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.photoUrls}
                    onChange={(e) => setFormData({ ...formData, photoUrls: e.target.value })}
                    placeholder="/images/portfolio-1.png&#10;/images/portfolio-2.png"
                    className="w-full rounded-xl border border-white/15 bg-zinc-900/90 p-3 text-xs font-mono text-zinc-200 focus:border-amber-400 focus:outline-none"
                  />
                  <p className="mt-1 text-[0.7rem] text-zinc-500">
                    Dica: Você pode utilizar as fotos pré-carregadas `/images/portfolio-1.png` até `/images/portfolio-8.png`.
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Observações Internas / Briefing do Ensaio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Preferências de luz, estilo do vestido, restrições e detalhes do cronograma..."
                    className="w-full rounded-xl border border-white/15 bg-zinc-900/90 p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="rounded-full border border-white/20 px-6 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-2.5 text-xs font-bold text-black shadow-lg hover:bg-amber-300"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingSession ? "Salvar Alterações" : "Salvar Ensaio no CRM"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: KANBAN PIPELINE */}
            {activeTab === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 min-h-[500px]">
                {STAGES.map((stage) => {
                  const stageSessions = sessions.filter((s) => s.stage === stage.key);
                  return (
                    <div
                      key={stage.key}
                      className="rounded-2xl border border-white/10 bg-zinc-900/40 p-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            {stage.label}
                          </h4>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold text-amber-300">
                            {stageSessions.length}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {stageSessions.map((s) => (
                            <div
                              key={s.id}
                              className="rounded-xl border border-white/10 bg-black/60 p-3 hover:border-amber-400/50 transition-all shadow-md group"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[0.65rem] font-mono font-bold text-amber-400">
                                  {s.code}
                                </span>
                                <span className="text-[0.65rem] text-zinc-500">
                                  {new Date(s.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-white truncate">{s.clientName}</p>
                              <p className="text-[0.65rem] text-zinc-400 mt-0.5">{s.category}</p>

                              {/* Action to advance stage */}
                              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[0.65rem] font-semibold text-zinc-300">
                                  R$ {s.contractValue.toLocaleString("pt-BR")}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleEdit(s)}
                                  className="text-[0.65rem] text-amber-400 hover:underline"
                                >
                                  Gerenciar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenNew}
                        className="mt-3 flex items-center justify-center gap-1 w-full rounded-lg border border-dashed border-white/10 py-2 text-[0.7rem] text-zinc-400 hover:text-white hover:border-amber-400/40 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
