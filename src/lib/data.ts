import type { RequestStatus } from "@/components/StatusBadge";

export type HelpCategory =
  | "food"
  | "clothing"
  | "housing"
  | "medical"
  | "education";

export const categoryMeta: Record<HelpCategory, { label: string; emoji: string; description: string }> = {
  food: { label: "Азық-түлік", emoji: "🍞", description: "Тағам себеттері, ыстық тамақ, балаларға арналған тамақтану." },
  clothing: { label: "Киім", emoji: "🧥", description: "Маусымдық киімдер, аяқ киім, балаларға арналған заттар." },
  housing: { label: "Тұрғын үй", emoji: "🏠", description: "Уақытша баспана, жөндеу жұмыстары, коммуналдық төлем." },
  medical: { label: "Медициналық", emoji: "🩺", description: "Дәрі-дәрмек, ем-шара, мүгедектік құралдары." },
  education: { label: "Білім беру", emoji: "📚", description: "Оқу құралдары, курстар, репетитор қызметі." },
  
};

export type Request = {
  id: string;
  title: string;
  category: HelpCategory;
  district: string;
  // Approximate Almaty coords
  lat: number;
  lng: number;
  status: RequestStatus;
  description: string;
  createdAt: string;
  requester: string;
};

// Almaty bounds approx: lat 43.20–43.30, lng 76.85–77.00
export const requests: Request[] = [
  {
    id: "REQ-1042",
    title: "Көп балалы отбасы үшін азық-түлік себеті",
    category: "food",
    district: "Алмалы ауданы",
    lat: 43.255,
    lng: 76.925,
    status: "pending",
    description: "Бес балалы отбасы үшін бір айлық негізгі азық-түлік қажет.",
    createdAt: "2026-04-18",
    requester: "Айгүл С.",
  },
  {
    id: "REQ-1041",
    title: "Қарт кісіге дәрі-дәрмек алуға көмек",
    category: "medical",
    district: "Медеу ауданы",
    lat: 43.232,
    lng: 76.978,
    status: "in_progress",
    description: "Қант диабетіне арналған дәрілер мен глюкометр жолақтары.",
    createdAt: "2026-04-17",
    requester: "Серік Қ.",
  },
  {
    id: "REQ-1040",
    title: "Балаларға қысқы киім жинау",
    category: "clothing",
    district: "Жетісу ауданы",
    lat: 43.295,
    lng: 76.895,
    status: "completed",
    description: "3 баланы жылы курткамен, етікпен қамтамасыз ету.",
    createdAt: "2026-04-15",
    requester: "Мадина Б.",
  },
  {
    id: "REQ-1039",
    title: "Студент үшін оқулықтар",
    category: "education",
    district: "Бостандық ауданы",
    lat: 43.225,
    lng: 76.91,
    status: "pending",
    description: "1 курс студентіне инженерия пәні бойынша оқулықтар қажет.",
    createdAt: "2026-04-16",
    requester: "Нұрлан Т.",
  },
  
  {
    id: "REQ-1037",
    title: "Жалғыз басты анаға тұрғын үй жөндеуі",
    category: "housing",
    district: "Турксіб ауданы",
    lat: 43.285,
    lng: 76.96,
    status: "pending",
    description: "Терезелер мен жылыту жүйесін жөндеу қажет.",
    createdAt: "2026-04-13",
    requester: "Әсем Ж.",
  },
  {
    id: "REQ-1036",
    title: "Балалар үйіне кітаптар",
    category: "education",
    district: "Наурызбай ауданы",
    lat: 43.205,
    lng: 76.84,
    status: "completed",
    description: "Көркем әдебиет және оқу-әдістемелік құралдар.",
    createdAt: "2026-04-10",
    requester: "Ержан М.",
  },
  

]