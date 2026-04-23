import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryMeta } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Қайырымдылықтың цифрлық платформасы" },
      { name: "description", content: "Еріктілерді көмекке мұқтаж адамдармен байланыстыратын ашық платформа. Алматы қаласы бойынша көмек беріңіз немесе сұраңыз." },
      { property: "og:title", content: "Қайырымдылықтың цифрлық платформасы" },
      { property: "og:description", content: "Қайырымдылықты ашық, жылдам және қолжетімді ететін цифрлық платформа." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-soft)]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Қазақстандағы №1 қайырымдылық платформасы
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Жақсылық бір батырманың қашықтығында
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Еріктілерді көмекке мұқтаж адамдармен байланыстыратын ашық
                платформа. Әрбір өтінім, әрбір көрсетілген көмек — нақты, бақыланады және ашық.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2 shadow-[var(--shadow-soft)]">
                  <Link to="/requests">
                    <HandHeart className="h-5 w-5" />
                    Көмек беру
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link to="/request">
                    Көмек сұрау
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
                <Stat value="500+" label="Көмек көрсетілді" />
                <Stat value="112" label="Белсенді ерікті" />
                <Stat value="5" label="Көмек бағыты" />
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-[var(--gradient-hero)] opacity-20 blur-2xl" />
              <div className="relative rounded-3xl border border-border bg-card/80 p-6 shadow-[var(--shadow-elegant)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Бүгінгі белсенділік</span>
                  <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { name: "Ержан М.", action: "Балалар үйіне кітаптар алды", time: "5 мин бұрын", icon: "📚" },
                    { name: "Мадина Б.", action: "балаға киім алды", time: "28 мин бұрын", icon: "🧥" },                   
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-lg">
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{item.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
                  <Link to="/requests">Барлық өтінімдерді көру →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Қалай жұмыс істейді</h2>
          <p className="mt-3 text-muted-foreground">Үш қарапайым қадам — нақты нәтиже</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: HandHeart, title: "1. Өтінім жасаңыз", text: "Көмекке мұқтаж адам немесе оның туысы бірнеше минутта өтінім қалдырады." },
            { icon: Users, title: "2. Ерікті таңдайды", text: "Ерікті өтінімді өзіне алып, көмек көрсетеді." },
            { icon: ShieldCheck, title: "3. Мәртебесі жаңарады", text: "Өтінім «Күтуде → Жұмыста → Аяқталды» жолымен ашық бақыланады." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Көмек түрлері</h2>
              <p className="mt-2 text-muted-foreground">Алты негізгі бағыт бойынша қолдау</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/categories">Барлығын көру →</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryMeta).map(([key, c]) => (
              <Link
                key={key}
                to="/categories"
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.emoji}</span>
                  <h3 className="text-lg font-semibold">{c.label}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                  Көбірек білу <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-foreground md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
