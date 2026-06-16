import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const SearchSchema = z.object({ code: z.string().optional() });

export const Route = createFileRoute("/inquiry-success")({
  validateSearch: (s) => SearchSchema.parse(s),
  head: () => ({ meta: [{ title: "Inquiry Received — WILD Pakistan" }] }),
  component: () => {
    const { code } = Route.useSearch();
    return (
      <div className="pt-40 pb-32 px-6">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle2 className="mx-auto text-accent mb-6" size={56} />
          <h1 className="font-display text-4xl md:text-5xl mb-4">Your trip is in motion.</h1>
          <p className="text-muted-foreground mb-2">We've received your inquiry and our team will reach out within 24 hours.</p>
          {code && <p className="font-mono text-sm mt-4 text-accent">Reference: {code}</p>}
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/" className="rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest">Home</Link>
            <Link to="/tours" className="rounded-full bg-accent text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest">Browse expeditions</Link>
          </div>
        </div>
      </div>
    );
  },
});
