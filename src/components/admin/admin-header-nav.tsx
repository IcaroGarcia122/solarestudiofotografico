import React from "react";
import {
  LayoutDashboard,
  Kanban,
  FolderKanban,
  UserPlus,
  Plus,
  ArrowLeft,
  LogOut,
  Sparkles,
  Menu,
  X,
  Camera,
} from "lucide-react";
import { SolarLogo } from "@/src/components/solar-logo";
import { cn } from "@/src/lib/utils";

export type AdminTab = "dashboard" | "kanban" | "sessions" | "new-session";

interface AdminHeaderNavProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  sessionsCount: number;
  onStartRegisterNew: () => void;
  onBackToSite: () => void;
  onLogout: () => void;
  onResetDefaults: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function AdminHeaderNav({
  activeTab,
  setActiveTab,
  sessionsCount,
  onStartRegisterNew,
  onBackToSite,
  onLogout,
  onResetDefaults,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: AdminHeaderNavProps) {
  return (
    <>
      {/* -------------------------------------------------------------
       * MOBILE TOP APP BAR (Sticky on small screens)
       * ------------------------------------------------------------- */}
      <header className="md:hidden sticky top-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SolarLogo size="sm" />
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#f3d789] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
            Painel CRM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartRegisterNew}
            className="flex items-center gap-1 bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black text-xs font-bold px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir Menu Administrativo"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------
       * MOBILE SLIDE-DOWN DRAWER / MODAL
       * ------------------------------------------------------------- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-50 bg-black/85 backdrop-blur-xl p-4 flex flex-col justify-between overflow-y-auto pb-24">
          <div className="space-y-2">
            <div className="p-3 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-2xl mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-200">Estúdio Foz do Iguaçu</span>
              </div>
              <span className="text-xs text-[#f3d789] font-bold">{sessionsCount} ensaios</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard");
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-left transition-all",
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span>Dashboard &amp; Métricas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("kanban");
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold text-left transition-all",
                activeTab === "kanban"
                  ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <Kanban className="w-5 h-5 shrink-0" />
                <span>Pipeline CRM (Kanban)</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 text-[#f3d789] font-extrabold">
                {sessionsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("sessions");
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold text-left transition-all",
                activeTab === "sessions"
                  ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-5 h-5 shrink-0" />
                <span>Gestão de Ensaios</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 text-[#f3d789] font-extrabold">
                {sessionsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onStartRegisterNew();
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-left transition-all",
                activeTab === "new-session"
                  ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
            >
              <UserPlus className="w-5 h-5 shrink-0" />
              <span>Registrar Novo Ensaio &amp; Fotos</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBackToSite();
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-2xl text-sm font-semibold hover:bg-white/15 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Site Principal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 py-3 rounded-2xl text-sm font-semibold hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair do Painel</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Deseja restaurar os ensaios de demonstração do Solar Estúdio?")) {
                    onResetDefaults();
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 underline"
              >
                Restaurar Dados Padrão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
       * MOBILE BOTTOM NAVIGATION BAR (Quick 1-tap switching)
       * ------------------------------------------------------------- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => {
            setActiveTab("dashboard");
            setIsMobileMenuOpen(false);
          }}
          className={cn(
            "flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all min-h-[44px] justify-center",
            activeTab === "dashboard" ? "text-[#f3d789] font-bold scale-105" : "text-zinc-400"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[0.65rem]">Métricas</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("kanban");
            setIsMobileMenuOpen(false);
          }}
          className={cn(
            "flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all min-h-[44px] justify-center",
            activeTab === "kanban" ? "text-[#f3d789] font-bold scale-105" : "text-zinc-400"
          )}
        >
          <Kanban className="w-5 h-5" />
          <span className="text-[0.65rem]">Kanban</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("sessions");
            setIsMobileMenuOpen(false);
          }}
          className={cn(
            "flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all min-h-[44px] justify-center",
            activeTab === "sessions" ? "text-[#f3d789] font-bold scale-105" : "text-zinc-400"
          )}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[0.65rem]">Ensaios</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onStartRegisterNew();
            setIsMobileMenuOpen(false);
          }}
          className={cn(
            "flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all min-h-[44px] justify-center",
            activeTab === "new-session" ? "text-[#f3d789] font-bold scale-105" : "text-zinc-400"
          )}
        >
          <UserPlus className="w-5 h-5" />
          <span className="text-[0.65rem]">Novo</span>
        </button>
      </nav>

      {/* -------------------------------------------------------------
       * DESKTOP SIDEBAR (Visible on md and above)
       * ------------------------------------------------------------- */}
      <aside className="hidden md:flex w-72 lg:w-80 bg-[#08080a] border-r border-white/10 flex-col shrink-0 h-screen sticky top-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <SolarLogo size="md" />
        </div>

        {/* Studio Status Pill */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#d4af37]/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300">Foz do Iguaçu • Ativo</span>
          </div>
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#f3d789] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
            CRM Pro
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer",
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg shadow-[#d4af37]/20"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard &amp; Métricas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("kanban")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer",
              activeTab === "kanban"
                ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg shadow-[#d4af37]/20"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Kanban className="w-4 h-4 shrink-0" />
            <div className="flex items-center justify-between flex-1">
              <span>Pipeline CRM (Kanban)</span>
              <span
                className={cn(
                  "text-[0.65rem] px-2 py-0.5 rounded-full font-extrabold",
                  activeTab === "kanban" ? "bg-black text-[#f3d789]" : "bg-white/10 text-zinc-300"
                )}
              >
                {sessionsCount}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sessions")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer",
              activeTab === "sessions"
                ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg shadow-[#d4af37]/20"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <FolderKanban className="w-4 h-4 shrink-0" />
            <div className="flex items-center justify-between flex-1">
              <span>Gestão de Ensaios</span>
              <span
                className={cn(
                  "text-[0.65rem] px-2 py-0.5 rounded-full font-extrabold",
                  activeTab === "sessions" ? "bg-black text-[#f3d789]" : "bg-white/10 text-zinc-300"
                )}
              >
                {sessionsCount}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={onStartRegisterNew}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer",
              activeTab === "new-session"
                ? "bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black shadow-lg shadow-[#d4af37]/20"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>Registrar Novo Ensaio</span>
          </button>
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#060608]">
          <button
            type="button"
            onClick={onStartRegisterNew}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] text-black font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Ensaio &amp; Upload</span>
          </button>

          <button
            type="button"
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Site Principal</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/20 py-2 px-4 rounded-2xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do Painel</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                if (confirm("Deseja restaurar os ensaios de demonstração do Solar Estúdio?")) {
                  onResetDefaults();
                }
              }}
              className="text-[0.65rem] text-zinc-500 hover:text-zinc-400 underline transition-colors cursor-pointer"
            >
              Restaurar Dados Padrão
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
