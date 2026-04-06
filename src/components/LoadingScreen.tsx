import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    "Initializing Dart VM...",
    "Compiling widgets...",
    "Loading assets...",
    "Building UI tree...",
    "Running app...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 20), phases.length - 1);
    setPhase(idx);
  }, [progress]);

  const codeLines = [
    { text: "import 'package:flutter/material.dart';", delay: 0 },
    { text: "", delay: 0.1 },
    { text: "void main() {", delay: 0.2 },
    { text: "  runApp(SandipBhandari());", delay: 0.4 },
    { text: "}", delay: 0.6 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--terminal-green)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--terminal-green)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            background: `hsl(var(--terminal-${['green', 'cyan', 'purple', 'pink', 'orange', 'blue'][i]}))`,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-${i % 2 === 0 ? 'up' : 'down'} ${3 + i}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="relative w-[380px] max-w-[90vw]">
        {/* Terminal window */}
        <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/30">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/60">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-terminal-red/80" />
              <div className="w-3 h-3 rounded-full bg-terminal-yellow/80" />
              <div className="w-3 h-3 rounded-full bg-terminal-green/80" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground ml-2">flutter run</span>
          </div>

          {/* Code area */}
          <div className="p-4 font-mono text-xs space-y-1 min-h-[140px]">
            {codeLines.map((line, i) => (
              <div
                key={i}
                className="transition-all duration-300"
                style={{
                  opacity: progress > i * 15 ? 1 : 0,
                  transform: `translateX(${progress > i * 15 ? 0 : -8}px)`,
                  transitionDelay: `${line.delay}s`,
                }}
              >
                {line.text ? (
                  <span>
                    <span className="text-muted-foreground/40 mr-3 select-none">{i + 1}</span>
                    {i === 0 && (
                      <>
                        <span className="text-terminal-pink">import</span>
                        <span className="text-terminal-green"> 'package:flutter/material.dart'</span>
                        <span className="text-foreground/60">;</span>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <span className="text-terminal-cyan">void</span>
                        <span className="text-terminal-blue"> main</span>
                        <span className="text-foreground/60">() {"{"}</span>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <span className="text-terminal-yellow">  runApp</span>
                        <span className="text-foreground/60">(</span>
                        <span className="text-terminal-green">SandipBhandari</span>
                        <span className="text-foreground/60">());</span>
                      </>
                    )}
                    {i === 4 && <span className="text-foreground/60">{"}"}</span>}
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            ))}

            {/* Blinking cursor */}
            {progress < 100 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-muted-foreground/40 mr-3 select-none">$</span>
                <span className="w-2 h-4 bg-terminal-green animate-pulse" />
              </div>
            )}

            {/* Success message */}
            {progress >= 95 && (
              <div className="flex items-center gap-2 mt-2 animate-fade-in">
                <span className="text-muted-foreground/40 mr-3 select-none">✓</span>
                <span className="text-terminal-green text-[11px]">Build successful!</span>
              </div>
            )}
          </div>

          {/* Progress section */}
          <div className="px-4 pb-4 space-y-2">
            {/* Status text */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground truncate">
                {phases[phase]}
              </span>
              <span className="text-[10px] font-mono text-terminal-green font-bold ml-2">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out relative"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: `linear-gradient(90deg, hsl(var(--terminal-cyan)), hsl(var(--terminal-green)), hsl(var(--terminal-purple)))`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect under card */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, hsl(var(--terminal-cyan) / 0.3), hsl(var(--terminal-green) / 0.3), hsl(var(--terminal-purple) / 0.3))`,
            opacity: progress > 10 ? 0.6 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
