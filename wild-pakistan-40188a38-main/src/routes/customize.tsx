import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/api/inquiries.functions";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customize Your Trip — WILD Pakistan" },
      { name: "description", content: "Build your own Northern Pakistan trip with dynamic pricing — destination, dates, transport, accommodation, meals and activities." },
      { property: "og:title", content: "Customize Your Trip — WILD Pakistan" },
      { property: "og:description", content: "Multi-step trip builder with real-time pricing." },
    ],
  }),
  component: Customize,
});

type Form = {
  destination: string;
  duration_days: number;
  departure_date: string;
  return_date: string;
  pickup_location: string;
  transport: string;
  room_type: string;
  hotel_category: string;
  meals: string;
  activities: string[];
  adults: number;
  children: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  additional_requirements: string;
};

const initial: Form = {
  destination: "",
  duration_days: 3,
  departure_date: "",
  return_date: "",
  pickup_location: "Islamabad",
  transport: "Economy Transport",
  room_type: "Shared Room",
  hotel_category: "3 Star",
  meals: "Breakfast + Dinner",
  activities: [],
  adults: 2,
  children: 0,
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  additional_requirements: "",
};

const pickups = ["Islamabad", "Lahore", "Rawalpindi", "Faisalabad", "Karachi"];
const transports = [
  { name: "Economy Transport", price: 0 },
  { name: "Hiace", price: 1500 },
  { name: "Coaster", price: 2000 },
  { name: "Luxury Transport", price: 3500 },
  { name: "SUV", price: 5000 },
  { name: "Private Car", price: 6000 },
];
const rooms = ["Shared Room", "Couple Room", "Family Room", "Single Room"];
const hotelTiers = [
  { name: "Standard", price: 1500 },
  { name: "2 Star", price: 2500 },
  { name: "3 Star", price: 4000 },
  { name: "4 Star", price: 7000 },
  { name: "Luxury", price: 12000 },
];
const mealsOpts = [
  { name: "No Meals", price: 0 },
  { name: "Breakfast Only", price: 800 },
  { name: "Breakfast + Dinner", price: 1800 },
  { name: "Full Board", price: 2800 },
];
const activitiesList = [
  { name: "Hiking", price: 1500 },
  { name: "Camping", price: 2000 },
  { name: "Bonfire", price: 800 },
  { name: "Photography Tour", price: 2500 },
  { name: "Jeep Safari", price: 4500 },
  { name: "Trekking", price: 3000 },
  { name: "Boating", price: 1500 },
  { name: "Sightseeing", price: 1000 },
];

const STEPS = [
  "Destination", "Duration", "Dates", "Pickup", "Transport",
  "Accommodation", "Meals", "Activities", "Travellers", "Details",
];

function pricing(f: Form) {
  const people = Math.max(1, f.adults) + 0.5 * f.children;
  const days = Math.max(1, f.duration_days);
  const base = 8000 * days * people;
  const accommodation = (hotelTiers.find((h) => h.name === f.hotel_category)?.price ?? 0) * days * Math.max(1, f.adults + f.children);
  const transport = (transports.find((t) => t.name === f.transport)?.price ?? 0) * days * people;
  const activities = f.activities.reduce((s, a) => s + (activitiesList.find((x) => x.name === a)?.price ?? 0), 0) * Math.max(1, f.adults + f.children);
  const meals = (mealsOpts.find((m) => m.name === f.meals)?.price ?? 0) * days * Math.max(1, f.adults + f.children);
  const subtotal = base + accommodation + transport + activities + meals;
  const service = subtotal * 0.05;
  const taxes = subtotal * 0.08;
  const grand = subtotal + service + taxes;
  return {
    base_cost: Math.round(base),
    accommodation_cost: Math.round(accommodation),
    transport_cost: Math.round(transport),
    activities_cost: Math.round(activities + meals),
    service_charges: Math.round(service),
    taxes: Math.round(taxes),
    grand_total: Math.round(grand),
  };
}

function fmt(n: number) {
  return "PKR " + n.toLocaleString();
}

function Customize() {
  const navigate = useNavigate();
  const submit = useServerFn(submitInquiry);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [submitting, setSubmitting] = useState(false);
  const price = useMemo(() => pricing(form), [form]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const toggleActivity = (a: string) =>
    set("activities", form.activities.includes(a) ? form.activities.filter((x) => x !== a) : [...form.activities, a]);

  const canNext = () => {
    if (step === 0) return !!form.destination;
    if (step === 9) return form.customer_name.length > 1 && /.+@.+/.test(form.customer_email);
    return true;
  };

  const onSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await submit({
        data: {
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          customer_phone: form.customer_phone || null,
          destination: form.destination,
          duration_days: form.duration_days,
          departure_date: form.departure_date || null,
          return_date: form.return_date || null,
          pickup_location: form.pickup_location,
          transport: form.transport,
          room_type: form.room_type,
          hotel_category: form.hotel_category,
          meals: form.meals,
          activities: form.activities,
          adults: form.adults,
          children: form.children,
          additional_requirements: form.additional_requirements || null,
          ...price,
        },
      });
      toast.success(`Inquiry ${result.inquiry_code} submitted!`);
      navigate({ to: "/inquiry-success", search: { code: result.inquiry_code } as never });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-32 bg-muted/30 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="mb-8">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-3">Trip Architect</span>
            <h1 className="font-display text-4xl md:text-5xl text-balance">Design your expedition.</h1>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              <span>Step {step + 1} of {STEPS.length}</span>
              <span>{STEPS[step]}</span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>

          <div className="bg-background rounded-md border border-border p-6 md:p-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <Group label="Choose your destination">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[...destinations.map((d) => d.name), "Custom Destination"].map((d) => (
                        <OptionCard key={d} active={form.destination === d} onClick={() => set("destination", d)}>{d}</OptionCard>
                      ))}
                    </div>
                  </Group>
                )}
                {step === 1 && (
                  <Group label="Trip duration">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[1, 2, 3, 5, 7, 10].map((d) => (
                        <OptionCard key={d} active={form.duration_days === d} onClick={() => set("duration_days", d)}>{d} {d === 1 ? "Day" : "Days"}</OptionCard>
                      ))}
                    </div>
                    <input type="number" min={1} max={60} value={form.duration_days} onChange={(e) => set("duration_days", parseInt(e.target.value) || 1)} className="mt-4 w-32 rounded-md border border-border bg-background px-3 py-2 text-sm" />
                  </Group>
                )}
                {step === 2 && (
                  <Group label="Travel dates">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Departure"><input type="date" value={form.departure_date} onChange={(e) => set("departure_date", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" /></Field>
                      <Field label="Return"><input type="date" value={form.return_date} onChange={(e) => set("return_date", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" /></Field>
                    </div>
                  </Group>
                )}
                {step === 3 && (
                  <Group label="Pickup location">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {pickups.map((p) => (
                        <OptionCard key={p} active={form.pickup_location === p} onClick={() => set("pickup_location", p)}>{p}</OptionCard>
                      ))}
                    </div>
                  </Group>
                )}
                {step === 4 && (
                  <Group label="Transportation">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {transports.map((t) => (
                        <OptionCard key={t.name} active={form.transport === t.name} onClick={() => set("transport", t.name)}>
                          <div>{t.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">+PKR {t.price.toLocaleString()}/day</div>
                        </OptionCard>
                      ))}
                    </div>
                  </Group>
                )}
                {step === 5 && (
                  <div className="space-y-8">
                    <Group label="Room type">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {rooms.map((r) => (
                          <OptionCard key={r} active={form.room_type === r} onClick={() => set("room_type", r)}>{r}</OptionCard>
                        ))}
                      </div>
                    </Group>
                    <Group label="Hotel category">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {hotelTiers.map((h) => (
                          <OptionCard key={h.name} active={form.hotel_category === h.name} onClick={() => set("hotel_category", h.name)}>
                            <div>{h.name}</div>
                            <div className="text-[10px] text-muted-foreground mt-1">PKR {h.price.toLocaleString()}/night</div>
                          </OptionCard>
                        ))}
                      </div>
                    </Group>
                  </div>
                )}
                {step === 6 && (
                  <Group label="Meals">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {mealsOpts.map((m) => (
                        <OptionCard key={m.name} active={form.meals === m.name} onClick={() => set("meals", m.name)}>
                          <div>{m.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">+PKR {m.price.toLocaleString()}/day</div>
                        </OptionCard>
                      ))}
                    </div>
                  </Group>
                )}
                {step === 7 && (
                  <Group label="Activities (select multiple)">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {activitiesList.map((a) => (
                        <OptionCard key={a.name} active={form.activities.includes(a.name)} onClick={() => toggleActivity(a.name)}>
                          <div>{a.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">+PKR {a.price.toLocaleString()}</div>
                        </OptionCard>
                      ))}
                    </div>
                  </Group>
                )}
                {step === 8 && (
                  <Group label="Travellers">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Adults"><input type="number" min={1} max={50} value={form.adults} onChange={(e) => set("adults", parseInt(e.target.value) || 1)} className="w-full rounded-md border border-border bg-background px-3 py-2.5" /></Field>
                      <Field label="Children"><input type="number" min={0} max={50} value={form.children} onChange={(e) => set("children", parseInt(e.target.value) || 0)} className="w-full rounded-md border border-border bg-background px-3 py-2.5" /></Field>
                    </div>
                  </Group>
                )}
                {step === 9 && (
                  <Group label="Your details">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full name *"><input value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5" /></Field>
                      <Field label="Email *"><input type="email" value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5" /></Field>
                      <Field label="Phone"><input value={form.customer_phone} onChange={(e) => set("customer_phone", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5" /></Field>
                    </div>
                    <Field label="Additional requirements">
                      <textarea rows={4} value={form.additional_requirements} onChange={(e) => set("additional_requirements", e.target.value)} placeholder="Female-only group, private guide, honeymoon package, special food, etc." className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" />
                    </Field>
                  </Group>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-30"
            >
              <ArrowLeft size={14} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={!canNext() || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                Submit Inquiry
              </button>
            )}
          </div>
        </div>

        {/* Pricing */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 bg-foreground text-background rounded-md p-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Package Summary</span>
            <h3 className="font-display text-2xl mt-2 mb-5 pb-5 border-b border-background/10">{form.destination || "Pick a destination"}</h3>
            <dl className="space-y-3 text-sm">
              <Row label="Base"><span>{fmt(price.base_cost)}</span></Row>
              <Row label="Accommodation"><span>{fmt(price.accommodation_cost)}</span></Row>
              <Row label="Transport"><span>{fmt(price.transport_cost)}</span></Row>
              <Row label="Activities + Meals"><span>{fmt(price.activities_cost)}</span></Row>
              <Row label="Service (5%)"><span>{fmt(price.service_charges)}</span></Row>
              <Row label="Taxes (8%)"><span>{fmt(price.taxes)}</span></Row>
            </dl>
            <div className="mt-6 pt-6 border-t border-background/10 flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Estimated Total</span>
              <span className="font-display text-3xl text-accent">{fmt(price.grand_total)}</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-background/40 mt-4">Subject to review by our team</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl mb-5">{label}</h2>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mt-4 first:mt-0">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}
function OptionCard({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-md border px-4 py-3 text-sm font-medium transition ${
        active ? "border-accent bg-accent/10 text-foreground" : "border-border hover:border-accent/60"
      }`}
    >
      {children}
    </button>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-background/60">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

// Re-export Link to avoid unused import warning if needed in JSX
export { Link };
