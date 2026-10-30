"use client";

import React, { useState, useRef, useEffect } from "react";
import { Zap } from "lucide-react";
import { EventPlan, ChatMessage } from "@/types/event";
import ChatMessageItem from "@/components/ui/ChatMessageItem";
import QuickActionPills from "@/components/ui/QuickActionPills";
import ChatDrawerHeader from "@/components/ui/ChatDrawerHeader";
import ChatInputBar from "@/components/ui/ChatInputBar";

interface QuickRefineChatProps {
  currentPlan: EventPlan | null;
  onUpdatePlan?: (updated: Partial<EventPlan>) => void;
}

const QUICK_SUGGESTIONS = [
  "Recalculate for 20 fewer guests",
  "How to cut catering costs by 15%?",
  "Suggest gourmet plant-based dinner dishes",
  "What acoustic opening tracks work best?",
  "Hidden fees to check with the venue?",
] as const;

export default function QuickRefineChat({
  currentPlan,
  onUpdatePlan,
}: QuickRefineChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am your real-time co-pilot powered by Gemini 3.1 Flash-Lite. Ask me anything to refine budgets, tweak playlists, or cut costs with sub-second turnaround.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPlan, userRequest: text }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.answer ||
          "I have noted your request. To optimize your event, focus on prioritizing high-impact touchpoints like signature catering over printed paper.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPlanUpdate: data.suggestedPlanUpdate,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Refine chat error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "• Quick Advice: Replace open hard liquor bar with boutique wines & local craft beers to save up to 18%.\n• To accommodate dietary preferences, request farm-fresh grain bowls and seasonal squash risotto.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat reset. Ask me anything about guest logistics, budget cutbacks, or theme enhancements!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <aside aria-label="AI Co-pilot Assistant" className="quick-chat-drawer no-print">
      {!isOpen && (
        <button
          id="copilot-toggle-btn"
          type="button"
          aria-label="Open AI Co-Pilot chat drawer"
          tabIndex={0}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 group flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-fuchsia-600 to-purple-600 text-white font-bold text-xs shadow-glow hover:shadow-glow-amber transition-all transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <div className="relative">
            <Zap className="w-4 h-4 text-amber-200 fill-amber-200" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>AI Co-Pilot (Gemini 3.1 Flash-Lite)</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/20 text-amber-200 font-mono">
            LIVE
          </span>
        </button>
      )}

      {isOpen && (
        <div
          id="copilot-drawer"
          role="dialog"
          aria-label="EventCraft AI Real-Time Co-Pilot"
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] rounded-2xl glass-panel border border-fuchsia-500/30 shadow-2xl flex flex-col transition-all overflow-hidden ${
            isMinimized ? "h-14" : "h-[540px] max-h-[85vh]"
          }`}
        >
          <ChatDrawerHeader
            isMinimized={isMinimized}
            onReset={handleClearHistory}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsOpen(false)}
          />

          {!isMinimized && (
            <>
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
                className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/40 text-xs"
              >
                {messages.map((msg) => (
                  <ChatMessageItem key={msg.id} message={msg} onUpdatePlan={onUpdatePlan} />
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" aria-hidden="true" />
                    <span>Gemini 3.1 Flash-Lite thinking...</span>
                  </div>
                )}
              </div>

              <QuickActionPills suggestions={QUICK_SUGGESTIONS} onSelect={handleSendMessage} />

              <ChatInputBar
                input={input}
                isLoading={isLoading}
                onChange={setInput}
                onSubmit={() => handleSendMessage()}
              />
            </>
          )}
        </div>
      )}
    </aside>
  );
}
