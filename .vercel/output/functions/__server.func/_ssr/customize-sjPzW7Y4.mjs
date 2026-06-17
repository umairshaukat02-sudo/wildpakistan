import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { i as submitInquiry } from "./inquiries.functions-Bbi5o8-P.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Check, d as LoaderCircle, v as ArrowRight, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as destinations } from "./data-DvbGLkfa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customize-sjPzW7Y4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
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
	additional_requirements: ""
};
var pickups = [
	"Islamabad",
	"Lahore",
	"Rawalpindi",
	"Faisalabad",
	"Karachi"
];
var transports = [
	{
		name: "Economy Transport",
		price: 0
	},
	{
		name: "Hiace",
		price: 1500
	},
	{
		name: "Coaster",
		price: 2e3
	},
	{
		name: "Luxury Transport",
		price: 3500
	},
	{
		name: "SUV",
		price: 5e3
	},
	{
		name: "Private Car",
		price: 6e3
	}
];
var rooms = [
	"Shared Room",
	"Couple Room",
	"Family Room",
	"Single Room"
];
var hotelTiers = [
	{
		name: "Standard",
		price: 1500
	},
	{
		name: "2 Star",
		price: 2500
	},
	{
		name: "3 Star",
		price: 4e3
	},
	{
		name: "4 Star",
		price: 7e3
	},
	{
		name: "Luxury",
		price: 12e3
	}
];
var mealsOpts = [
	{
		name: "No Meals",
		price: 0
	},
	{
		name: "Breakfast Only",
		price: 800
	},
	{
		name: "Breakfast + Dinner",
		price: 1800
	},
	{
		name: "Full Board",
		price: 2800
	}
];
var activitiesList = [
	{
		name: "Hiking",
		price: 1500
	},
	{
		name: "Camping",
		price: 2e3
	},
	{
		name: "Bonfire",
		price: 800
	},
	{
		name: "Photography Tour",
		price: 2500
	},
	{
		name: "Jeep Safari",
		price: 4500
	},
	{
		name: "Trekking",
		price: 3e3
	},
	{
		name: "Boating",
		price: 1500
	},
	{
		name: "Sightseeing",
		price: 1e3
	}
];
var STEPS = [
	"Destination",
	"Duration",
	"Dates",
	"Pickup",
	"Transport",
	"Accommodation",
	"Meals",
	"Activities",
	"Travellers",
	"Details"
];
function pricing(f) {
	const people = Math.max(1, f.adults) + .5 * f.children;
	const days = Math.max(1, f.duration_days);
	const base = 8e3 * days * people;
	const accommodation = (hotelTiers.find((h) => h.name === f.hotel_category)?.price ?? 0) * days * Math.max(1, f.adults + f.children);
	const transport = (transports.find((t) => t.name === f.transport)?.price ?? 0) * days * people;
	const activities = f.activities.reduce((s, a) => s + (activitiesList.find((x) => x.name === a)?.price ?? 0), 0) * Math.max(1, f.adults + f.children);
	const meals = (mealsOpts.find((m) => m.name === f.meals)?.price ?? 0) * days * Math.max(1, f.adults + f.children);
	const subtotal = base + accommodation + transport + activities + meals;
	const service = subtotal * .05;
	const taxes = subtotal * .08;
	const grand = subtotal + service + taxes;
	return {
		base_cost: Math.round(base),
		accommodation_cost: Math.round(accommodation),
		transport_cost: Math.round(transport),
		activities_cost: Math.round(activities + meals),
		service_charges: Math.round(service),
		taxes: Math.round(taxes),
		grand_total: Math.round(grand)
	};
}
function fmt(n) {
	return "PKR " + n.toLocaleString();
}
function Customize() {
	const navigate = useNavigate();
	const submit = useServerFn(submitInquiry);
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)(initial);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const price = (0, import_react.useMemo)(() => pricing(form), [form]);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const toggleActivity = (a) => set("activities", form.activities.includes(a) ? form.activities.filter((x) => x !== a) : [...form.activities, a]);
	const canNext = () => {
		if (step === 0) return !!form.destination;
		if (step === 9) return form.customer_name.length > 1 && /.+@.+/.test(form.customer_email);
		return true;
	};
	const onSubmit = async () => {
		if (submitting) return;
		setSubmitting(true);
		try {
			const result = await submit({ data: {
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
				...price
			} });
			toast.success(`Inquiry ${result.inquiry_code} submitted!`);
			navigate({
				to: "/inquiry-success",
				search: { code: result.inquiry_code }
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Submission failed");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-28 pb-32 bg-muted/30 min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-3",
							children: "Trip Architect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl text-balance",
							children: "Design your expedition."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Step ",
								step + 1,
								" of ",
								STEPS.length
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: STEPS[step] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1 bg-border rounded-full overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent transition-all",
								style: { width: `${(step + 1) / STEPS.length * 100}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-background rounded-md border border-border p-6 md:p-10 min-h-[420px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: 20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: -20
								},
								transition: { duration: .25 },
								children: [
									step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Choose your destination",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 md:grid-cols-3 gap-3",
											children: [...destinations.map((d) => d.name), "Custom Destination"].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
												active: form.destination === d,
												onClick: () => set("destination", d),
												children: d
											}, d))
										})
									}),
									step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										label: "Trip duration",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 sm:grid-cols-6 gap-3",
											children: [
												1,
												2,
												3,
												5,
												7,
												10
											].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OptionCard, {
												active: form.duration_days === d,
												onClick: () => set("duration_days", d),
												children: [
													d,
													" ",
													d === 1 ? "Day" : "Days"
												]
											}, d))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 60,
											value: form.duration_days,
											onChange: (e) => set("duration_days", parseInt(e.target.value) || 1),
											className: "mt-4 w-32 rounded-md border border-border bg-background px-3 py-2 text-sm"
										})]
									}),
									step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Travel dates",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Departure",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: form.departure_date,
													onChange: (e) => set("departure_date", e.target.value),
													className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Return",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: form.return_date,
													onChange: (e) => set("return_date", e.target.value),
													className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
												})
											})]
										})
									}),
									step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Pickup location",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 md:grid-cols-3 gap-3",
											children: pickups.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
												active: form.pickup_location === p,
												onClick: () => set("pickup_location", p),
												children: p
											}, p))
										})
									}),
									step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Transportation",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 md:grid-cols-3 gap-3",
											children: transports.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OptionCard, {
												active: form.transport === t.name,
												onClick: () => set("transport", t.name),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground mt-1",
													children: [
														"+PKR ",
														t.price.toLocaleString(),
														"/day"
													]
												})]
											}, t.name))
										})
									}),
									step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
											label: "Room type",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
												children: rooms.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
													active: form.room_type === r,
													onClick: () => set("room_type", r),
													children: r
												}, r))
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
											label: "Hotel category",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
												children: hotelTiers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OptionCard, {
													active: form.hotel_category === h.name,
													onClick: () => set("hotel_category", h.name),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: h.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground mt-1",
														children: [
															"PKR ",
															h.price.toLocaleString(),
															"/night"
														]
													})]
												}, h.name))
											})
										})]
									}),
									step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Meals",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 gap-3",
											children: mealsOpts.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OptionCard, {
												active: form.meals === m.name,
												onClick: () => set("meals", m.name),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground mt-1",
													children: [
														"+PKR ",
														m.price.toLocaleString(),
														"/day"
													]
												})]
											}, m.name))
										})
									}),
									step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Activities (select multiple)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 md:grid-cols-4 gap-3",
											children: activitiesList.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OptionCard, {
												active: form.activities.includes(a.name),
												onClick: () => toggleActivity(a.name),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: a.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground mt-1",
													children: ["+PKR ", a.price.toLocaleString()]
												})]
											}, a.name))
										})
									}),
									step === 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
										label: "Travellers",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Adults",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 1,
													max: 50,
													value: form.adults,
													onChange: (e) => set("adults", parseInt(e.target.value) || 1),
													className: "w-full rounded-md border border-border bg-background px-3 py-2.5"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Children",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 0,
													max: 50,
													value: form.children,
													onChange: (e) => set("children", parseInt(e.target.value) || 0),
													className: "w-full rounded-md border border-border bg-background px-3 py-2.5"
												})
											})]
										})
									}),
									step === 9 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										label: "Your details",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
													label: "Full name *",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: form.customer_name,
														onChange: (e) => set("customer_name", e.target.value),
														className: "w-full rounded-md border border-border bg-background px-3 py-2.5"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
													label: "Email *",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "email",
														value: form.customer_email,
														onChange: (e) => set("customer_email", e.target.value),
														className: "w-full rounded-md border border-border bg-background px-3 py-2.5"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
													label: "Phone",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: form.customer_phone,
														onChange: (e) => set("customer_phone", e.target.value),
														className: "w-full rounded-md border border-border bg-background px-3 py-2.5"
													})
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Additional requirements",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 4,
												value: form.additional_requirements,
												onChange: (e) => set("additional_requirements", e.target.value),
												placeholder: "Female-only group, private guide, honeymoon package, special food, etc.",
												className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
											})
										})]
									})
								]
							}, step)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStep((s) => Math.max(0, s - 1)),
							disabled: step === 0,
							className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), " Back"]
						}), step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setStep((s) => Math.min(STEPS.length - 1, s + 1)),
							disabled: !canNext(),
							className: "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50",
							children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onSubmit,
							disabled: !canNext() || submitting,
							className: "inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50",
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								size: 14
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), "Submit Inquiry"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:sticky lg:top-28 bg-foreground text-background rounded-md p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-accent",
							children: "Package Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl mt-2 mb-5 pb-5 border-b border-background/10",
							children: form.destination || "Pick a destination"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Base",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.base_cost) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Accommodation",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.accommodation_cost) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Transport",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.transport_cost) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Activities + Meals",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.activities_cost) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Service (5%)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.service_charges) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Taxes (8%)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(price.taxes) })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 pt-6 border-t border-background/10 flex justify-between items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-accent",
								children: "Estimated Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl text-accent",
								children: fmt(price.grand_total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest text-background/40 mt-4",
							children: "Subject to review by our team"
						})
					]
				})
			})]
		})
	});
}
function Group({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-xl mb-5",
		children: label
	}), children] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block mt-4 first:mt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
			children: label
		}), children]
	});
}
function OptionCard({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `text-left rounded-md border px-4 py-3 text-sm font-medium transition ${active ? "border-accent bg-accent/10 text-foreground" : "border-border hover:border-accent/60"}`,
		children
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-background/60",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children })]
	});
}
//#endregion
export { Link, Customize as component };
