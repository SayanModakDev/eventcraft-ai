import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sparkles, Cpu, Zap, Calendar, Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "EventCraft AI - Autonomous Celebration & Event Architect",
  description:
    "Production-ready autonomous event planning web app powered by Gemini 3.8 Flash for master blueprints and Gemini 3.1 Flash-Lite for sub-second real-time co-pilot intelligence. Tailored for PromptWars Challenge 5.",
  keywords: [
    "EventCraft AI",
    "Event Planning",
    "AI Event Planner",
    "Gemini 3.8 Flash",
    "Gemini 3.1 Flash Lite",
    "Wedding Planning",
    "Corporate Events",
    "Hack2skill",
    "PromptWars",
  ],
  authors: [{ name: "EventCraft AI Engineering" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-mesh-pattern min-h-screen text-slate-100 selection:bg-fuchsia-500 selection:text-white`}>
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-amber-400 p-[1px] shadow-glow">
                <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-fuchsia-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-black tracking-tight text-white">
                    EventCraft<span className="text-fuchsia-400 font-extrabold">.ai</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                    PromptWars v5
                  </span>
                </div>
                <p className="hidden md:block text-[11px] text-slate-400 font-medium">
                  Autonomous Celebration & Experience Architecture
                </p>
              </div>
            </div>

            {/* Dual Model Status Badge */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5 text-purple-400 font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Gemini 3.8 Flash</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 text-[11px]">Master Blueprint</span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gemini 3.1 Flash-Lite</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 text-[11px]">Sub-sec Co-Pilot</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a
                href="#intake-section"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center space-x-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>New Event</span>
              </a>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping" />
                Live Engine
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Shell */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-white/10 bg-slate-950/70 py-8 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>EventCraft AI &bull; Built for Hack2skill / PromptWars Challenge 5</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span>Designed with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>for extraordinary celebrations</span>
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300 font-medium">Dual-Model Gemini Architecture</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
