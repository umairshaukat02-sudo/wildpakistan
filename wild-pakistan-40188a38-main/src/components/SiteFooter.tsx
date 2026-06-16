import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-semibold mb-4">
            WILD<span className="text-accent">.</span> Pakistan
          </div>
          <p className="max-w-md text-sm text-background/70 leading-relaxed">
            An Islamabad-based adventure community organising guided hikes and multi-day expeditions across the most profound landscapes in Northern Pakistan.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://www.instagram.com/wild.pk" target="_blank" rel="noreferrer" className="text-background/60 hover:text-accent"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/company/wild-pk/" target="_blank" rel="noreferrer" className="text-background/60 hover:text-accent"><Linkedin size={20} /></a>
            <a href="#" className="text-background/60 hover:text-accent"><Facebook size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link to="/tours" className="hover:text-background">Expeditions</Link></li>
            <li><Link to="/destinations" className="hover:text-background">Destinations</Link></li>
            <li><Link to="/customize" className="hover:text-background">Customize Trip</Link></li>
            <li><Link to="/gallery" className="hover:text-background">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-background">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5">Enquire</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2"><Mail size={14} /><a href="mailto:tripsbywild@gmail.com" className="hover:text-background">tripsbywild@gmail.com</a></li>
            <li className="flex items-center gap-2"><Phone size={14} /><a href="tel:+923125611476" className="hover:text-background">0312-5611476</a></li>
            <li className="text-background/50">Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-background/40">
          <span>© {new Date().getFullYear()} WILD Pakistan Expeditions</span>
          <span>Crafted for the adventurous</span>
        </div>
      </div>
    </footer>
  );
}
