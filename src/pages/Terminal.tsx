import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { projects } from "@/lib/projects";

interface TerminalLine {
  type: "input" | "output" | "error" | "ascii" | "help";
  content: string;
}

const ASCII_BANNER = `
  ██████  ██████  
 ██       ██   ██ 
  ██████  ██████  
       ██ ██   ██ 
  ██████  ██████  
                  
 Sandip Bhandari
 Android & API Developer
`;

const HELP_TEXT = `
╔══════════════════════════════════════════════════════════════╗
║  Available Commands                                         ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  about       → Who am I? My story                           ║
║  skills      → Technical skills & expertise                 ║
║  projects    → View all my projects                         ║
║  experience  → Work experience                              ║
║  education   → Academic background                          ║
║  contact     → Get in touch with me                         ║
║  social      → Social media links                           ║
║  resume      → Quick resume overview                        ║
║  clear       → Clear terminal                               ║
║  help        → Show this help menu                          ║
║                                                              ║
║  Tip: Type any command and press Enter                      ║
╚══════════════════════════════════════════════════════════════╝
`;

const getCommandOutput = (cmd: string): { content: string; type: TerminalLine["type"] } => {
  const command = cmd.trim().toLowerCase();

  switch (command) {
    case "help":
      return { content: HELP_TEXT, type: "help" };

    case "about":
      return {
        content: `
┌─ About Me ─────────────────────────────────────────────────┐
│                                                             │
│  Name     : Sandip Bhandari                                │
│  Role     : Android & RESTful API Developer                │
│  Location : Thankot, Kathmandu, Nepal                      │
│  Status   : Available for opportunities                    │
│                                                             │
│  I'm a passionate mobile app developer specializing in     │
│  Android development with Java/Kotlin and building         │
│  RESTful APIs. Currently working at BlackBoard Nepal,      │
│  crafting scalable mobile solutions and backend systems.   │
│                                                             │
│  I love turning ideas into functional, beautiful apps.     │
│                                                             │
└─────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "skills":
      return {
        content: `
┌─ Technical Skills ──────────────────────────────────────────┐
│                                                              │
│  ⚡ Languages                                                │
│     Java • Kotlin • Python • JavaScript • TypeScript        │
│     Dart • PHP • HTML/CSS                                   │
│                                                              │
│  📱 Mobile                                                   │
│     Android SDK • Flutter • REST APIs • Firebase            │
│                                                              │
│  🌐 Web & Backend                                            │
│     Django • Laravel • React • Node.js • WordPress          │
│                                                              │
│  ☁️  Cloud & Tools                                            │
│     AWS • Git • GitHub • Docker • Postman                   │
│     MySQL • PostgreSQL • SQLite • Firebase                  │
│                                                              │
│  🎯 Other                                                    │
│     Agile • REST Architecture • CI/CD • Linux               │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "projects":
      const projectList = projects
        .map(
          (p, i) =>
            `│  ${String(i + 1).padStart(2, "0")}. ${p.title.padEnd(25)} │ ${p.category.padEnd(12)} │ ${p.type.padEnd(10)} │`
        )
        .join("\n");
      return {
        content: `
┌─ Projects ──────────────────────────────────────────────────┐
│                                                              │
│  #   Title                      Category       Type         │
│  ── ─────────────────────────── ──────────── ──────────     │
${projectList}
│                                                              │
│  → Type "project <number>" for details (e.g. project 1)    │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "experience":
      return {
        content: `
┌─ Work Experience ───────────────────────────────────────────┐
│                                                              │
│  🟢 Android & RESTful API Developer                         │
│     BlackBoard Nepal                                        │
│     July 2024 – Present                                     │
│     → Building Android apps & REST APIs                     │
│     → Tech: Java, Kotlin, REST, Firebase                    │
│                                                              │
│  🔵 Django Developer Intern                                  │
│     Corpola Tech                                            │
│     April 2023 – July 2023                                  │
│     → Backend development with Django                       │
│     → Tech: Python, Django, PostgreSQL                      │
│                                                              │
│  🟡 IT Engineer                                              │
│     LAFUGO Corporation, Japan                               │
│     December 2022 – March 2023                              │
│     → IT infrastructure & support                           │
│     → Tech: Networking, Systems                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "education":
      return {
        content: `
┌─ Education ─────────────────────────────────────────────────┐
│                                                              │
│  🎓 Bachelor in Computer Application (BCA)                  │
│     Kathmandu Bernhardt College                             │
│     Graduated: 2023  |  GPA: 3.18                           │
│                                                              │
│  📘 +2 Science                                               │
│     Completed: 2018                                         │
│                                                              │
│  📗 SLC                                                      │
│     Bright Angels' School                                   │
│     Completed: 2016                                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "contact":
      return {
        content: `
┌─ Contact Information ───────────────────────────────────────┐
│                                                              │
│  📧 Email    : bhandarisandip882@gmail.com                  │
│  📱 Phone    : +977-9860311353                              │
│  📍 Location : Thankot, Kathmandu, Nepal                   │
│                                                              │
│  → Feel free to reach out anytime!                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "social":
      return {
        content: `
┌─ Social Links ──────────────────────────────────────────────┐
│                                                              │
│  🐙 GitHub   : github.com/sandipbhandari07                 │
│  💼 LinkedIn : linkedin.com/in/sandipbhandari07             │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "resume":
      return {
        content: `
┌─ Resume Overview ───────────────────────────────────────────┐
│                                                              │
│  SANDIP BHANDARI                                            │
│  Android & RESTful API Developer                            │
│  Kathmandu, Nepal                                           │
│                                                              │
│  SUMMARY                                                     │
│  Passionate developer with expertise in Android, REST       │
│  APIs, and full-stack web development. Currently at         │
│  BlackBoard Nepal building mobile solutions.                │
│                                                              │
│  KEY SKILLS                                                  │
│  Java • Kotlin • Python • Django • Flutter • Firebase       │
│  REST APIs • Android SDK • PostgreSQL • AWS • Git           │
│                                                              │
│  EXPERIENCE                                                  │
│  → BlackBoard Nepal (2024–Present) - Android & API Dev      │
│  → Corpola Tech (2023) - Django Intern                      │
│  → LAFUGO Corp Japan (2022–2023) - IT Engineer              │
│                                                              │
│  EDUCATION                                                   │
│  → BCA - Kathmandu Bernhardt College (GPA: 3.18)            │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
        type: "output",
      };

    case "clear":
      return { content: "__CLEAR__", type: "output" };

    default:
      // Handle "project <number>"
      if (command.startsWith("project ")) {
        const num = parseInt(command.split(" ")[1]);
        if (num >= 1 && num <= projects.length) {
          const p = projects[num - 1];
          return {
            content: `
┌─ ${p.title} ${"─".repeat(Math.max(0, 55 - p.title.length))}┐
│                                                              │
│  Subtitle : ${p.subtitle.padEnd(46)}│
│  Category : ${p.category.padEnd(46)}│
│  Type     : ${p.type.padEnd(46)}│
│                                                              │
│  Description:                                                │
│  ${p.description.slice(0, 56).padEnd(56)}  │
│  ${(p.description.slice(56, 112) || "").padEnd(56)}  │
│  ${(p.description.slice(112, 168) || "").padEnd(56)}  │
│                                                              │
│  Features:                                                   │
${p.features.map((f) => `│    • ${f.padEnd(52)}│`).join("\n")}
│                                                              │
│  GitHub: ${p.github.padEnd(50)}│
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
            type: "output",
          };
        }
        return { content: `Error: Project number ${num} not found. Use 'projects' to see the list.`, type: "error" };
      }

      return {
        content: `Command not found: '${cmd.trim()}'. Type 'help' for available commands.`,
        type: "error",
      };
  }
};

const Terminal = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "ascii", content: ASCII_BANNER },
    { type: "output", content: "Welcome to Sandip's Terminal! Type 'help' to see available commands.\n" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: currentInput },
    ];

    const result = getCommandOutput(currentInput);

    if (result.content === "__CLEAR__") {
      setLines([
        { type: "ascii", content: ASCII_BANNER },
        { type: "output", content: "Terminal cleared. Type 'help' for commands.\n" },
      ]);
    } else {
      newLines.push({ type: result.type, content: result.content });
      setLines(newLines);
    }

    setCommandHistory((prev) => [currentInput, ...prev]);
    setCurrentInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-terminal-cyan";
      case "error":
        return "text-terminal-red";
      case "ascii":
        return "text-terminal-green";
      case "help":
        return "text-terminal-yellow";
      default:
        return "text-foreground/90";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        {/* Terminal window */}
        <div className="rounded-xl border border-border/40 bg-code-bg backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/30">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-background/30">
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-terminal-red/80 hover:bg-terminal-red transition-colors" />
              <div className="w-3.5 h-3.5 rounded-full bg-terminal-yellow/80 hover:bg-terminal-yellow transition-colors" />
              <div className="w-3.5 h-3.5 rounded-full bg-terminal-green/80 hover:bg-terminal-green transition-colors" />
            </div>
            <div className="flex items-center gap-2 ml-3 px-3 py-1 rounded-md bg-code-line-highlight/60 border-b-2 border-terminal-green/60">
              <span className="text-sm font-mono text-foreground/70">sandip@portfolio:~$</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-muted-foreground/60 font-mono">bash</span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            onClick={handleTerminalClick}
            className="p-5 md:p-6 font-mono text-sm md:text-base leading-relaxed min-h-[60vh] max-h-[70vh] overflow-y-auto cursor-text"
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === "input" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-terminal-green font-medium shrink-0">sandip@portfolio:~$</span>
                    <span className={getLineColor(line.type)}>{line.content}</span>
                  </div>
                ) : (
                  <pre className={`whitespace-pre-wrap break-words ${getLineColor(line.type)}`}>
                    {line.content}
                  </pre>
                )}
              </div>
            ))}

            {/* Active input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-terminal-green font-medium shrink-0">sandip@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-terminal-cyan caret-terminal-green text-sm md:text-base font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-2.5 h-5 bg-terminal-green/80 animate-pulse" />
            </form>
          </div>
        </div>

        {/* Quick hint */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground/60 font-mono">
            💡 Try: <span className="text-terminal-cyan/70">help</span> • <span className="text-terminal-cyan/70">about</span> • <span className="text-terminal-cyan/70">projects</span> • <span className="text-terminal-cyan/70">skills</span> • <span className="text-terminal-cyan/70">contact</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Terminal;
