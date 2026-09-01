import React, { createContext, useContext, useEffect, useState } from "react";
import { ClientSession, INITIAL_SESSIONS, SessionPhoto, SessionStage } from "@/src/types/session";

const STORAGE_KEY = "solar_estudio_sessions_v2";

interface SessionContextType {
  sessions: ClientSession[];
  findSessionByCode: (code: string) => ClientSession | undefined;
  addSession: (session: Omit<ClientSession, "id" | "createdAt">) => ClientSession;
  updateSession: (id: string, updated: Partial<ClientSession>) => void;
  deleteSession: (id: string) => void;
  updateSessionStage: (id: string, stage: SessionStage) => void;
  addPhotosToSession: (sessionId: string, newPhotos: SessionPhoto[]) => void;
  removePhotoFromSession: (sessionId: string, photoId: string) => void;
  setSessionCover: (sessionId: string, photoUrl: string) => void;
  togglePhotoFavorite: (sessionId: string, photoId: string) => void;
  resetToDefaults: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ClientSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // Check old storage key for smooth upgrade
      const oldSaved = localStorage.getItem("okphotos_sessions_v1");
      if (oldSaved) {
        return JSON.parse(oldSaved);
      }
    } catch (e) {
      console.error("Failed to load sessions from storage:", e);
    }
    return INITIAL_SESSIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save sessions to storage:", e);
    }
  }, [sessions]);

  const findSessionByCode = (code: string) => {
    if (!code) return undefined;
    const cleanCode = code.trim().toUpperCase();
    return sessions.find(
      (s) =>
        s.code.toUpperCase() === cleanCode ||
        s.code.replace(/[-\s]/g, "").toUpperCase() === cleanCode.replace(/[-\s]/g, "")
    );
  };

  const addSession = (data: Omit<ClientSession, "id" | "createdAt">) => {
    const newSession: ClientSession = {
      ...data,
      id: `sess_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSessions((prev) => [newSession, ...prev]);
    return newSession;
  };

  const updateSession = (id: string, updated: Partial<ClientSession>) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const updateSessionStage = (id: string, stage: SessionStage) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, stage } : s))
    );
  };

  const addPhotosToSession = (sessionId: string, newPhotos: SessionPhoto[]) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const updatedPhotos = [...(s.photos || []), ...newPhotos];
        const cover = s.coverImage || newPhotos[0]?.url || "/images/portfolio-1.png";
        return {
          ...s,
          photos: updatedPhotos,
          coverImage: cover,
        };
      })
    );
  };

  const removePhotoFromSession = (sessionId: string, photoId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const updatedPhotos = (s.photos || []).filter((p) => p.id !== photoId);
        let cover = s.coverImage;
        if (updatedPhotos.length > 0 && (!cover || !updatedPhotos.some((p) => p.url === cover))) {
          cover = updatedPhotos[0].url;
        }
        return {
          ...s,
          photos: updatedPhotos,
          coverImage: cover,
        };
      })
    );
  };

  const setSessionCover = (sessionId: string, photoUrl: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, coverImage: photoUrl } : s))
    );
  };

  const togglePhotoFavorite = (sessionId: string, photoId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const updatedPhotos = (s.photos || []).map((p) =>
          p.id === photoId ? { ...p, favorite: !p.favorite } : p
        );
        return { ...s, photos: updatedPhotos };
      })
    );
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const resetToDefaults = () => {
    setSessions(INITIAL_SESSIONS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        findSessionByCode,
        addSession,
        updateSession,
        deleteSession,
        updateSessionStage,
        addPhotosToSession,
        removePhotoFromSession,
        setSessionCover,
        togglePhotoFavorite,
        resetToDefaults,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSessions() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionProvider");
  }
  return context;
}
