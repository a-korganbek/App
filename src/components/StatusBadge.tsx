import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type RequestStatus = "pending" | "in_progress" | "completed";

const config = {
  pending: {
    label: "Күтуде",
    sub: "Ожидает",
    icon: Clock,
    classes: "bg-warning/15 text-[oklch(0.45_0.15_75)] border-warning/30",
  },
  in_progress: {
    label: "Жұмыста",
    sub: "В работе",
    icon: Loader2,
    classes: "bg-info/15 text-info border-info/30",
  },
  completed: {
    label: "Көмек көрсетілді",
    sub: "Помощь оказана",
    icon: CheckCircle2,
    classes: "bg-success/15 text-success border-success/30",
  },
} as const;

export function StatusBadge({ status, showSub = false }: { status: RequestStatus; showSub?: boolean }) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        c.classes,
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", status === "in_progress" && "animate-spin")} />
      {c.label}
      {showSub && <span className="opacity-60">· {c.sub}</span>}
    </span>
  );
}
