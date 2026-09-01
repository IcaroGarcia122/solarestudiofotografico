import React from "react";
import { DollarSign, Camera, Image as ImageIcon, TrendingUp, Plus } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ClientSession } from "@/src/types/session";

interface AdminStatsTabProps {
  sessions: ClientSession[];
  totalRevenue: number;
  paidRevenue: number;
  totalPhotosCount: number;
  averageTicket: number;
  deliveredCount: number;
  activeCount: number;
  monthlyData: { month: string; faturamento: number; ensaios: number }[];
  categoryChartData: { name: string; value: number }[];
  pieColors: string[];
  onStartRegisterNew: () => void;
}

export function AdminStatsTab({
  sessions,
  totalRevenue,
  paidRevenue,
  totalPhotosCount,
  averageTicket,
  deliveredCount,
  activeCount,
  monthlyData,
  categoryChartData,
  pieColors,
  onStartRegisterNew,
}: AdminStatsTabProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* KPI Cards Grid - Optimized for Mobile (2 cols on small screens, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Faturamento */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 pointer-events-none">
            <DollarSign className="w-10 h-10 sm:w-16 sm:h-16 text-[#d4af37]" />
          </div>
          <span className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Faturamento Total
          </span>
          <div className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#f3d789] truncate">
            R$ {totalRevenue.toLocaleString("pt-BR")}
          </div>
          <div className="mt-1 sm:mt-2 text-[0.65rem] sm:text-xs text-zinc-400 truncate">
            <span className="text-emerald-400 font-bold">R$ {paidRevenue.toLocaleString("pt-BR")}</span> pagos
          </div>
        </div>

        {/* Card 2: Ensaios */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 pointer-events-none">
            <Camera className="w-10 h-10 sm:w-16 sm:h-16 text-[#d4af37]" />
          </div>
          <span className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Ensaios Cadastrados
          </span>
          <div className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-extrabold text-white">
            {sessions.length}
          </div>
          <div className="mt-1 sm:mt-2 text-[0.65rem] sm:text-xs text-zinc-400 truncate">
            <strong className="text-[#f3d789]">{activeCount}</strong> em produção
          </div>
        </div>

        {/* Card 3: Fotos */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 pointer-events-none">
            <ImageIcon className="w-10 h-10 sm:w-16 sm:h-16 text-[#d4af37]" />
          </div>
          <span className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Fotos no Acervo
          </span>
          <div className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#f3d789]">
            {totalPhotosCount}
          </div>
          <div className="mt-1 sm:mt-2 text-[0.65rem] sm:text-xs text-zinc-400 truncate">
            Sem limite de fotos
          </div>
        </div>

        {/* Card 4: Ticket Médio */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 pointer-events-none">
            <TrendingUp className="w-10 h-10 sm:w-16 sm:h-16 text-[#d4af37]" />
          </div>
          <span className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Ticket Médio
          </span>
          <div className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-extrabold text-emerald-400 truncate">
            R$ {averageTicket.toLocaleString("pt-BR")}
          </div>
          <div className="mt-1 sm:mt-2 text-[0.65rem] sm:text-xs text-zinc-400 truncate">
            {deliveredCount} entregues
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Evolution Chart */}
        <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                Evolução de Faturamento Mensal (R$)
              </h3>
              <p className="text-[0.7rem] sm:text-xs text-zinc-400 mt-0.5">
                Crescimento de contratos fechados no Solar Estúdio
              </p>
            </div>
            <span className="self-start sm:self-auto text-[0.65rem] sm:text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
              + 38% vs anterior
            </span>
          </div>

          <div className="h-56 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="faturamento"
                  stroke="#d4af37"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorFaturamento)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-sans text-sm sm:text-base font-bold text-white">
              Distribuição por Categoria
            </h3>
            <p className="text-[0.7rem] sm:text-xs text-zinc-400 mt-0.5">
              Proporção de tipos de ensaios realizados
            </p>
          </div>

          <div className="h-44 sm:h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  innerRadius={38}
                  paddingAngle={4}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[0.7rem] sm:text-xs pt-2 border-t border-white/5">
            {categoryChartData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 text-zinc-300">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                />
                <span className="truncate">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white text-center sm:text-left">
            Registrar novo cliente ou carregar fotos?
          </h3>
          <p className="text-[0.7rem] sm:text-xs text-zinc-400 mt-0.5 text-center sm:text-left">
            Adicione fotos sem limite e ative o código exclusivo da Área do Cliente.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartRegisterNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Novo Ensaio Agora</span>
        </button>
      </div>
    </div>
  );
}
