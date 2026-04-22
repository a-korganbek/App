import { createFileRoute } from "@tanstack/react-router";
import { Eye, Globe, HeartHandshake, ShieldCheck, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Жоба туралы " },
      { name: "description", content: "Цифрлық қайырымдылық жүйесі. Біздің мақсатымыз және платформаның жұмыс істеу қағидалары." },
      { property: "og:title", content: "Жоба туралы " },
      { property: "og:description", content: "Цифрлық қайырымдылық жүйесінің мақсаты мен қағидалары." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          Біздің мақсатымыз
        </span>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Қайырымдылықты <span className="text-primary">ашық</span> және{" "}
          <span className="text-secondary">қолжетімді</span> ету
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Қайырымдылықты цифрландыру — Қазақстандағы әлеуметтік стартап. Біз цифрлық технологиялар арқылы
          көмекке мұқтаж адамдар мен жақсылық жасағысы келетін еріктілерді жылдам, сенімді
          және ашық түрде байланыстырамыз.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Target, title: "Мақсат", text: "Әрбір көмек өтінімінің нақты адресатқа жетуін және жоғалмауын қамтамасыз ету." },
          { icon: Eye, title: "Ашықтық", text: "Барлық өтінімдер мен олардың мәртебесі жария — кім, қашан, қалай көмектескені көрінеді." },
          { icon: Globe, title: "Қолжетімділік", text: "Кез келген қала тұрғыны бір смартфон арқылы өтінім бере алады немесе көмек көрсете алады." },
        ].map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <v.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
            <p className="mt-2 text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>

      {/* HOW DIGITAL CHARITY WORKS */}
      <div className="mt-20 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Цифрлық қайырымдылық жүйесі қалай жұмыс істейді?</h2>
            <p className="mt-4 text-muted-foreground">
              Дәстүрлі қайырымдылықтан айырмашылығы — біздің платформада әрбір өтінімнің өз
              идентификаторы, мәртебесі және тарихы бар. Бұл жүйені толық ашық етеді.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                { icon: ShieldCheck, title: "Тексерілген өтінімдер", text: "Әр өтінім модератордан өтеді." },
                { icon: HeartHandshake, title: "Тікелей байланыс", text: "Еріктілер өтінім авторымен қауіпсіз чатта сөйлеседі." },
                { icon: Sparkles, title: "Нақты есеп", text: "Көмек берілген соң, мәртебесі жаңартылып, фотоесеп қосылады." },
              ].map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-soft text-secondary">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[var(--gradient-soft)] p-6">
            <p className="mb-4 text-sm font-semibold text-muted-foreground">Өтінім өмірлік циклі</p>
            <div className="space-y-3">
              {[
                { step: "1", color: "warning", label: "Өтінім жасалды", sub: "Күтуде" },
                { step: "2", color: "info", label: "Ерікті қабылдады", sub: "Жұмыста" },
                { step: "3", color: "info", label: "Көмек жеткізілуде", sub: "Жұмыста" },
                { step: "4", color: "success", label: "Көмек көрсетілді", sub: "Аяқталды" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-${s.color}/15 text-sm font-bold text-${s.color === "warning" ? "[oklch(0.45_0.15_75)]" : s.color}`}>
                    {s.step}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
