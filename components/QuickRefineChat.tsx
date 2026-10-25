"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Send,
  X,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Minimize2,
  Maximize2,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { EventPlan, ChatMessage } from "@/types/event";

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
];

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
        body: JSON.stringify({
          currentPlan,
          userRequest: text,
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.answer ||
          "I have noted your request. To optimize your event, focus on prioritizing high-impact guest touchpoints like signature catering and live music over static printed paper.",
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
          "• Quick Advice: If trimming costs, replace hard liquor open bar with boutique wines & local craft beers to save up to 18%.\n• To accommodate dietary preferences without extra cost, request farm-fresh grain bowls and seasonal squash risotto from caterers.",
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
        content:
          "Chat reset. Ask me anything about guest logistics, budget cutbacks, or theme enhancements!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="quick-chat-drawer no-print">
      {/* Floating Action Trigger Button when closed */}
      {!isOpen && (
        <button
          id="copilot-toggle-btn"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 group flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-fuchsia-600 to-purple-600 text-white font-bold text-xs shadow-glow hover:shadow-glow-amber transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>AI Co-Pilot (Gemini 3.1 Flash-Lite)</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/20 text-amber-200 font-mono">
            LIVE
          </span>
        </button>
      )}

      {/* Floating Chat Window / Drawer */}
      {isOpen && (
        <div
          id="copilot-drawer"
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] rounded-2xl glass-panel border border-fuchsia-500/30 shadow-2xl flex flex-col transition-all overflow-hidden ${
            isMinimized ? "h-14" : "h-[540px] max-h-[85vh]"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-fuchsia-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold text-white">
                    EventCraft Co-Pilot
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    3.1 Flash-Lite
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Sub-second low latency assistant
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reset conversation"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Co-Pilot"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body (Hidden if Minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Scroll Area */}
              <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/40 text-xs"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2.5 ${
                      msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white ${
                        msg.role === "user"
                          ? "bg-fuchsia-600"
                          : "bg-gradient-to-tr from-amber-500 to-purple-600"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-fuchsia-600/90 text-white rounded-tr-none shadow-sm"
                          : "glass-card text-slate-200 rounded-tl-none border border-white/10"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {/* 1-Click Apply to Plan Button if AI proposes an update */}
                      {msg.suggestedPlanUpdate && onUpdatePlan && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              onUpdatePlan(msg.suggestedPlanUpdate!);
                            }}
                            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center space-x-1 transition-all"
                          >
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Apply this change to Master Plan</span>
                          </button>
                        </div>
                      )}

                      <span className="text-[9px] text-slate-400 block mt-1 text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    <span>Gemini 3.1 Flash-Lite thinking...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Pill Carousel */}
              <div className="px-3 py-2 bg-slate-950/60 border-t border-white/5 overflow-x-auto flex space-x-1.5 scrollbar-none">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSendMessage(suggestion)}
                    className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 hover:border-amber-400/50 hover:text-amber-300 text-slate-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center space-x-2">
                <input
                  id="copilot-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask to adjust guest count, cut budget, etc..."
                  className="flex-1 glass-input px-3 py-2 rounded-xl text-xs placeholder:text-slate-500 focus:border-amber-400"
                />
                <button
                  id="copilot-submit-btn"
                  type="button"
                  disabled={isLoading || !input.trim()}
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white hover:opacity-90 disabled:opacity-40 transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
