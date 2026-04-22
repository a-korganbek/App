import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { categoryMeta, type HelpCategory } from "@/lib/data";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Ерікті болу " },
      { name: "description", content: "Еріктілер қауымдастығына қосылыңыз." },
      { property: "og:title", content: "Ерікті болу " },
      { property: "og:description", content: "Тіркеліп, көмекке мұқтаждарға қол ұшын беріңіз." },
    ],
  }),
  component: VolunteerPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email("Дұрыс email енгізіңіз").max(255),
  phone: z.string().trim().min(7).max(20),
  city: z.string().trim().min(2).max(100),
  motivation: z.string().trim().min(10, "Кемінде 10 таңба").max(1000),
});

function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interests, setInterests] = useState<HelpCategory[]>([]);

  function toggle(c: HelpCategory) {
    setInterests((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      motivation: String(fd.get("motivation") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 md:px-6">
        <div className="rounded-3xl border border-success/30 bg-success/5 p-10 text-center shadow-[var(--shadow-card)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-bold">Қош келдіңіз!</h1>
          <p className="mt-3 text-muted-foreground">
            Email арқылы келесі қадамдар туралы хабарлама жіберілді.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-soft text-secondary">
          <HeartHandshake className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">Ерікті ретінде тіркеліңіз</h1>
        <p className="mt-3 text-muted-foreground">
          Біздің қауымдастыққа қосылып, нақты өзгеріс жасауға атсалысыңыз.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <Field label="Толық аты-жөні" error={errors.fullName}>
          <Input name="fullName" placeholder="Бекжан Әбілов" />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Email" error={errors.email}>
            <Input name="email" type="email" placeholder="you@example.com" />
          </Field>
          <Field label="Телефон" error={errors.phone}>
            <Input name="phone" placeholder="+7 (___) ___-__-__" />
          </Field>
        </div>
        <Field label="Қала" error={errors.city}>
          <Input name="city" placeholder="Алматы" />
        </Field>

        <div className="space-y-2">
          <Label>Қызығушылық бағыттары</Label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryMeta) as HelpCategory[]).map((k) => (
              <button
                type="button"
                key={k}
                onClick={() => toggle(k)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  interests.includes(k)
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-background hover:border-secondary/40"
                }`}
              >
                {categoryMeta[k].emoji} {categoryMeta[k].label}
              </button>
            ))}
          </div>
        </div>

        <Field label="Неліктен ерікті болғыңыз келеді?" error={errors.motivation}>
          <Textarea name="motivation" rows={4} placeholder="Бірнеше сөйлеммен сипаттаңыз..." />
        </Field>

        <Button type="submit" size="lg" className="w-full">
          Тіркелуді аяқтау
        </Button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
