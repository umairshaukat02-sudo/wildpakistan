import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/lib/data";
import community from "@/assets/community.jpg";
import hero from "@/assets/hero-karakoram.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — WILD Pakistan" },
      { name: "description", content: "Field photography from WILD Pakistan expeditions across the Karakoram and beyond." },
      { property: "og:title", content: "Gallery — WILD Pakistan" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const items = [hero, ...destinations.map((d) => d.image), community, ...destinations.map((d) => d.image)];
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Field Reports</span>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Frames from the trail.</h1>
      </div>
      <div className="mx-auto max-w-7xl px-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {items.map((src, i) => (
          <div key={i} className="break-inside-avoid overflow-hidden rounded-md group">
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}
