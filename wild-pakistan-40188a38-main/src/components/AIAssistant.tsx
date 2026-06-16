import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Compass } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    void sendMessage({ text });
  };

  const suggestions = [
    "Suggest a trip under PKR 30,000",
    "Best honeymoon destination?",
    "5-day family tour",
    "Trekking destinations in Pakistan",
  ];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-accent text-accent-foreground shadow-xl hover:scale-105 active:scale-95 transition grid place-items-center"
        aria-label="WILD AI assistant"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[560px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 bg-foreground text-background flex items-center gap-3">
              <div className="size-9 rounded-full bg-accent grid place-items-center text-accent-foreground">
                <Compass size={18} />
              </div>
              <div>
                <div className="font-display text-lg leading-none">WILD Concierge</div>
                <div className="text-[10px] uppercase tracking-widest text-background/60 mt-1">AI Travel Assistant</div>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hi! I help travellers find the right WILD trip. Ask me anything about Northern Pakistan.
                  </p>
                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => void sendMessage({ text: s })}
                        className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                return (
                  <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                    <div
                      className={`max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-foreground text-background px-3 py-2 rounded-2xl rounded-tr-sm"
                          : "text-foreground"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}
              {busy && <div className="text-xs text-muted-foreground animate-pulse">Thinking…</div>}
            </div>
            <form onSubmit={onSubmit} className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about trips, prices, dates…"
                className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="size-10 grid place-items-center rounded-full bg-accent text-accent-foreground disabled:opacity-50"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
