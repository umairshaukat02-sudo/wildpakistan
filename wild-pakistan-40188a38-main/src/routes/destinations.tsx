import { createFileRoute, Link } from "@tanstack/react-router";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — WILD Pakistan" },
      { name: "description", content: "Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan, Kashmir — the territories WILD knows." },
      { property: "og:title", content: "Destinations — WILD Pakistan" },
      { property: "og:description", content: "The territories WILD knows." },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 mb-16">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Destinations</span>
        <h1 className="font-display text-5xl md:text-6xl mb-4 text-balance">Territories of the Great North.</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">From the granite cathedrals of Skardu to the verdant alpine meadows of Kashmir.</p>
      </div>

      <div className="mx-auto max-w-7xl px-6 space-y-24">
        {destinations.map((d, i) => (
          <article id={d.slug} key={d.slug} className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="lg:col-span-7 aspect-[4/3] overflow-hidden rounded-md bg-muted">
              <img src={d.image} alt={d.name} loading="lazy" className="size-full object-cover" />
            </div>
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{d.region} · {d.elevation}</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">{d.name}</h2>
              <p className="text-muted-foreground mt-2 italic">{d.tagline}</p>
              <p className="mt-5 text-foreground/80 leading-relaxed">{d.description}</p>
              <Link to="/customize" className="mt-7 inline-flex rounded-full bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent transition">
                Plan a trip here
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
