export type SessionCategory =
  | "Casamento"
  | "15 Anos"
  | "Ensaio Autoral"
  | "Pré-Wedding"
  | "Família"
  | "Corporativo";

export type SessionStage =
  | "lead"
  | "agendado"
  | "fotografado"
  | "selecao"
  | "edicao"
  | "entregue";

export type PaymentStatus = "pago" | "sinal" | "pendente";

export interface SessionPhoto {
  id: string;
  url: string;
  title?: string;
  favorite?: boolean;
}

export interface ClientSession {
  id: string;
  code: string; // e.g. "OK-15-VALENTINA"
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
  photos: SessionPhoto[];
  downloadUrl?: string;
  createdAt: string;
}

export const INITIAL_SESSIONS: ClientSession[] = [
  {
    id: "sess_1",
    code: "SOLAR-15-VALENTINA",
    clientName: "Valentina & Família",
    clientEmail: "glaucia.mae@email.com",
    clientPhone: "+55 45 99144-9463",
    category: "15 Anos",
    date: "2026-06-20",
    location: "Portal da Foz & Parque Nacional de Foz do Iguaçu",
    contractValue: 4800,
    paymentStatus: "pago",
    stage: "entregue",
    notes: "Debutante sonha com fotos no pôr do sol e valsa com efeitos de luz. Solicitou álbum encadernado 30x30.",
    coverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    downloadUrl: "#download",
    createdAt: "2026-05-10",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80", title: "A Dança das Estrelas", favorite: true },
      { id: "p2", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=80", title: "Entrada Triunfal no Portão Imperial", favorite: true },
      { id: "p3", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80", title: "Retrato em Bokeh Noturno", favorite: false },
      { id: "p4", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80", title: "Ensaio Pré-Festa no Lago", favorite: true },
    ],
  },
  {
    id: "sess_2",
    code: "SOLAR-CASAMENTO-LUCAS",
    clientName: "Mariana & Lucas",
    clientEmail: "mari.lucas@email.com",
    clientPhone: "+55 45 99144-9463",
    category: "Casamento",
    date: "2026-07-15",
    location: "Recanto das Cataratas & Estúdio Solar",
    contractValue: 8500,
    paymentStatus: "pago",
    stage: "entregue",
    notes: "Casamento ao ar livre em Foz do Iguaçu. Cerimônia às 16h com luz dourada. Pacote completo: Foto + Filme 4K + Álbum Couro.",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    downloadUrl: "#download",
    createdAt: "2026-04-12",
    photos: [
      { id: "p5", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80", title: "A Magia do Véu e Emoção", favorite: true },
      { id: "p6", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", title: "Chegada no Casamento", favorite: true },
      { id: "p7", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80", title: "O Abraço ao Pôr do Sol", favorite: true },
      { id: "p8", url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80", title: "Luz Dourada no Jardim", favorite: false },
    ],
  },
  {
    id: "sess_3",
    code: "SOLAR-15-MARYANA",
    clientName: "Maryana (Pais Eric & Fabi)",
    clientEmail: "eric.fabi@email.com",
    clientPhone: "+55 45 99144-9463",
    category: "15 Anos",
    date: "2026-08-10",
    location: "Estúdio Solar - Rua Cardeal, 545, Foz do Iguaçu",
    contractValue: 5200,
    paymentStatus: "pago",
    stage: "entregue",
    notes: "Ensaio fotográfico no estúdio com vestido e festa com tema realeza. Cliente muito emocionado com a entrega das prévias.",
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
    downloadUrl: "#download",
    createdAt: "2026-07-01",
    photos: [
      { id: "p9", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80", title: "Retrato Real", favorite: true },
      { id: "p10", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80", title: "Momento da Valsa", favorite: true },
      { id: "p11", url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80", title: "Close Emocionante", favorite: true },
    ],
  },
  {
    id: "sess_4",
    code: "SOLAR-ENSAIO-SOFIA",
    clientName: "Sofia Andrade",
    clientEmail: "sofia.andrade@email.com",
    clientPhone: "+55 45 99144-9463",
    category: "Ensaio Autoral",
    date: "2026-08-25",
    location: "Pôr do Sol - Foz do Iguaçu, PR",
    contractValue: 1800,
    paymentStatus: "sinal",
    stage: "edicao",
    notes: "Ensaio autoral conceitual em Foz do Iguaçu. 40 fotos selecionadas em fase final de color grading cinematográfico.",
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    downloadUrl: "#download",
    createdAt: "2026-08-15",
    photos: [
      { id: "p12", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80", title: "Reflexos & Serenidade", favorite: true },
      { id: "p13", url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80", title: "Luz Dourada & Natureza", favorite: false },
    ],
  },
];
