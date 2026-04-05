import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Layers, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { projects } from "@/lib/projects";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { Button } from "@/components/ui/button";

const generateProjectDart = (project: typeof projects[0]) => {
  const className = project.title.replace(/[^a-zA-Z]/g, "");
  const techMap: Record<string, string> = {
    "Mobile App": "Flutter",
    "Web App": "DartWeb",
    "Web Game": "GameEngine",
  };
  const base = techMap[project.category] || "App";

  return `import 'package:${project.id.replace(/-/g, '_')}/app.dart';

class ${className} extends ${base} {
  @override
  final String name = '${project.title}';
  final String category = '${project.category}';

  List<String> get features => [
${project.features.map((f) => `    '${f}',`).join("\n")}
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: name,
      theme: ThemeData.dark(),
      home: const AppScreen(),
    );
  }
}

void main() => runApp(${className}());`;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate("/work")}>Back to Projects</Button>
        </div>
      </div>
    );
  }

  const images = project.images;
  const dartCode = generateProjectDart(project);

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen px-6 md:px-16 py-24">
        {/* Back Button */}
        <button
          onClick={() => navigate("/work")}
          className="group flex items-center gap-2 mb-8 font-mono text-sm text-muted-foreground hover:text-terminal-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>cd ../projects</span>
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="animate-fade-in mb-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-cyan/30 bg-terminal-cyan/5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-terminal-cyan animate-pulse" />
              <span className="text-xs font-mono text-terminal-cyan tracking-wider uppercase">{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-terminal-blue via-terminal-cyan to-terminal-green bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground font-mono">
              <span className="text-terminal-pink">///</span> {project.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Left Column - Dart Code + Features */}
            <div className="space-y-6">
              {/* Dart Code Block */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-blue/20 to-terminal-cyan/20 blur-xl opacity-60" />
                <DartCodeBlock
                  code={dartCode}
                  fileName={`${project.id.replace(/-/g, '_')}.dart`}
                  className="relative"
                />
              </div>

              {/* Description as terminal */}
              <div className="rounded-xl border border-border/40 bg-code-bg p-5 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3 text-muted-foreground/60">
                  <span className="text-terminal-pink">///</span>
                  <span className="text-xs uppercase tracking-wider">Description</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  <span className="text-terminal-green">$</span>{" "}
                  {project.description}
                </p>
              </div>

              {/* GitHub Button */}
              <button
                onClick={() => window.open(project.github, "_blank")}
                className="group w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border-2 border-terminal-green/50 bg-terminal-green/5 hover:bg-terminal-green/15 hover:border-terminal-green text-terminal-green font-mono text-sm transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                <span>openRepository()</span>
                <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </div>

            {/* Right Column - Image Gallery + Features */}
            <div className="space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-terminal-purple/15 via-transparent to-terminal-blue/15 rounded-2xl blur-xl" />

                <div className="relative rounded-xl overflow-hidden border border-border/40 bg-code-bg shadow-xl shadow-black/20">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-background/30 border-b border-border/20">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-terminal-red/80" />
                        <div className="w-3 h-3 rounded-full bg-terminal-yellow/80" />
                        <div className="w-3 h-3 rounded-full bg-terminal-green/80" />
                      </div>
                      <span className="ml-3 text-xs font-mono text-muted-foreground/60">
                        preview_{selectedImage + 1}.png
                      </span>
                    </div>
                    {images.length > 1 && (
                      <span className="text-xs text-terminal-cyan font-mono">
                        [{selectedImage + 1}/{images.length}]
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={images[selectedImage]}
                      alt={`${project.title} - Screenshot ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-code-bg/90 border border-terminal-blue/40 text-terminal-blue hover:bg-terminal-blue/20 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-code-bg/90 border border-terminal-blue/40 text-terminal-blue hover:bg-terminal-blue/20 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-l-2 border-t-2 border-terminal-cyan/40 rounded-tl-sm" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-r-2 border-t-2 border-terminal-cyan/40 rounded-tr-sm" />
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-l-2 border-b-2 border-terminal-cyan/40 rounded-bl-sm" />
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-r-2 border-b-2 border-terminal-cyan/40 rounded-br-sm" />
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-terminal-cyan shadow-[0_0_12px_hsl(var(--terminal-cyan)/0.4)]"
                          : "border-border/40 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Features as Dart List */}
              <div className="rounded-xl border border-border/40 bg-code-bg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-terminal-purple" />
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Features</span>
                </div>
                <div className="font-mono text-[13px] space-y-1">
                  <div className="text-terminal-pink">final</div>
                  <div className="pl-2">
                    <span className="text-terminal-cyan">List</span>
                    <span className="text-foreground/60">{"<"}</span>
                    <span className="text-terminal-cyan">String</span>
                    <span className="text-foreground/60">{">"}</span>
                    <span className="text-foreground/80"> features </span>
                    <span className="text-terminal-pink">= </span>
                    <span className="text-foreground/60">[</span>
                  </div>
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className={`pl-6 py-0.5 rounded-sm transition-all cursor-default ${
                        hoveredFeature === index ? "bg-terminal-green/10" : ""
                      }`}
                    >
                      <span className="text-terminal-green">'{feature}'</span>
                      <span className="text-foreground/40">,</span>
                      {hoveredFeature === index && (
                        <span className="ml-3 text-muted-foreground/40 text-xs">// ✓ implemented</span>
                      )}
                    </div>
                  ))}
                  <div className="pl-2 text-foreground/60">];</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
