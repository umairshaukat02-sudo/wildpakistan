import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the WILD Pakistan travel concierge — an AI assistant for an Islamabad-based adventure tour community.
You recommend trips across Northern Pakistan (Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan, Kashmir).
Be concise, warm, and practical. Suggest specific itineraries, durations, and approximate PKR pricing when asked.
Direct serious bookings to the /customize page or /contact. Never invent prices for fixed tours other than:
- Hunza Explorer (3 days, from PKR 32,000)
- Skardu Adventure (5 days, from PKR 54,000)
- Fairy Meadows Trek (4 days, from PKR 38,500)
- Swat Weekend (2 days, from PKR 14,500)
- Naran Kaghan Classic (3 days, from PKR 21,000)
- Kashmir & Neelum (4 days, from PKR 28,000)
Contact: tripsbywild@gmail.com / 0312-5611476.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages: UIMessage[] };
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
