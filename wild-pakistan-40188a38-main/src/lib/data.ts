import hunza from "@/assets/dest-hunza.jpg";
import skardu from "@/assets/dest-skardu.jpg";
import fairy from "@/assets/dest-fairy-meadows.jpg";
import swat from "@/assets/dest-swat.jpg";
import naran from "@/assets/dest-naran.jpg";
import kashmir from "@/assets/dest-kashmir.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  elevation: string;
  image: string;
};

export const destinations: Destination[] = [
  { slug: "hunza", name: "Hunza Valley", region: "Gilgit-Baltistan", tagline: "Terraced Orchards & Glaciers", elevation: "2,438m", image: hunza, description: "The Valley of Eternal Youth — Rakaposhi, Baltit Fort, cherry blossoms, and Karakoram silence." },
  { slug: "skardu", name: "Skardu", region: "Baltistan", tagline: "The Cold Desert Gateway", elevation: "2,228m", image: skardu, description: "Sand dunes meeting glaciated giants. Gateway to K2, Shigar, Deosai, and Shangrila." },
  { slug: "fairy-meadows", name: "Fairy Meadows", region: "Diamer", tagline: "Nanga Parbat Basecamp", elevation: "3,300m", image: fairy, description: "Alpine meadows beneath the ninth-tallest peak on earth. Camp, trek, and witness the Killer Mountain." },
  { slug: "swat", name: "Swat Valley", region: "Khyber Pakhtunkhwa", tagline: "Alpine Switzerland of the East", elevation: "2,500m", image: swat, description: "Emerald rivers, pine forests, Mahodand, Malam Jabba — the green heart of the north." },
  { slug: "naran-kaghan", name: "Naran Kaghan", region: "Mansehra", tagline: "Saiful Mulook & Lulusar Lakes", elevation: "2,500m", image: naran, description: "Turquoise alpine lakes, Babusar Pass, and jeep trails through one of Pakistan's most beloved valleys." },
  { slug: "kashmir", name: "Azad Kashmir", region: "Neelum & Leepa", tagline: "Verdant Meadows & Rivers", elevation: "2,000m", image: kashmir, description: "Wooden chalets, Neelum River, Arang Kel — a slow, lush counterpoint to the high Karakoram." },
];

export type Tour = {
  slug: string;
  title: string;
  destination: string;
  days: number;
  priceFrom: number;
  image: string;
  summary: string;
  highlights: string[];
  itinerary: { day: number; title: string; details: string }[];
  included: string[];
  excluded: string[];
};

export const tours: Tour[] = [
  {
    slug: "hunza-explorer",
    title: "Hunza Explorer",
    destination: "hunza",
    days: 3,
    priceFrom: 32000,
    image: hunza,
    summary: "A high-comfort introduction to the Valley of Eternal Youth and its ancient forts.",
    highlights: ["Karimabad sunset at Baltit Fort", "Attabad Lake boating", "Eagle's Nest viewpoint at sunrise", "Local Hunza cuisine evening"],
    itinerary: [
      { day: 1, title: "Islamabad → Hunza", details: "Early departure via Karakoram Highway. Overnight in Karimabad." },
      { day: 2, title: "Attabad & Passu", details: "Boat ride on Attabad Lake, Passu Cones, Hussaini suspension bridge." },
      { day: 3, title: "Eagle's Nest → Return", details: "Sunrise at Duikar, Baltit Fort tour, return to Islamabad." },
    ],
    included: ["Transport (Coaster/Hiace)", "2 nights hotel", "Breakfast & dinner", "Guide", "Permits"],
    excluded: ["Lunches", "Personal expenses", "Tips"],
  },
  {
    slug: "skardu-adventure",
    title: "Skardu Adventure",
    destination: "skardu",
    days: 5,
    priceFrom: 54000,
    image: skardu,
    summary: "Crossing the threshold into the heart of the Karakoram and its turquoise lakes.",
    highlights: ["Shangrila Resort & Lower Kachura", "Shigar Fort heritage stay", "Deosai Plateau jeep safari", "Sheosar Lake & wildflowers"],
    itinerary: [
      { day: 1, title: "Islamabad → Chilas", details: "Long scenic drive along the Indus." },
      { day: 2, title: "Chilas → Skardu", details: "Arrival in Skardu, evening at leisure." },
      { day: 3, title: "Shangrila & Upper Kachura", details: "Lakes, lunch, photography." },
      { day: 4, title: "Deosai Plateau", details: "Jeep safari to the Land of Giants and Sheosar Lake." },
      { day: 5, title: "Return", details: "Drive back via Karakoram Highway." },
    ],
    included: ["4x4 jeep on Deosai day", "Coaster main transport", "4 nights hotel", "Breakfast & dinner", "Guide"],
    excluded: ["Lunches", "Camera fees at sites"],
  },
  {
    slug: "fairy-meadows-trek",
    title: "Fairy Meadows Trek",
    destination: "fairy-meadows",
    days: 4,
    priceFrom: 38500,
    image: fairy,
    summary: "A classic expedition to the meadows beneath the Killer Mountain, Nanga Parbat.",
    highlights: ["Jeep ride to Tatu", "Trek to Fairy Meadows", "Bonfire under Nanga Parbat", "Optional Beyal Camp hike"],
    itinerary: [
      { day: 1, title: "Islamabad → Raikot", details: "Drive to Raikot Bridge, jeep transfer to Tatu village." },
      { day: 2, title: "Trek to Fairy Meadows", details: "3-hour uphill trek. Wooden hut stay, bonfire evening." },
      { day: 3, title: "Beyal Camp", details: "Day hike toward Nanga Parbat base camp." },
      { day: 4, title: "Return", details: "Trek down, jeep to Raikot, drive home." },
    ],
    included: ["Jeep transfers", "Wooden hut / camping", "Meals", "Guide", "Porter for shared bags"],
    excluded: ["Personal porter", "Beverages"],
  },
  {
    slug: "swat-weekend",
    title: "Swat Weekend",
    destination: "swat",
    days: 2,
    priceFrom: 14500,
    image: swat,
    summary: "A weekend escape into Pakistan's Switzerland — Mahodand and Kalam.",
    highlights: ["Kalam riverside dinner", "Mahodand Lake jeep ride", "Mingora bazaar stop"],
    itinerary: [
      { day: 1, title: "Islamabad → Kalam", details: "Scenic drive through Mingora, Bahrain to Kalam." },
      { day: 2, title: "Mahodand → Return", details: "Jeep to Mahodand Lake, lunch, return home." },
    ],
    included: ["Transport", "1 night hotel", "Breakfast & dinner", "Jeep on day 2"],
    excluded: ["Lunches", "Tickets"],
  },
  {
    slug: "naran-kaghan-classic",
    title: "Naran Kaghan Classic",
    destination: "naran-kaghan",
    days: 3,
    priceFrom: 21000,
    image: naran,
    summary: "The most photographed lakes in Pakistan — Saiful Mulook & Lulusar.",
    highlights: ["Saiful Mulook jeep & boat", "Lulusar Lake viewpoint", "Babusar Top (seasonal)"],
    itinerary: [
      { day: 1, title: "Islamabad → Naran", details: "Drive via Balakot, evening riverside walk." },
      { day: 2, title: "Saiful Mulook & Babusar", details: "Jeep to Saiful Mulook, continue to Babusar Pass." },
      { day: 3, title: "Lulusar → Return", details: "Lulusar Lake stop, return to Islamabad." },
    ],
    included: ["Transport", "2 nights hotel", "Breakfast & dinner", "Jeep on lake day"],
    excluded: ["Boat tickets", "Lunches"],
  },
  {
    slug: "kashmir-neelum",
    title: "Kashmir & Neelum Valley",
    destination: "kashmir",
    days: 4,
    priceFrom: 28000,
    image: kashmir,
    summary: "Neelum River, Arang Kel cable car, and the green heart of Azad Kashmir.",
    highlights: ["Keran riverside cottages", "Arang Kel chairlift & trek", "Sharda University ruins"],
    itinerary: [
      { day: 1, title: "Islamabad → Muzaffarabad → Keran", details: "Scenic drive along Neelum River." },
      { day: 2, title: "Arang Kel", details: "Chairlift + short trek to the meadow village." },
      { day: 3, title: "Sharda & Kel", details: "Visit historic Sharda, drive to Kel." },
      { day: 4, title: "Return", details: "Drive back to Islamabad." },
    ],
    included: ["Transport", "3 nights stay", "Breakfast & dinner", "Permits"],
    excluded: ["Cable car tickets", "Lunches"],
  },
];

export const testimonials = [
  { name: "Sarah Ahmed", role: "Joined Hunza Explorer, 2024", quote: "Travelling with WILD wasn't just a trip — it was an education in scale. The silence on the ridge at sunrise is something I still carry with me.", initial: "SA" },
  { name: "Hamza Iqbal", role: "Joined Fairy Meadows, 2023", quote: "Tightly organised, genuinely warm. Felt like travelling with friends who happen to know every shortcut in the Karakoram.", initial: "HI" },
  { name: "Maryam Khan", role: "Joined Skardu Adventure, 2024", quote: "I'm a solo female traveller and WILD made me feel safer than most family trips I've been on. Booking the next one already.", initial: "MK" },
];

export const stats = [
  { label: "Travellers", value: "79+" },
  { label: "Safety Record", value: "100%" },
  { label: "Peaks Touched", value: "12" },
  { label: "Avg. Rating", value: "4.9" },
];
