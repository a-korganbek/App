import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { categoryMeta, type HelpCategory } from "@/lib/data";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Көмек сұрау " },
      { name: "description", content: "Көмекке мұқтажсыз ба? Өтінімді бірнеше минут ішінде жасаңыз." },
      { property: "og:title", content: "Көмек сұрау " },
      { property: "og:description", content: "Өтінім қалдырыңыз — еріктілер сізгбен байланысады." },
    ],
  }),
  component: RequestPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Атыңызды толық көрсетіңіз").max(100),
  location: z.string().trim().min(2, "Орналасуыңызды көрсетіңіз").max(150),
  category: z.string().min(1, "Көмек түрін таңдаңыз"),
  description: z.string().trim().min(10, "Кемінде 10 таңба").max(1000),
  phone: z.string().trim().min(7, "Дұрыс телефон нөмірін енгізіңіз").max(20),
});

function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<HelpCategory | "">("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      location: String(fd.get("location") ?? ""),
      category: String(fd.get("category") ?? ""),
      description: String(fd.get("description") ?? ""),
      phone: String(fd.get("phone") ?? ""),
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
          <h1 className="mt-5 text-2xl font-bold">Өтінімді қабылданды!</h1>
          <p className="mt-3 text-muted-foreground">
            Жақын арада еріктілер сізбен байланысады.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Өтінім нөмірі: <span className="font-semibold text-foreground">REQ-{Math.floor(1000 + Math.random() * 9000)}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Көмек сұрау</h1>
        <p className="mt-3 text-muted-foreground">
          Деректеріңізді толтырыңыз. Барлық ақпарат құпия сақталады.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <Field label="Аты-жөні" error={errors.name}>
          <Input name="name" placeholder="Айгүл Сейтжанова" />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Орналасу (қала, аудан)" error={errors.location}>
            <Input name="location" placeholder="Алматы, Алмалы ауданы" />
          </Field>
          <Field label="Телефон" error={errors.phone}>
            <Input name="phone" placeholder="+7 (___) ___-__-__" />
          </Field>
        </div>

        <Field label="Көмек түрі" error={errors.category}>
          <input type="hidden" name="category" value={category} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.keys(categoryMeta) as HelpCategory[]).map((k) => (
              <button
                type="button"
                key={k}
                onClick={() => setCategory(k)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm transition ${
                  category === k
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-background hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{categoryMeta[k].emoji}</span>
                <span className="font-medium">{categoryMeta[k].label}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Жағдайды сипаттаңыз" error={errors.description}>
          <Textarea name="description" rows={5} placeholder="Қандай көмек қажет екенін, отбасы жағдайын қысқаша жазыңыз..." />
        </Field>

        <Button type="submit" size="lg" className="w-full">
          Өтінім жіберу
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Жіберу арқылы сіз деректерді өңдеуге келісім бересіз.
        </p>
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
