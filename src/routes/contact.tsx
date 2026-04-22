import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Байланыс " },
      { name: "description", content: "Бізбен хабарласыңыз. Сұрақтарыңызға жауап беруге дайынбыз." },
      { property: "og:title", content: "Байланыс " },
      { property: "og:description", content: "Қолдау, серіктестік, медиа сұрақтары." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email("Дұрыс email енгізіңіз").max(255),
  message: z.string().trim().min(10, "Кемінде 10 таңба").max(1000),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold md:text-5xl">Бізбен байланысыңыз</h1>
        <p className="mt-3 text-muted-foreground">
          Сұрақтар, ұсыныстар немесе серіктестік туралы хабарласыңыз — біз қуана жауап береміз.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Мекенжай", text: "Алматы қ., Достық даңғылы 124, 5-қабат" },
            { icon: Phone, title: "Телефон", text: "+7 (727) 350-00-00" },
            { icon: Mail, title: "Email", text: "info@charityconnect.kz" },
            { icon: Clock, title: "Жұмыс уақыты", text: "Дс–Жм: 9:00–19:00 · Сб: 10:00–15:00" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="flex items-center justify-center rounded-2xl border border-success/30 bg-success/5 p-10 text-center">
            <div>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h2 className="mt-4 text-xl font-semibold">Хабарламаңыз жіберілді!</h2>
              <p className="mt-2 text-sm text-muted-foreground">Жақын арада сізбен байланысамыз.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="space-y-2">
              <Label>Аты-жөні</Label>
              <Input name="name" placeholder="Сіздің атыңыз" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label>Хабарлама</Label>
              <Textarea name="message" rows={6} placeholder="Қалай көмектесе аламыз?" />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">Жіберу</Button>
          </form>
        )}
      </div>
    </div>
  );
}
