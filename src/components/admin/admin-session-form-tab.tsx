import React, { RefObject } from "react";
import { ArrowLeft, Upload, Trash2, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { SessionCategory, SessionPhoto, SessionStage, PaymentStatus } from "@/src/types/session";
import { cn } from "@/src/lib/utils";

interface StageInfo {
  key: SessionStage;
  label: string;
}

interface AdminSessionFormTabProps {
  editingSessionId: string | null;
  formData: {
    code: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    category: SessionCategory;
    date: string;
    location: string;
    contractValue: number;
    paymentStatus: PaymentStatus;
    stage: SessionStage;
    notes: string;
    coverImage: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      code: string;
      clientName: string;
      clientEmail: string;
      clientPhone: string;
      category: SessionCategory;
      date: string;
      location: string;
      contractValue: number;
      paymentStatus: PaymentStatus;
      stage: SessionStage;
      notes: string;
      coverImage: string;
    }>
  >;
  categories: SessionCategory[];
  stages: StageInfo[];
  uploadedPhotosDraft: SessionPhoto[];
  setUploadedPhotosDraft: React.Dispatch<React.SetStateAction<SessionPhoto[]>>;
  isUploading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  handleDraftFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveSession: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function AdminSessionFormTab({
  editingSessionId,
  formData,
  setFormData,
  categories,
  stages,
  uploadedPhotosDraft,
  setUploadedPhotosDraft,
  isUploading,
  fileInputRef,
  handleDraftFileUpload,
  handleSaveSession,
  onCancel,
}: AdminSessionFormTabProps) {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-12">
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-8 lg:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 mb-6">
          <div>
            <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
              {editingSessionId ? "Editar Ensaio & Fotos" : "Registrar Novo Ensaio & Upload"}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Preencha os dados e anexe as fotos do ensaio sem limite de fotos.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Lista</span>
          </button>
        </div>

        <form onSubmit={handleSaveSession} className="space-y-6 sm:space-y-8">
          {/* 1. Client & Contract Metadata */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f3d789] mb-4 flex items-center gap-2">
              <span>1. Informações do Cliente &amp; Contrato</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Code */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Código Único do Ensaio *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  placeholder="Ex: SOLAR-ANA"
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-mono font-bold text-[#f3d789] focus:outline-none focus:border-[#d4af37] uppercase min-h-[44px]"
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Nome do Cliente / Casal *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Ex: Ana & Pedro"
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  WhatsApp do Cliente
                </label>
                <input
                  type="text"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+55 45 99144-9463"
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Categoria do Ensaio
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as SessionCategory })
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-zinc-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Data do Ensaio
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Local em Foz do Iguaçu
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Foz do Iguaçu, PR"
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              {/* Contract Value */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Valor do Contrato (R$)
                </label>
                <input
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) =>
                    setFormData({ ...formData, contractValue: Number(e.target.value) })
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                />
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Status do Pagamento
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                >
                  <option value="pendente" className="bg-zinc-900 text-white">Pendente</option>
                  <option value="sinal" className="bg-zinc-900 text-white">Sinal Pago (50%)</option>
                  <option value="pago" className="bg-zinc-900 text-white">Quitado / Pago (100%)</option>
                </select>
              </div>

              {/* Pipeline Stage */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Etapa no Pipeline CRM
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value as SessionStage })
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] min-h-[44px]"
                >
                  {stages.map((s) => (
                    <option key={s.key} value={s.key} className="bg-zinc-900 text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                Observações &amp; Detalhes do Ensaio
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Preferências de poses, locais escolhidos, pacote de álbuns, etc."
                className="w-full bg-black/60 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* 2. Integrated Photo Upload (NO LIMIT) */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f3d789] flex items-center gap-2">
                  <span>2. Upload de Fotos (Sem limite de fotos)</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Fotos prontas para o cliente baixar na Área do Cliente.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleDraftFileUpload}
                className="hidden"
                id="draft-file-upload-input"
              />

              <label
                htmlFor="draft-file-upload-input"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer shrink-0 min-h-[42px]"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? "Processando..." : "Selecionar Fotos"}</span>
              </label>
            </div>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 hover:border-[#d4af37]/80 bg-black/40 hover:bg-[#d4af37]/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all mb-6"
            >
              <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#d4af37]/10 text-[#f3d789] border border-[#d4af37]/20 mb-3">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                Toque aqui para selecionar fotos do seu dispositivo
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                JPG, PNG, WEBP sem limite de quantidade.
              </p>
            </div>

            {/* Uploaded Photos Preview Grid with touch-friendly controls */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Fotos Anexadas ({uploadedPhotosDraft.length})
                </span>
              </div>

              {uploadedPhotosDraft.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
                  {uploadedPhotosDraft.map((photo, i) => {
                    const isCover = formData.coverImage === photo.url;
                    return (
                      <div
                        key={photo.id || i}
                        className={cn(
                          "group relative aspect-[3/4] rounded-2xl overflow-hidden border bg-black shadow-md flex flex-col justify-between p-2",
                          isCover ? "border-[#d4af37] ring-2 ring-[#d4af37]/50" : "border-white/10"
                        )}
                      >
                        <img
                          src={photo.url}
                          alt={photo.title || `Foto ${i + 1}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                        {/* Top controls */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-[0.65rem] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                            #{i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedPhotosDraft((prev) =>
                                prev.filter((p) => p.id !== photo.id)
                              )
                            }
                            className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 shadow"
                            title="Remover foto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Bottom controls (Always accessible on mobile) */}
                        <div className="relative z-10 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((f) => ({ ...f, coverImage: photo.url }))
                            }
                            className={cn(
                              "w-full text-[0.65rem] font-bold py-1.5 rounded transition-colors min-h-[30px]",
                              isCover ? "bg-[#d4af37] text-black shadow" : "bg-black/70 text-white hover:bg-black"
                            )}
                          >
                            {isCover ? "★ Capa" : "Definir Capa"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <p className="text-xs text-zinc-500">
                    Nenhuma foto anexada ainda.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 text-center sm:text-left">
              O código <strong className="text-[#f3d789] font-mono">{formData.code}</strong> ficará ativo imediatamente na Área do Cliente.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onCancel}
                className="w-1/2 sm:w-auto rounded-full px-5 py-3 text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 text-center min-h-[44px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-6 py-3 text-xs sm:text-sm font-bold text-black hover:brightness-110 shadow-xl shadow-[#d4af37]/20 text-center min-h-[44px]"
              >
                {editingSessionId ? "Salvar Alterações" : "Ativar Ensaio"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
