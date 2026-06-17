import { createFileRoute } from "@tanstack/react-router";

const galleryImages = [
  { src: "/images/image1.jpeg", alt: "WILD Pakistan expedition 1" },
  { src: "/images/image2.jpeg", alt: "WILD Pakistan expedition 2" },
  { src: "/images/image3.jpeg", alt: "WILD Pakistan expedition 3" },
  { src: "/images/image4.jpeg", alt: "WILD Pakistan expedition 4" },
  { src: "/images/image5.jpeg", alt: "WILD Pakistan expedition 5" },
  { src: "/images/image6.jpeg", alt: "WILD Pakistan expedition 6" },
  { src: "/images/image7.jpeg", alt: "WILD Pakistan expedition 7" },
  { src: "/images/image8.jpeg", alt: "WILD Pakistan expedition 8" },
  { src: "/images/image9.jpeg", alt: "WILD Pakistan expedition 9" },
  { src: "/images/image10.jpeg", alt: "WILD Pakistan expedition 10" },
  { src: "/images/image11.jpeg", alt: "WILD Pakistan expedition 11" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — WILD Pakistan" },
      { name: "description", content: "Field photography from WILD Pakistan expeditions across the Karakoram and beyond." },
      { property: "og:title", content: "Gallery — WILD Pakistan" },
    ],
  }),
  errorComponent: ({ error }) => <div className="pt-40 text-center"><p>{error.message}</p></div>,
  notFoundComponent: () => <div className="pt-40 text-center"><p>Not found</p></div>,
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Field Reports</span>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Frames from the trail.</h1>
      </div>
      <div className="mx-auto max-w-7xl px-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {galleryImages.map((img) => (
          <div key={img.src} className="break-inside-avoid overflow-hidden rounded-md group">
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}

