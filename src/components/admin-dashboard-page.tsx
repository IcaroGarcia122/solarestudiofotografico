import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  ArrowLeft,
  CheckCircle2,
  Lock,
  User,
  LogIn,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useSessions } from "@/src/context/session-context";
import {
  ClientSession,
  PaymentStatus,
  SessionCategory,
  SessionPhoto,
  SessionStage,
} from "@/src/types/session";
import { SolarLogo } from "@/src/components/solar-logo";
import { AdminHeaderNav, AdminTab } from "@/src/components/admin/admin-header-nav";
import { AdminStatsTab } from "@/src/components/admin/admin-stats-tab";
import { AdminKanbanTab } from "@/src/components/admin/admin-kanban-tab";
import { AdminSessionsTab } from "@/src/components/admin/admin-sessions-tab";
import { AdminSessionFormTab } from "@/src/components/admin/admin-session-form-tab";
import { AdminPhotoManagerModal } from "@/src/components/admin/admin-photo-manager-modal";

interface AdminDashboardPageProps {
  onBackToSite: () => void;
}

const STAGES: { key: SessionStage; label: string; color: string; badgeBg: string }[] = [
  { key: "lead", label: "Novo Lead", color: "border-blue-500/40 text-blue-300", badgeBg: "bg-blue-500/10" },
  { key: "agendado", label: "Agendado", color: "border-[#d4af37]/40 text-[#f3d789]", badgeBg: "bg-[#d4af37]/10" },
  { key: "fotografado", label: "Fotografado", color: "border-purple-500/40 text-purple-300", badgeBg: "bg-purple-500/10" },
  { key: "selecao", label: "Em Seleção", color: "border-cyan-500/40 text-cyan-300", badgeBg: "bg-cyan-500/10" },
  { key: "edicao", label: "Em Edição", color: "border-orange-500/40 text-orange-300", badgeBg: "bg-orange-500/10" },
  { key: "entregue", label: "Entregue", color: "border-emerald-500/40 text-emerald-300", badgeBg: "bg-emerald-500/10" },
];

const CATEGORIES: SessionCategory[] = [
  "Casamento",
  "15 Anos",
  "Ensaio Autoral",
  "Pré-Wedding",
  "Família",
  "Corporativo",
];

const PIE_COLORS = ["#d4af37", "#f3d789", "#be9032", "#a37a24", "#825e16", "#5a410d"];

export function AdminDashboardPage({ onBackToSite }: AdminDashboardPageProps) {
  const {
    sessions,
    addSession,
    updateSession,
    deleteSession,
    updateSessionStage,
    addPhotosToSession,
    removePhotoFromSession,
    setSessionCover,
    resetToDefaults,
  } = useSessions();

  // Authentication State with unique credentials
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== "undefined" && sessionStorage.getItem("solar_admin_auth") === "true";
  });
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = loginUser.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    // Unique credentials: solar / solar2025
    if (
      (cleanUser === "solar" || cleanUser === "admin" || cleanUser === "admin@solarestudio.com.br") &&
      cleanPass === "solar2025"
    ) {
      sessionStorage.setItem("solar_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError("Usuário ou senha incorretos. Utilize o login único.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("solar_admin_auth");
    setIsAuthenticated(false);
    setLoginUser("");
    setLoginPassword("");
  };

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("Todas");

  // Selected session for viewing/managing photos in modal
  const [managingPhotosSession, setManagingPhotosSession] = useState<ClientSession | null>(null);

  // Drag and Drop state for Kanban
  const [draggedSessionId, setDraggedSessionId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<SessionStage | null>(null);

  // Form State for creating/editing session
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [uploadedPhotosDraft, setUploadedPhotosDraft] = useState<SessionPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const manageFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    code: `SOLAR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    clientName: "",
    clientEmail: "",
    clientPhone: "+55 45 99144-9463",
    category: "Casamento" as SessionCategory,
    date: new Date().toISOString().split("T")[0],
    location: "Foz do Iguaçu, PR",
    contractValue: 3500,
    paymentStatus: "sinal" as PaymentStatus,
    stage: "agendado" as SessionStage,
    notes: "",
    coverImage: "/images/portfolio-1.png",
  });

  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const resetForm = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    setFormData({
      code: `SOLAR-${randomSuffix}`,
      clientName: "",
      clientEmail: "",
      clientPhone: "+55 45 99144-9463",
      category: "Casamento",
      date: new Date().toISOString().split("T")[0],
      location: "Foz do Iguaçu, PR",
      contractValue: 3500,
      paymentStatus: "sinal",
      stage: "agendado",
      notes: "",
      coverImage: "/images/portfolio-1.png",
    });
    setUploadedPhotosDraft([]);
    setEditingSessionId(null);
  };

  const handleStartRegisterNew = () => {
    resetForm();
    setActiveTab("new-session");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditClick = (session: ClientSession) => {
    setEditingSessionId(session.id);
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
    });
    setUploadedPhotosDraft(session.photos || []);
    setActiveTab("new-session");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Upload handler for the draft session (Unlimited photos)
  const handleDraftFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newPhotos: SessionPhoto[] = [];
    const fileList = Array.from(files) as File[];

    let processed = 0;
    fileList.forEach((file: File, idx: number) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          newPhotos.push({
            id: `p_draft_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 5)}`,
            url: result,
            title: file.name.replace(/\.[^/.]+$/, ""),
            favorite: false,
          });
        }
        processed++;
        if (processed === fileList.length) {
          setUploadedPhotosDraft((prev) => {
            const combined = [...prev, ...newPhotos];
            if (combined.length > 0 && (!formData.coverImage || formData.coverImage === "/images/portfolio-1.png")) {
              setFormData((f) => ({ ...f, coverImage: combined[0].url }));
            }
            return combined;
          });
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload handler for managing existing session photos directly
  const handleManageSessionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !managingPhotosSession) return;

    setIsUploading(true);
    const newPhotos: SessionPhoto[] = [];
    const fileList = Array.from(files) as File[];

    let processed = 0;
    fileList.forEach((file: File, idx: number) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          newPhotos.push({
            id: `p_m_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 5)}`,
            url: result,
            title: file.name.replace(/\.[^/.]+$/, ""),
            favorite: false,
          });
        }
        processed++;
        if (processed === fileList.length) {
          addPhotosToSession(managingPhotosSession.id, newPhotos);
          setIsUploading(false);
          if (manageFileInputRef.current) manageFileInputRef.current.value = "";

          // Update local modal state
          setManagingPhotosSession((prev) =>
            prev ? { ...prev, photos: [...(prev.photos || []), ...newPhotos] } : null
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.code) return;

    const normalizedCode = formData.code.trim().toUpperCase();

    const finalPhotos: SessionPhoto[] =
      uploadedPhotosDraft.length > 0
        ? uploadedPhotosDraft
        : [
            { id: `p_${Date.now()}_1`, url: "/images/portfolio-1.png", title: "Ensaio Principal", favorite: true },
            { id: `p_${Date.now()}_2`, url: "/images/portfolio-2.png", title: "Luz Dourada", favorite: false },
          ];

    const cover = formData.coverImage || finalPhotos[0]?.url || "/images/portfolio-1.png";

    if (editingSessionId) {
      updateSession(editingSessionId, {
        ...formData,
        code: normalizedCode,
        coverImage: cover,
        photos: finalPhotos,
      });
      setSaveSuccessMessage(`Ensaio de "${formData.clientName}" atualizado com sucesso!`);
    } else {
      addSession({
        ...formData,
        code: normalizedCode,
        coverImage: cover,
        photos: finalPhotos,
      });
      setSaveSuccessMessage(`Ensaio de "${formData.clientName}" registrado com sucesso! Código: ${normalizedCode}`);
    }

    setTimeout(() => {
      setSaveSuccessMessage(null);
      setActiveTab("sessions");
      resetForm();
    }, 1500);
  };

  // Drag and Drop handlers for Kanban
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedSessionId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent, stage: SessionStage) => {
    e.preventDefault();
    if (dragOverStage !== stage) {
      setDragOverStage(stage);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: SessionStage) => {
    e.preventDefault();
    const sessionId = e.dataTransfer.getData("text/plain") || draggedSessionId;
    if (sessionId) {
      updateSessionStage(sessionId, targetStage);
    }
    setDraggedSessionId(null);
    setDragOverStage(null);
  };

  // Computed Statistics
  const totalRevenue = sessions.reduce((acc, s) => acc + (s.contractValue || 0), 0);
  const paidRevenue = sessions.reduce((acc, s) => {
    if (s.paymentStatus === "pago") return acc + s.contractValue;
    if (s.paymentStatus === "sinal") return acc + s.contractValue * 0.5;
    return acc;
  }, 0);
  const deliveredCount = sessions.filter((s) => s.stage === "entregue").length;
  const activeCount = sessions.filter((s) => s.stage !== "entregue").length;
  const averageTicket = sessions.length > 0 ? Math.round(totalRevenue / sessions.length) : 0;
  const totalPhotosCount = sessions.reduce((acc, s) => acc + (s.photos?.length || 0), 0);

  // Monthly Revenue Chart Data
  const monthlyData = [
    { month: "Jan", faturamento: 12500, ensaios: 4 },
    { month: "Fev", faturamento: 16800, ensaios: 5 },
    { month: "Mar", faturamento: 19400, ensaios: 6 },
    { month: "Abr", faturamento: 22100, ensaios: 7 },
    { month: "Mai", faturamento: 28500, ensaios: 9 },
    { month: "Jun", faturamento: 34200, ensaios: 11 },
    { month: "Jul", faturamento: 38900, ensaios: 12 },
    { month: "Ago", faturamento: totalRevenue, ensaios: sessions.length },
  ];

  // Category Distribution
  const categoryCountMap: Record<string, number> = {};
  sessions.forEach((s) => {
    categoryCountMap[s.category] = (categoryCountMap[s.category] || 0) + 1;
  });
  const categoryChartData = Object.entries(categoryCountMap).map(([name, value]) => ({
    name,
    value,
  }));

  // If not authenticated, show sleek Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040405] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md bg-[#09090b] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <SolarLogo size="lg" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#f3d789] mb-2">
              <Lock className="w-3 h-3 text-[#e5c07b]" />
              <span>Painel Administrativo Restrito</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Informe suas credenciais únicas para acessar o CRM e acervo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Usuário / E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="solar"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] hover:brightness-110 text-black font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-[#d4af37]/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Acessar Painel</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-3 text-left">
              <p className="text-[0.7rem] font-bold text-[#f3d789] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#e5c07b]" />
                <span>Credenciais Únicas</span>
              </p>
              <p className="text-xs text-zinc-300">
                <strong>Login:</strong> <code className="text-[#f3d789] font-mono">solar</code>
              </p>
              <p className="text-xs text-zinc-300">
                <strong>Senha:</strong> <code className="text-[#f3d789] font-mono">solar2025</code>
              </p>
            </div>

            <button
              type="button"
              onClick={onBackToSite}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site Principal</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040405] text-white flex flex-col md:flex-row font-sans">
      {/* -------------------------------------------------------------
       * NAVIGATION COMPONENT (Mobile Top + Bottom + Desktop Sidebar)
       * ------------------------------------------------------------- */}
      <AdminHeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sessionsCount={sessions.length}
        onStartRegisterNew={handleStartRegisterNew}
        onBackToSite={onBackToSite}
        onLogout={handleLogout}
        onResetDefaults={resetToDefaults}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* -------------------------------------------------------------
       * MAIN CONTENT AREA (Scrollable & Responsive)
       * ------------------------------------------------------------- */}
      <main className="flex-1 md:h-screen md:overflow-y-auto bg-[#040405] p-3.5 sm:p-6 lg:p-10 pb-24 md:pb-10">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 mb-6">
          <div>
            <h1 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              {activeTab === "dashboard" && "Dashboard & Estatísticas"}
              {activeTab === "kanban" && "Pipeline de Produção (Kanban)"}
              {activeTab === "sessions" && "Lista e Gerenciamento de Ensaios"}
              {activeTab === "new-session" && (editingSessionId ? "Editar Ensaio & Fotos" : "Registrar Novo Ensaio & Upload")}
            </h1>
            <p className="text-[0.7rem] sm:text-xs text-zinc-400 mt-0.5">
              Painel de Gestão do Solar Estúdio Fotográfico • Foz do Iguaçu - PR
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {activeTab !== "new-session" && (
              <button
                type="button"
                onClick={handleStartRegisterNew}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-5 py-2.5 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Novo Ensaio</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Banner */}
        <AnimatePresence>
          {saveSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-4 text-emerald-300 text-sm font-bold flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <AdminStatsTab
            sessions={sessions}
            totalRevenue={totalRevenue}
            paidRevenue={paidRevenue}
            totalPhotosCount={totalPhotosCount}
            averageTicket={averageTicket}
            deliveredCount={deliveredCount}
            activeCount={activeCount}
            monthlyData={monthlyData}
            categoryChartData={categoryChartData}
            pieColors={PIE_COLORS}
            onStartRegisterNew={handleStartRegisterNew}
          />
        )}

        {/* TAB 2: KANBAN PIPELINE */}
        {activeTab === "kanban" && (
          <AdminKanbanTab
            sessions={sessions}
            stages={STAGES}
            dragOverStage={dragOverStage}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            onUpdateSessionStage={updateSessionStage}
            onManagePhotos={setManagingPhotosSession}
            onEditSession={handleEditClick}
          />
        )}

        {/* TAB 3: SESSIONS LIST & FULL MANAGEMENT */}
        {activeTab === "sessions" && (
          <AdminSessionsTab
            sessions={sessions}
            stages={STAGES}
            categories={CATEGORIES}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategoryFilter={selectedCategoryFilter}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
            onManagePhotos={setManagingPhotosSession}
            onEditSession={handleEditClick}
            onDeleteSession={deleteSession}
            onUpdateSessionStage={updateSessionStage}
          />
        )}

        {/* TAB 4: NEW / EDIT SESSION WITH UNLIMITED UPLOAD */}
        {activeTab === "new-session" && (
          <AdminSessionFormTab
            editingSessionId={editingSessionId}
            formData={formData}
            setFormData={setFormData}
            categories={CATEGORIES}
            stages={STAGES}
            uploadedPhotosDraft={uploadedPhotosDraft}
            setUploadedPhotosDraft={setUploadedPhotosDraft}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            handleDraftFileUpload={handleDraftFileUpload}
            handleSaveSession={handleSaveSession}
            onCancel={() => {
              setActiveTab("sessions");
              resetForm();
            }}
          />
        )}
      </main>

      {/* DEDICATED MODAL FOR MANAGING PHOTOS */}
      <AdminPhotoManagerModal
        session={managingPhotosSession}
        onClose={() => setManagingPhotosSession(null)}
        isUploading={isUploading}
        manageFileInputRef={manageFileInputRef}
        handleManageSessionFileUpload={handleManageSessionFileUpload}
        removePhotoFromSession={removePhotoFromSession}
        setSessionCover={setSessionCover}
        setManagingPhotosSession={setManagingPhotosSession}
      />
    </div>
  );
}
