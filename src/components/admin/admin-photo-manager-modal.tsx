import React, { RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Trash2, Download, Image as ImageIcon } from "lucide-react";
import { ClientSession } from "@/src/types/session";
import { downloadImage } from "@/src/lib/download-helper";
import { cn } from "@/src/lib/utils";

interface AdminPhotoManagerModalProps {
  session: ClientSession | null;
  onClose: () => void;
  isUploading: boolean;
  manageFileInputRef: RefObject<HTMLInputElement>;
  handleManageSessionFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhotoFromSession: (sessionId: string, photoId: string) => void;
  setSessionCover: (sessionId: string, photoUrl: string) => void;
  setManagingPhotosSession: React.Dispatch<React.SetStateAction<ClientSession | null>>;
}

export function AdminPhotoManagerModal({
  session,
  onClose,
  isUploading,
  manageFileInputRef,
  handleManageSessionFileUpload,
  removePhotoFromSession,
  setSessionCover,
  setManagingPhotosSession,
}: AdminPhotoManagerModalProps) {
  if (!session) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          className="relative max-h-[96vh] sm:max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/20 bg-zinc-950 p-4 sm:p-8 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 mb-4 sm:mb-6">
              <div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                  Acervo: {session.clientName}
                </h3>
                <p className="text-xs text-[#f3d789] font-mono mt-0.5">
                  Código: {session.code} • {session.category}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 mb-5">
              <div className="text-xs text-zinc-300 text-center sm:text-left">
                <strong className="text-white">Adicionar mais fotos:</strong> Sem limite de armazenamento.
              </div>

              <input
                ref={manageFileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleManageSessionFileUpload}
                className="hidden"
                id="modal-manage-file-upload-input"
              />

              <label
                htmlFor="modal-manage-file-upload-input"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer shrink-0 min-h-[42px]"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? "Processando fotos..." : "Upload de Novas Fotos"}</span>
              </label>
            </div>

            {/* Photos Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Fotos Cadastradas ({session.photos?.length || 0})
              </h4>

              {session.photos && session.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                  {session.photos.map((photo, i) => {
                    const isCover = session.coverImage === photo.url;
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

                        {/* Top controls */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-[0.65rem] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                            #{i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              removePhotoFromSession(session.id, photo.id);
                              setManagingPhotosSession((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      photos: (prev.photos || []).filter((p) => p.id !== photo.id),
                                    }
                                  : null
                              );
                            }}
                            className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 shadow min-h-[28px] min-w-[28px] flex items-center justify-center cursor-pointer"
                            title="Excluir foto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Bottom action buttons (Always reachable on mobile touch) */}
                        <div className="relative z-10 space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSessionCover(session.id, photo.url);
                              setManagingPhotosSession((prev) =>
                                prev ? { ...prev, coverImage: photo.url } : null
                              );
                            }}
                            className={cn(
                              "w-full text-[0.65rem] font-bold py-1.5 rounded transition-colors min-h-[28px] cursor-pointer",
                              isCover ? "bg-[#d4af37] text-black shadow" : "bg-black/70 text-white hover:bg-black"
                            )}
                          >
                            {isCover ? "★ É a Capa" : "Definir Capa"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              downloadImage(
                                photo.url,
                                `Solar-${session.code}-Foto-${i + 1}.jpg`
                              )
                            }
                            className="w-full text-[0.65rem] font-semibold bg-white/20 hover:bg-white/30 text-white py-1.5 rounded flex items-center justify-center gap-1 min-h-[28px] cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>Baixar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-xs text-zinc-400">Nenhuma foto adicionada ainda.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer button */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-6 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer min-h-[42px]"
            >
              Concluir Edição do Acervo
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
