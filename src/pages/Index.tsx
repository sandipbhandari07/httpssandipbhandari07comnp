import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { ArrowRight, Terminal } from "lucide-react";

const heroCode = `import 'package:flutter/material.dart';

class SandipBhandari extends Developer {
  final String name = 'Sandip Bhandari';
  final String role = 'Mobile & Web Developer';
  final String location = 'Nepal 🇳🇵';

  List<String> get expertise => [
    'Flutter & Dart',
    'Android Development',
    'RESTful APIs',
    'Laravel & Django',
  ];

  @override
  Widget build(BuildContext context) {
    return Portfolio(
      theme: ThemeData.dark(),
      passion: 'Building beautiful apps',
    );
  }
}`;

const skillsCode = `// skills.dart
final Map<String, List<String>> skills = {
  'Mobile': ['Flutter', 'Dart', 'Java', 'Android'],
  'Backend': ['PHP', 'Python', 'Laravel', 'Django'],
  'Database': ['MySQL', 'PostgreSQL', 'Firebase'],
  'Tools': ['Git', 'Docker', 'VS Code', 'Figma'],
};

void main() => runApp(SandipBhandari());`;

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto w-full animate-fade-in">
          {/* Welcome badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card/60 border border-border/50 rounded-full font-mono text-sm">
              <Terminal className="w-3.5 h-3.5 text-terminal-green" />
              <span className="text-muted-foreground">~/sandip-bhandari</span>
              <span className="text-terminal-green">$</span>
              <span className="text-terminal-cyan">flutter run</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Main Dart code block */}
            <div className="flex flex-col gap-4">
              <div className="relative flex-1 min-h-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-green/20 to-terminal-purple/20 blur-xl" />
                <DartCodeBlock code={heroCode} fileName="main.dart" className="relative h-full" />
              </div>

              {/* CTA buttons */}
              <div className="flex gap-4 font-mono">
                <button
                  onClick={() => navigate("/work")}
                  className="group flex items-center gap-2 px-6 py-3.5 bg-terminal-green/10 border border-terminal-green/50 rounded-xl hover:bg-terminal-green/20 hover:border-terminal-green transition-all text-base text-terminal-green hover:shadow-[0_0_20px_hsl(var(--terminal-green)/0.2)]"
                >
                  viewProjects()
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3.5 bg-terminal-purple/10 border border-terminal-purple/50 rounded-xl hover:bg-terminal-purple/20 hover:border-terminal-purple transition-all text-base text-terminal-purple hover:shadow-[0_0_20px_hsl(var(--terminal-purple)/0.2)]"
                >
                  getInTouch()
                </button>
              </div>
            </div>

            {/* Right: Skills + Status */}
            <div className="flex flex-col gap-4">
              <div className="relative flex-1 min-h-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-purple/20 to-terminal-cyan/20 blur-xl" />
                <DartCodeBlock code={skillsCode} fileName="skills.dart" className="relative h-full" />
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-card/60 border border-border/50 rounded-xl font-mono text-sm">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-terminal-green animate-ping opacity-75" />
                </div>
                <span className="text-muted-foreground">
                  <span className="text-terminal-green">status</span>: <span className="text-terminal-green">'Available for work'</span>
                </span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Projects", value: "10+", color: "terminal-green" },
                  { label: "Experience", value: "3+ yrs", color: "terminal-cyan" },
                  { label: "Tech Stack", value: "12+", color: "terminal-purple" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1.5 px-4 py-4 bg-card/60 border border-border/50 rounded-xl">
                    <span className={`text-xl font-bold text-${stat.color}`}>{stat.value}</span>
                    <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
