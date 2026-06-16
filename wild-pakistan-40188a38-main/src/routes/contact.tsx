import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Linkedin, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WILD Pakistan" },
      { name: "description", content: "Get in touch with WILD Pakistan in Islamabad. Phone 0312-5611476, email tripsbywild@gmail.com." },
      { property: "og:title", content: "Contact WILD Pakistan" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message received — we'll be in touch.");
    (e.target as HTMLFormElement).reset();
    setSending(false);
  };
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4">Contact</span>
          <h1 className="font-display text-5xl md:text-6xl mb-6 text-balance">Let's plan something wild.</h1>
          <p className="text-muted-foreground text-lg">Reach out by phone, email, or use the form. We respond within a day.</p>
          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-3"><Phone className="text-accent shrink-0" size={18} /><div><div className="font-semibold">Phone</div><a href="tel:+923125611476" className="text-muted-foreground hover:text-accent">0312-5611476</a></div></li>
            <li className="flex items-start gap-3"><Mail className="text-accent shrink-0" size={18} /><div><div className="font-semibold">Email</div><a href="mailto:tripsbywild@gmail.com" className="text-muted-foreground hover:text-accent">tripsbywild@gmail.com</a></div></li>
            <li className="flex items-start gap-3"><MapPin className="text-accent shrink-0" size={18} /><div><div className="font-semibold">Based in</div><span className="text-muted-foreground">Islamabad, Pakistan</span></div></li>
            <li className="flex items-start gap-3"><Instagram className="text-accent shrink-0" size={18} /><a href="https://www.instagram.com/wild.pk" target="_blank" rel="noreferrer" className="hover:text-accent">@wild.pk</a></li>
            <li className="flex items-start gap-3"><Linkedin className="text-accent shrink-0" size={18} /><a href="https://www.linkedin.com/company/wild-pk/" target="_blank" rel="noreferrer" className="hover:text-accent">wild-pk</a></li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} className="bg-background rounded-md border border-border p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="name" label="Name" required />
              <Input name="email" type="email" label="Email" required />
            </div>
            <Input name="subject" label="Subject" />
            <label className="block">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Message *</span>
              <textarea name="message" rows={5} required className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" />
            </label>
            <button disabled={sending} className="inline-flex rounded-full bg-foreground text-background px-7 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50">
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-md border border-border">
            <iframe
              title="WILD Pakistan map"
              src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
              className="size-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}{props.required ? " *" : ""}</span>
      <input {...props} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" />
    </label>
  );
}
