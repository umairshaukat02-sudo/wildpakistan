import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/tours", "/destinations", "/customize", "/gallery", "/contact"];
        const tours = ["hunza-explorer", "skardu-adventure", "fairy-meadows-trek", "swat-weekend", "naran-kaghan-classic", "kashmir-neelum"];
        const urls = [
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`),
          ...tours.map((s) => `  <url><loc>${BASE_URL}/tours/${s}</loc><changefreq>monthly</changefreq></url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
