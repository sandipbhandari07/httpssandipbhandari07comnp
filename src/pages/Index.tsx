import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { ArrowRight } from "lucide-react";

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

      <main className="h-screen flex items-center justify-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-6xl mx-auto w-full animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left: Main Dart code block */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-green to-terminal-purple opacity-20 blur-xl" />
                <DartCodeBlock code={heroCode} fileName="main.dart" className="relative" />
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 font-mono">
                <button
                  onClick={() => navigate("/work")}
                  className="group flex items-center gap-2 px-5 py-3 bg-terminal-green/10 border border-terminal-green/50 rounded-xl hover:bg-terminal-green/20 hover:border-terminal-green transition-all text-sm text-terminal-green"
                >
                  viewProjects()
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-5 py-3 bg-terminal-purple/10 border border-terminal-purple/50 rounded-xl hover:bg-terminal-purple/20 hover:border-terminal-purple transition-all text-sm text-terminal-purple"
                >
                  getInTouch()
                </button>
              </div>
            </div>

            {/* Right: Skills code block */}
            <div className="space-y-4">
              <DartCodeBlock code={skillsCode} fileName="skills.dart" />

              {/* Status indicator */}
              <div className="flex items-center gap-3 px-4 py-3 bg-card/60 border border-border/50 rounded-xl font-mono text-xs">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-terminal-green animate-ping opacity-75" />
                </div>
                <span className="text-muted-foreground">
                  <span className="text-terminal-green">status</span>: <span className="text-terminal-green">'Available for work'</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
