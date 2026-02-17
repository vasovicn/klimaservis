"use client";

import { useState, useRef, useEffect } from "react";
import { SERVICES } from "@/lib/services";

const SERVICE_KEYWORD_MAP: Record<string, string> = {
  mali: "mali",
  "mali servis": "mali",
  veliki: "veliki",
  "veliki servis": "veliki",
  kondenzator: "kondenzator",
  "zamena kondenzatora": "kondenzator",
};

/** Try to match an option string to a service ID */
function matchService(option: string): string | null {
  const lower = option.toLowerCase().trim();
  if (SERVICE_KEYWORD_MAP[lower]) return SERVICE_KEYWORD_MAP[lower];
  // Partial match
  for (const [keyword, id] of Object.entries(SERVICE_KEYWORD_MAP)) {
    if (lower.includes(keyword)) return id;
  }
  return null;
}

/** Check if ALL options in a list map to known services */
function allOptionsAreServices(options: string[]): string[] | null {
  const ids = options.map(matchService);
  if (ids.every((id) => id !== null)) return ids as string[];
  return null;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** Raw JSON string for assistant messages - sent back to API for context */
  rawJson?: string;
  type?: "options" | "text_input" | "end_chat" | "services_found";
  options?: string[];
  services?: string[];
}

export default function ServiceChat({
  onServicesFound,
  onBack,
}: {
  onServicesFound: (services: string[]) => void;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Opišite ukratko problem sa Vašim klima uređajem.",
      type: "text_input",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");

  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      // Send rawJson for assistant messages so the model sees its own JSON output
      const apiMessages = updated.map((m) => ({
        role: m.role,
        content: m.role === "assistant" && m.rawJson ? m.rawJson : m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.message ?? data.error ?? "Greška",
        rawJson: JSON.stringify(data),
        type: data.type ?? "text_input",
        options: data.options ?? [],
        services: data.services ?? [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Došlo je do greške. Pokušajte ponovo.",
          type: "text_input",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  };

  const handleOption = (option: string) => {
    if (loading) return;
    sendMessage(option);
  };

  const handleServiceSelect = (serviceId: string) => {
    onServicesFound([serviceId]);
  };

  // Determine if options are actually service choices
  const serviceOptionIds =
    lastAssistant?.type === "options" && lastAssistant.options?.length
      ? allOptionsAreServices(lastAssistant.options)
      : null;

  return (
    <div className="flex flex-col" style={{ minHeight: "320px" }}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI Asistent</h2>
          <p className="text-xs text-gray-500">
            Pomažemo Vam da pronađete pravu uslugu
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
        >
          Prikaži usluge
        </button>
      </div>

      {/* Messages */}
      <div className="mb-3 flex-1 space-y-3 overflow-y-auto rounded-xl bg-gray-50 p-3" style={{ maxHeight: "280px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-brand-500 text-white"
                  : "bg-white text-gray-800 shadow-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}

      {/* Options that are services → show as service cards, click = select + next */}
      {lastAssistant?.type === "options" && serviceOptionIds && !loading && (
        <div className="space-y-2">
          {serviceOptionIds.map((sid) => {
            const svc = SERVICES.find((s) => s.id === sid);
            if (!svc) return null;
            return (
              <button
                key={sid}
                onClick={() => handleServiceSelect(sid)}
                className="w-full rounded-xl border-2 border-gray-200 p-4 text-left transition-all hover:border-brand-500 hover:bg-brand-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{svc.name}</div>
                    <div className="text-xs text-gray-500">{svc.description}</div>
                  </div>
                  <span className="text-lg font-bold text-brand-600">
                    {svc.price} <span className="text-sm font-normal text-gray-400">RSD</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Options that are NOT services → show as regular chat option buttons */}
      {lastAssistant?.type === "options" && !serviceOptionIds && !loading && (
        <div className="flex flex-wrap gap-2">
          {lastAssistant.options?.map((opt) => (
            <button
              key={opt}
              onClick={() => handleOption(opt)}
              className="rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {lastAssistant?.type === "text_input" && !loading && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Unesite poruku..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:bg-gray-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </form>
      )}

      {lastAssistant?.type === "services_found" && lastAssistant.services && !loading && (
        <div className="space-y-2">
          {lastAssistant.services.map((sid) => {
            const svc = SERVICES.find((s) => s.id === sid);
            if (!svc) return null;
            return (
              <button
                key={sid}
                onClick={() => handleServiceSelect(sid)}
                className="w-full rounded-xl border-2 border-gray-200 p-4 text-left transition-all hover:border-brand-500 hover:bg-brand-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{svc.name}</div>
                    <div className="text-xs text-gray-500">{svc.description}</div>
                  </div>
                  <span className="text-lg font-bold text-brand-600">
                    {svc.price} <span className="text-sm font-normal text-gray-400">RSD</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {lastAssistant?.type === "end_chat" && !loading && (
        <button
          onClick={onBack}
          className="w-full rounded-full border-2 border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Nazad na usluge
        </button>
      )}
    </div>
  );
}
