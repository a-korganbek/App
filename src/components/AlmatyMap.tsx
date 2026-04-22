import { useState } from "react";
import { requests, categoryMeta, type Request } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Almaty bounds
const BOUNDS = { minLat: 43.19, maxLat: 43.31, minLng: 76.83, maxLng: 77.01 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x, y };
}

const districts = [
  { name: "Медеу", lat: 43.245, lng: 76.985 },
  { name: "Алмалы", lat: 43.255, lng: 76.93 },
  { name: "Бостандық", lat: 43.225, lng: 76.91 },
  { name: "Әуезов", lat: 43.215, lng: 76.865 },
  { name: "Жетісу", lat: 43.295, lng: 76.9 },
  { name: "Турксіб", lat: 43.29, lng: 76.965 },
  { name: "Наурызбай", lat: 43.2, lng: 76.84 },
  { name: "Алатау", lat: 43.305, lng: 76.94 },
];

export function AlmatyMap() {
  const [active, setActive] = useState<Request | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[var(--primary-soft)] shadow-[var(--shadow-card)]">
        {/* Map base */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="oklch(0.55 0.18 245 / 0.08)" strokeWidth="0.2" />
            </pattern>
            <radialGradient id="cityCenter" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="oklch(0.65 0.15 195 / 0.25)" />
              <stop offset="100%" stopColor="oklch(0.65 0.15 195 / 0)" />
            </radialGradient>
          </defs>

          <rect width="100" height="100" fill="oklch(0.97 0.02 200)" />
          <rect width="100" height="100" fill="url(#grid)" />
          <rect width="100" height="100" fill="url(#cityCenter)" />

          {/* Mountains (south) */}
          <path
            d="M0,88 L8,78 L18,84 L28,72 L38,80 L50,68 L62,78 L74,70 L86,82 L100,74 L100,100 L0,100 Z"
            fill="oklch(0.85 0.05 155 / 0.55)"
          />
          <path
            d="M0,94 L12,86 L24,92 L36,82 L48,90 L60,80 L72,88 L84,82 L100,90 L100,100 L0,100 Z"
            fill="oklch(0.78 0.08 155 / 0.6)"
          />

          {/* Rivers */}
          <path d="M20,0 Q22,30 30,55 T35,100" fill="none" stroke="oklch(0.7 0.12 220)" strokeWidth="0.8" opacity="0.6" />
          <path d="M65,0 Q60,25 55,50 T62,100" fill="none" stroke="oklch(0.7 0.12 220)" strokeWidth="0.6" opacity="0.5" />

          {/* Major roads */}
          <line x1="0" y1="50" x2="100" y2="48" stroke="oklch(1 0 0)" strokeWidth="1.2" />
          <line x1="0" y1="50" x2="100" y2="48" stroke="oklch(0.8 0.02 240)" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
          <line x1="50" y1="0" x2="48" y2="100" stroke="oklch(1 0 0)" strokeWidth="1.2" />
          <line x1="50" y1="0" x2="48" y2="100" stroke="oklch(0.8 0.02 240)" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
          <line x1="0" y1="30" x2="100" y2="32" stroke="oklch(1 0 0)" strokeWidth="0.8" />
          <line x1="25" y1="0" x2="22" y2="100" stroke="oklch(1 0 0)" strokeWidth="0.7" />
          <line x1="75" y1="0" x2="78" y2="100" stroke="oklch(1 0 0)" strokeWidth="0.7" />
          <line x1="0" y1="70" x2="100" y2="68" stroke="oklch(1 0 0)" strokeWidth="0.6" />

          {/* Parks */}
          <circle cx="48" cy="48" r="3.5" fill="oklch(0.75 0.12 155 / 0.6)" />
          <circle cx="35" cy="35" r="2.2" fill="oklch(0.75 0.12 155 / 0.55)" />
          <circle cx="68" cy="55" r="2.8" fill="oklch(0.75 0.12 155 / 0.55)" />

          {/* District labels */}
          {districts.map((d) => {
            const { x, y } = project(d.lat, d.lng);
            return (
              <text
                key={d.name}
                x={x}
                y={y}
                fontSize="2"
                fill="oklch(0.4 0.05 240)"
                textAnchor="middle"
                fontWeight="600"
                opacity="0.7"
              >
                {d.name}
              </text>
            );
          })}
        </svg>

        {/* Pins */}
        {requests.map((r) => {
          const { x, y } = project(r.lat, r.lng);
          const color =
            r.status === "completed"
              ? "oklch(0.65 0.15 155)"
              : r.status === "in_progress"
                ? "oklch(0.55 0.18 245)"
                : "oklch(0.78 0.15 75)";
          return (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className="group absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-125"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={r.title}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: color }}
                />
              </span>
              <MapPin
                className="h-7 w-7 drop-shadow-md"
                style={{ color }}
                fill={color}
                strokeWidth={1.5}
              />
            </button>
          );
        })}

        {/* Compass */}
        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-xs font-bold text-foreground shadow-md backdrop-blur">
          С
        </div>

        {/* Legend */}
        <div className="absolute left-3 top-3 rounded-lg bg-card/90 p-2.5 text-xs shadow-md backdrop-blur">
          <p className="mb-1.5 font-semibold">Алматы қаласы</p>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Күтуде</div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-info" /> Жұмыста</div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Аяқталды</div>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Картадан өтінім таңдаңыз
        </h3>
        {active ? (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="text-2xl">{categoryMeta[active.category].emoji}</span>
              <StatusBadge status={active.status} />
            </div>
            <h4 className="font-semibold">{active.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {active.district} · {active.id}
            </p>
            <p className="mt-3 text-sm text-foreground/80">{active.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Өтінуші: {active.requester}</span>
              <span>{active.createdAt}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Картадағы белгіге басыңыз — өтінім туралы толық ақпарат осында көрсетіледі.
          </div>
        )}

        <div className="space-y-2">
          {requests.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]",
                active?.id === r.id && "border-primary/60 bg-primary-soft/40",
              )}
            >
              <span className="text-xl">{categoryMeta[r.category].emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{r.title}</p>
                <p className="truncate text-xs text-muted-foreground">{r.district}</p>
              </div>
              <StatusBadge status={r.status} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
