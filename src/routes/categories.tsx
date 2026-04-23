import { createFileRoute, Link } from "@tanstack/react-router";
import { categoryMeta } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Көмек түрлері" },
      { name: "description", content: "Азық-түлік, киім, тұрғын үй, медициналық, білім беру және психологиялық көмек түрлері." },
      { property: "og:title", content: "Көмек түрлері " },
      { property: "og:description", content: "Платформада қолдау көрсетілетін алты негізгі көмек бағыты." },
    ],
  }),
  component: CategoriesPage,
});

const examples: Record<string, string[]> = {
  food: ["Айлық азық-түлік себеті", "Балаларға арналған тамақтану", "Ыстық тамақ жеткізу"],
  clothing: ["Қысқы куртка және етік", "Жаңа туған нәрестеге арналған заттар", "Мектеп формасы"],
  housing: ["Уақытша баспана", "Терезе және жылыту жөндеуі", "Коммуналдық төлемді  жабу"],
  medical: ["Дәрі-дәрмек", "Реабилитация", "мүгедектерге арналған құралдар"],
  education: ["Оқулықтар мен дәптерлер", "Онлайн курстар", "Репетитор қызметі"],
};

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Көмек түрлері</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Біз қоғамның нақты қажеттіліктеріне сай алты негізгі бағыт бойынша көмек көрсетеміз.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryMeta).map(([key, c]) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="absolute -right-6 -top-6 text-7xl opacity-10 transition group-hover:scale-110">
              {c.emoji}
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">
              {c.emoji}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{c.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>

            <ul className="mt-4 space-y-1.5 text-sm">
              {examples[key].map((e) => (
                <li key={e} className="flex items-center gap-2 text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {e}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link to="/request">Сұрау</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/requests">Көмектесу</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
