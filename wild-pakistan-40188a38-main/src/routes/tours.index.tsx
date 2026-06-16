import { createFileRoute, Link } from "@tanstack/react-router";
import { tours } from "@/lib/data";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Expeditions — WILD Pakistan" },
      { name: "description", content: "Curated multi-day tours across Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan and Kashmir." },
      { property: "og:title", content: "Expeditions — WILD Pakistan" },
      { property: "og:description", content: "Fixed multi-day tours with transport, hotels, meals and guides." },
    ],
  }),
  component: ToursIndex,
});

function ToursIndex() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Expeditions</span>
        <h1 className="font-display text-5xl md:text-6xl mb-3 text-balance">Curated multi-day tours.</h1>
        <p className="text-muted-foreground max-w-xl text-lg">Pre-designed routes through Northern Pakistan, with transport, hotels, meals, and guides taken care of.</p>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((t) => (
            <Link key={t.slug} to="/tours/$slug" params={{ slug: t.slug }} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted mb-5">
                <img src={t.image} alt={t.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{t.days} Days</span>
              </div>
              <h3 className="font-display text-2xl group-hover:text-accent transition-colors">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.summary}</p>
              <div className="mt-4 flex justify-between items-center border-t border-border pt-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From</span>
                <span className="font-display text-xl">PKR {t.priceFrom.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
