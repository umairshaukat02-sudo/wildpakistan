import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Quote } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { destinations, testimonials, stats, imageUrl, IMAGE_FALLBACKS } from "@/lib/data";
import { siteImagesQuery, publishedToursQuery } from "@/lib/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WILD Pakistan — Adventure Tours & Trekking" },
      { name: "description", content: "Guided expeditions across Hunza, Skardu, Fairy Meadows and beyond. Customizable trips with dynamic pricing." },
      { property: "og:title", content: "WILD Pakistan — Adventure Tours" },
      { property: "og:description", content: "Cinematic expeditions across Northern Pakistan." },
      { property: "og:image", content: IMAGE_FALLBACKS.hero },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(siteImagesQuery),
      context.queryClient.ensureQueryData(publishedToursQuery),
    ]),
  errorComponent: ({ error }) => <div className="pt-40 text-center"><h1 className="font-display text-3xl">Something went wrong</h1><p className="text-muted-foreground mt-2">{error.message}</p></div>,
  notFoundComponent: () => <div className="pt-40 text-center"><h1 className="font-display text-3xl">Not found</h1></div>,
  component: Home,
});

function Home() {
  const { data: images } = useSuspenseQuery(siteImagesQuery);
  const { data: tours } = useSuspenseQuery(publishedToursQuery);
  const hero = imageUrl("hero", images);
  const community = imageUrl("community", images);
  const featured = tours.filter((t) => t.featured).slice(0, 3);
  const showTours = featured.length > 0 ? featured : tours.slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-foreground">
        <img src={hero} alt="Karakoram mountains at golden hour" className="absolute inset-0 size-full object-cover opacity-80" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="relative h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] mb-6 block">Islamabad · Hunza · Skardu</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] text-white leading-[0.9] tracking-tight max-w-5xl text-balance">
              The earned silence of the Karakoram.
            </h1>
            <p className="mt-6 max-w-xl text-white/80 text-base md:text-lg">
              Guided expeditions, custom itineraries, and a community of travellers who take Pakistan's North seriously.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/tours" className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground hover:brightness-110 transition">
                Explore Expeditions <ArrowRight size={14} />
              </Link>
              <Link to="/customize" className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 hover:bg-white/20 transition">
                Customize Trip
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10 border-y border-background/10">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-10 flex flex-col items-center text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/50 mb-3">{s.label}</span>
              <span className="font-display text-4xl md:text-5xl">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block">About WILD</span>
          <h2 className="font-display text-4xl md:text-5xl text-balance">A community that takes the mountain seriously.</h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-foreground/80">
            WILD is an Islamabad-based adventure and tourism community organising guided hikes and multi-day expeditions across some of Pakistan's most scenic destinations. We focus on safe, affordable, and well-organised travel — building a community of adventure lovers, students, and young professionals who want to see the North done right.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {["Experienced trip management", "Affordable, well-planned trips", "Safe and guided experiences", "A real travel community"].map((c) => (
              <div key={c} className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-accent/15 grid place-items-center text-accent shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-background py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block">01 · Territories</span>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl text-balance">Territories of the North</h2>
          </div>
          <Link to="/destinations" className="text-xs font-bold uppercase tracking-[0.18em] border-b border-accent text-accent pb-1">View all destinations</Link>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar snap-x">
          {destinations.map((d) => (
            <Link key={d.slug} to="/destinations" hash={d.slug} className="group flex-shrink-0 w-[300px] snap-start">
              <div className="aspect-[4/5] overflow-hidden rounded-md mb-4 bg-muted">
                <img src={imageUrl(d.imageKey, images)} alt={d.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-display text-2xl">{d.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{d.tagline}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest border border-border bg-muted px-2 py-1">{d.elevation}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOURS */}
      <section className="bg-muted/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block">02 · The Collections</span>
              <h2 className="font-display text-4xl md:text-5xl">Curated Expeditions</h2>
              <p className="text-muted-foreground mt-3 max-w-md">Proven routes for the curious traveller.</p>
            </div>
            <Link to="/tours" className="text-xs font-bold uppercase tracking-[0.18em] border-b border-accent text-accent pb-1">View all expeditions</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {showTours.map((t) => (
              <Link key={t.slug} to="/tours/$slug" params={{ slug: t.slug }} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-5 bg-muted">
                  {t.hero_image && <img src={t.hero_image} alt={t.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{t.duration_days} Days</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl group-hover:text-accent transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{t.summary}</p>
                <div className="mt-4 flex justify-between items-center border-t border-border pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Starting from</span>
                  <span className="font-display text-xl">PKR {t.price_pkr.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZER TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block">03 · Trip Architect</span>
          <h2 className="font-display text-4xl md:text-5xl text-balance">Design your own path.</h2>
          <p className="mt-5 text-foreground/70 text-lg leading-relaxed max-w-xl">
            Pick a destination, choose your pace, transport, and accommodation. Our pricing rail updates in real-time as you build the trip.
          </p>
          <Link to="/customize" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-accent transition">
            Start Customising <ArrowRight size={14} />
          </Link>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="aspect-[5/4] overflow-hidden rounded-md">
            <img src={community} alt="WILD community on the ridge" loading="lazy" className="size-full object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-foreground text-background py-28">
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block">04 · Field Reports</span>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-balance max-w-3xl">From travellers who walked the ridges with us.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="border-l border-background/20 pl-6">
                <Quote className="text-accent mb-4" size={28} />
                <p className="text-background/90 text-base leading-relaxed">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-accent/30 grid place-items-center font-display text-sm">{t.initial}</div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-background/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
