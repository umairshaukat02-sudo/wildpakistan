import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, X, ArrowRight } from "lucide-react";
import { tourBySlugQuery } from "@/lib/queries";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/tours/$slug")({
  loader: async ({ params, context }) => {
    const tour = await context.queryClient.ensureQueryData(tourBySlugQuery(params.slug));
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.tour;
    if (!t) return { meta: [{ title: "Tour — WILD Pakistan" }] };
    return {
      meta: [
        { title: `${t.title} — WILD Pakistan` },
        { name: "description", content: t.summary ?? "" },
        { property: "og:title", content: `${t.title} — WILD Pakistan` },
        { property: "og:description", content: t.summary ?? "" },
        ...(t.hero_image ? [{ property: "og:image", content: t.hero_image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-40 pb-32 text-center">
      <h1 className="font-display text-4xl">Tour not found</h1>
      <Link to="/tours" className="mt-6 inline-block text-accent underline">Back to expeditions</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-40 pb-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
  component: TourDetail,
});

function TourDetail() {
  const { slug } = Route.useParams();
  const { data: tour } = useSuspenseQuery(tourBySlugQuery(slug));
  if (!tour) return null;
  const dest = destinations.find((d) => d.slug === tour.destination);
  const itin = (tour.itinerary as Array<{ day: number; title: string; details: string }>) ?? [];
  const inclusions = (tour.inclusions as string[]) ?? [];
  const exclusions = (tour.exclusions as string[]) ?? [];
  return (
    <div>
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {tour.hero_image && <img src={tour.hero_image} alt={tour.title} className="absolute inset-0 size-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 pb-12">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-3">{dest?.region ?? tour.destination}</span>
            <h1 className="font-display text-5xl md:text-7xl text-white max-w-4xl text-balance">{tour.title}</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">{tour.duration_days} Days</span>
              <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-foreground">From PKR {tour.price_pkr.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h2 className="font-display text-3xl mb-4">Overview</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">{tour.summary}</p>
            {tour.description && <p className="text-foreground/70 mt-4 leading-relaxed">{tour.description}</p>}
          </section>

          {itin.length > 0 && (
            <section>
              <h2 className="font-display text-3xl mb-6">Itinerary</h2>
              <ol className="space-y-5">
                {itin.map((d) => (
                  <li key={d.day} className="border-l-2 border-accent pl-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Day {d.day}</span>
                    <h3 className="font-display text-xl mt-1">{d.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{d.details}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl mb-4">Included</h3>
              <ul className="space-y-2">
                {inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Excluded</h3>
              <ul className="space-y-2">
                {exclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 bg-foreground text-background p-8 rounded-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Book this tour</span>
            <h3 className="font-display text-3xl mt-2 mb-1">PKR {tour.price_pkr.toLocaleString()}</h3>
            <p className="text-background/60 text-xs uppercase tracking-widest">per person, from</p>
            <Link
              to="/customize"
              className="mt-6 w-full inline-flex justify-center items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground"
            >
              Book / Customize <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="mt-3 w-full inline-flex justify-center rounded-full border border-background/20 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-background hover:bg-background/10">
              Ask a question
            </Link>
            <div className="mt-6 pt-6 border-t border-background/10 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-background/60">Duration</span><span>{tour.duration_days} days</span></div>
              <div className="flex justify-between"><span className="text-background/60">Destination</span><span>{dest?.name ?? tour.destination}</span></div>
              <div className="flex justify-between"><span className="text-background/60">Group</span><span>Small</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
