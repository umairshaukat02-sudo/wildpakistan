// Shared pricing logic — used by the client UI and recomputed server-side
// so the persisted totals cannot be manipulated by a malicious client.

export const TRANSPORTS = [
  { name: "Economy Transport", price: 0 },
  { name: "Hiace", price: 1500 },
  { name: "Coaster", price: 2000 },
  { name: "Luxury Transport", price: 3500 },
  { name: "SUV", price: 5000 },
  { name: "Private Car", price: 6000 },
] as const;

export const HOTEL_TIERS = [
  { name: "Standard", price: 1500 },
  { name: "2 Star", price: 2500 },
  { name: "3 Star", price: 4000 },
  { name: "4 Star", price: 7000 },
  { name: "Luxury", price: 12000 },
] as const;

export const MEALS = [
  { name: "No Meals", price: 0 },
  { name: "Breakfast Only", price: 800 },
  { name: "Breakfast + Dinner", price: 1800 },
  { name: "Full Board", price: 2800 },
] as const;

export const ACTIVITIES = [
  { name: "Hiking", price: 1500 },
  { name: "Camping", price: 2000 },
  { name: "Bonfire", price: 800 },
  { name: "Photography Tour", price: 2500 },
  { name: "Jeep Safari", price: 4500 },
  { name: "Trekking", price: 3000 },
  { name: "Boating", price: 1500 },
  { name: "Sightseeing", price: 1000 },
] as const;

export type PricingInput = {
  duration_days: number;
  adults: number;
  children: number;
  transport?: string | null;
  hotel_category?: string | null;
  meals?: string | null;
  activities?: string[] | null;
};

export function computePricing(f: PricingInput) {
  const adults = Math.max(1, f.adults || 1);
  const children = Math.max(0, f.children || 0);
  const people = adults + 0.5 * children;
  const headcount = Math.max(1, adults + children);
  const days = Math.max(1, f.duration_days || 1);
  const base = 8000 * days * people;
  const accommodation = (HOTEL_TIERS.find((h) => h.name === f.hotel_category)?.price ?? 0) * days * headcount;
  const transport = (TRANSPORTS.find((t) => t.name === f.transport)?.price ?? 0) * days * people;
  const acts = (f.activities ?? []).reduce((s, a) => s + (ACTIVITIES.find((x) => x.name === a)?.price ?? 0), 0) * headcount;
  const meals = (MEALS.find((m) => m.name === f.meals)?.price ?? 0) * days * headcount;
  const subtotal = base + accommodation + transport + acts + meals;
  const service = subtotal * 0.05;
  const taxes = subtotal * 0.08;
  const grand = subtotal + service + taxes;
  return {
    base_cost: Math.round(base),
    accommodation_cost: Math.round(accommodation),
    transport_cost: Math.round(transport),
    activities_cost: Math.round(acts + meals),
    service_charges: Math.round(service),
    taxes: Math.round(taxes),
    grand_total: Math.round(grand),
  };
}
