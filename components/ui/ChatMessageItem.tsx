import React from "react";
import { Bot, User, Sparkles } from "lucide-react";
import { ChatMessage, EventPlan } from "@/types/event";

interface ChatMessageItemProps {
  message: ChatMessage;
  onUpdatePlan?: (updated: Partial<EventPlan>) => void;
}

/**
 * Single chat message bubble with role styling and 1-click plan update application.
 */
export default function ChatMessageItem({
  message,
  onUpdatePlan,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start space-x-2.5 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      <div
        aria-hidden="true"
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white ${
          isUser ? "bg-fuchsia-600" : "bg-gradient-to-tr from-amber-500 to-purple-600"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div
        className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
          isUser
            ? "bg-fuchsia-600/90 text-white rounded-tr-none shadow-sm"
            : "glass-card text-slate-200 rounded-tl-none border border-white/10"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>

        {message.suggestedPlanUpdate && onUpdatePlan && (
          <div className="mt-2.5 pt-2 border-t border-white/10">
            <button
              type="button"
              aria-label="Apply AI suggested update to Master Event Plan"
              tabIndex={0}
              onClick={() => onUpdatePlan(message.suggestedPlanUpdate!)}
              className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center space-x-1 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
              <span>Apply this change to Master Plan</span>
            </button>
          </div>
        )}

        <span className="text-[9px] text-slate-400 block mt-1 text-right">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

