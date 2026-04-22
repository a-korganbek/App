import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { requests as initialRequests, categoryMeta, type Request, type HelpCategory } from "@/lib/data";
import { StatusBadge, type RequestStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Өтінімдер" },
      { name: "description", content: "Алматы қаласы бойынша белсенді көмек өтінімдерінің тізімі. Өтінімді таңдап, мәртебесін жаңартыңыз." },
      { property: "og:title", content: "Өтінімдер тізімі" },
      { property: "og:description", content: "Көмекке мұқтаж адамдардың ашық өтінімдері" },
    ],
  }),
  component: RequestsPage,
});

const statusOrder: RequestStatus[] = ["pending", "in_progress", "completed"];

function RequestsPage() {
  const [items, setItems] = useState<Request[]>(initialRequests);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [cat, setCat] = useState<"all" | HelpCategory>("all");

  const filtered = items.filter(
    (r) => (filter === "all" || r.status === filter) && (cat === "all" || r.category === cat),
  );

  function nextStatus(r: Request) {
    const idx = statusOrder.indexOf(r.status);
    const next = statusOrder[Math.min(idx + 1, statusOrder.length - 1)];
    setItems((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: next } : x)));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Белсенді өтінімдер</h1>
          <p className="mt-2 text-muted-foreground">
            Әрбір өтінімнің мәртебесі ашық: «Күтуде → Жұмыста → Көмек көрсетілді»
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Барлығы: <span className="font-semibold text-foreground">{filtered.length}</span> өтінім
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>Барлығы</FilterChip>
          <FilterChip active={filter === "pending"} onClick={() => setFilter("pending")}>Күтуде</FilterChip>
          <FilterChip active={filter === "in_progress"} onClick={() => setFilter("in_progress")}>Жұмыста</FilterChip>
          <FilterChip active={filter === "completed"} onClick={() => setFilter("completed")}>Аяқталды</FilterChip>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>Барлық санат</FilterChip>
          {(Object.keys(categoryMeta) as HelpCategory[]).map((k) => (
            <FilterChip key={k} active={cat === k} onClick={() => setCat(k)}>
              {categoryMeta[k].emoji} {categoryMeta[k].label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-2xl">
                  {categoryMeta[r.category].emoji}
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{r.id}</p>
                  <h3 className="font-semibold">{r.title}</h3>
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.district}</span>
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {r.requester}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.createdAt}</span>
            </div>

            {r.status !== "completed" && (
              <Button onClick={() => nextStatus(r)} size="sm" className="mt-4 w-full">
                {r.status === "pending" ? "Өтінімді қабылдау" : "Көмек көрсетілді деп белгілеу"}
              </Button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Сүзгілер бойынша өтінім табылмады.
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
