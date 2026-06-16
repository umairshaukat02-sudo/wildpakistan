import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteImagesQuery } from "@/lib/queries";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — WILD Pakistan" },
      { name: "description", content: "Field photography from WILD Pakistan expeditions across the Karakoram and beyond." },
      { property: "og:title", content: "Gallery — WILD Pakistan" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(siteImagesQuery),
  errorComponent: ({ error }) => <div className="pt-40 text-center"><p>{error.message}</p></div>,
  notFoundComponent: () => <div className="pt-40 text-center"><p>Not found</p></div>,
  component: GalleryPage,
});

function GalleryPage() {
  const { data: images } = useSuspenseQuery(siteImagesQuery);
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Field Reports</span>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Frames from the trail.</h1>
      </div>
      <div className="mx-auto max-w-7xl px-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {images.map((img) => (
          <div key={img.key} className="break-inside-avoid overflow-hidden rounded-md group">
            <img src={img.url} alt={img.alt ?? img.key} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}
