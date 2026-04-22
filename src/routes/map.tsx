import { createFileRoute } from "@tanstack/react-router";
import { AlmatyMap } from "@/components/AlmatyMap";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Карта " },
      { name: "description", content: "Алматы қаласындағы көмек өтінімдерінің интерактивті картасы." },
      { property: "og:title", content: "Өтінімдер картасы " },
      { property: "og:description", content: "Алматы аудандары бойынша белсенді өтінімдерді картадан көріңіз." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold md:text-5xl">Алматы өтінімдер картасы</h1>
        <p className="mt-3 text-muted-foreground">
          Қала аудандары бойынша өтінімдерді тікелей картадан көріңіз. Әр белгі — нақты адамның
          өтініші. Өзіңізге жақын жердегі көмекті табу үшін белгіге басыңыз.
        </p>
      </div>

      <AlmatyMap />
    </div>
  );
}
