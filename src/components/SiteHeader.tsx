import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Expeditions" },
  { to: "/destinations", label: "Destinations" },
  { to: "/customize", label: "Customize" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const scrolled = useScrolled();
  const onHero = pathname === "/" && !scrolled;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        onHero ? "bg-transparent" : "bg-background/85 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className={`font-display text-2xl font-semibold tracking-tight ${onHero ? "text-white" : "text-foreground"}`}>
          WILD<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-accent ${
                onHero ? "text-white/90" : "text-foreground/80"
              }`}
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={signedIn ? "/dashboard" : "/auth"}
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${onHero ? "text-white/90" : "text-foreground/80"} hover:text-accent`}
          >
            {signedIn ? "Account" : "Sign In"}
          </Link>
          <Link
            to="/customize"
            className="rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground hover:brightness-110 transition"
          >
            Plan Trip
          </Link>
        </div>
        <button onClick={() => setOpen((o) => !o)} className={`md:hidden ${onHero ? "text-white" : "text-foreground"}`} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-sm font-semibold uppercase tracking-widest">
                {l.label}
              </Link>
            ))}
            <Link to={signedIn ? "/dashboard" : "/auth"} className="py-2 text-sm font-semibold uppercase tracking-widest">
              {signedIn ? "Account" : "Sign In"}
            </Link>
            <Link to="/customize" className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-accent-foreground">
              Plan a Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function useScrolled() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return s;
}
