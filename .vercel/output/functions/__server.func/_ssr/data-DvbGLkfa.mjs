//#region node_modules/.nitro/vite/services/ssr/assets/data-DvbGLkfa.js
var destinations = [
	{
		slug: "hunza",
		name: "Hunza Valley",
		region: "Gilgit-Baltistan",
		tagline: "Terraced Orchards & Glaciers",
		elevation: "2,438m",
		imageKey: "dest-hunza",
		description: "The Valley of Eternal Youth — Rakaposhi, Baltit Fort, cherry blossoms, and Karakoram silence."
	},
	{
		slug: "skardu",
		name: "Skardu",
		region: "Baltistan",
		tagline: "The Cold Desert Gateway",
		elevation: "2,228m",
		imageKey: "dest-skardu",
		description: "Sand dunes meeting glaciated giants. Gateway to K2, Shigar, Deosai, and Shangrila."
	},
	{
		slug: "fairy-meadows",
		name: "Fairy Meadows",
		region: "Diamer",
		tagline: "Nanga Parbat Basecamp",
		elevation: "3,300m",
		imageKey: "dest-fairy-meadows",
		description: "Alpine meadows beneath the ninth-tallest peak on earth. Camp, trek, and witness the Killer Mountain."
	},
	{
		slug: "swat",
		name: "Swat Valley",
		region: "Khyber Pakhtunkhwa",
		tagline: "Alpine Switzerland of the East",
		elevation: "2,500m",
		imageKey: "dest-swat",
		description: "Emerald rivers, pine forests, Mahodand, Malam Jabba — the green heart of the north."
	},
	{
		slug: "naran-kaghan",
		name: "Naran Kaghan",
		region: "Mansehra",
		tagline: "Saiful Mulook & Lulusar Lakes",
		elevation: "2,500m",
		imageKey: "dest-naran",
		description: "Turquoise alpine lakes, Babusar Pass, and jeep trails through one of Pakistan's most beloved valleys."
	},
	{
		slug: "kashmir",
		name: "Azad Kashmir",
		region: "Neelum & Leepa",
		tagline: "Verdant Meadows & Rivers",
		elevation: "2,000m",
		imageKey: "dest-kashmir",
		description: "Wooden chalets, Neelum River, Arang Kel — a slow, lush counterpoint to the high Karakoram."
	}
];
var testimonials = [
	{
		name: "Sarah Ahmed",
		role: "Joined Hunza Explorer, 2024",
		quote: "Travelling with WILD wasn't just a trip — it was an education in scale. The silence on the ridge at sunrise is something I still carry with me.",
		initial: "SA"
	},
	{
		name: "Hamza Iqbal",
		role: "Joined Fairy Meadows, 2023",
		quote: "Tightly organised, genuinely warm. Felt like travelling with friends who happen to know every shortcut in the Karakoram.",
		initial: "HI"
	},
	{
		name: "Maryam Khan",
		role: "Joined Skardu Adventure, 2024",
		quote: "I'm a solo female traveller and WILD made me feel safer than most family trips I've been on. Booking the next one already.",
		initial: "MK"
	}
];
var stats = [
	{
		label: "Travellers",
		value: "79+"
	},
	{
		label: "Safety Record",
		value: "100%"
	},
	{
		label: "Peaks Touched",
		value: "12"
	},
	{
		label: "Avg. Rating",
		value: "4.9"
	}
];
var IMAGE_FALLBACKS = {
	hero: "/images/hero-karakoram.jpg",
	community: "/images/community.jpg",
	"dest-hunza": "/images/dest-hunza.jpg",
	"dest-skardu": "/images/dest-skardu.jpg",
	"dest-fairy-meadows": "/images/dest-fairy-meadows.jpg",
	"dest-swat": "/images/dest-swat.jpg",
	"dest-naran": "/images/dest-naran.jpg",
	"dest-kashmir": "/images/dest-kashmir.jpg"
};
function imageUrl(key, images) {
	return images?.find((i) => i.key === key)?.url ?? IMAGE_FALLBACKS[key] ?? "";
}
//#endregion
export { testimonials as a, stats as i, destinations as n, imageUrl as r, IMAGE_FALLBACKS as t };
