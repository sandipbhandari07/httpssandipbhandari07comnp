import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Code2, Layers, Terminal, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { projects } from "@/lib/projects";

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile App":
        return <Cpu className="w-4 h-4" />;
      case "Web App":
        return <Code2 className="w-4 h-4" />;
      case "Web Game":
        return <Terminal className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const images = project.images;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen px-6 md:px-16 py-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/work")}
          className="mb-8 hover:bg-transparent group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="text-[hsl(var(--terminal-green))]">Back to Projects</span>
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 animate-fade-in">
            {/* Left Column - Project Info */}
            <div className="space-y-8">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--terminal-green)/0.3)] bg-[hsl(var(--terminal-green)/0.05)]">
                {getCategoryIcon(project.category)}
                <span className="text-sm text-[hsl(var(--terminal-green))] font-mono">
                  {project.category}
                </span>
              </div>

              {/* Title Section */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground via-[hsl(var(--terminal-green))] to-foreground bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground font-mono">
                  // {project.subtitle}
                </p>
              </div>

              {/* Terminal-style Description */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--terminal-green)/0.2)] to-[hsl(var(--terminal-purple)/0.2)] rounded-xl blur-sm" />
                <div className="relative bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-red))]" />
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-yellow))]" />
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-green))]" />
                    <span className="ml-3 text-xs text-muted-foreground font-mono">description.md</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-mono text-sm">
                    <span className="text-[hsl(var(--terminal-green))]">$</span> {project.description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[hsl(var(--terminal-green))]" />
                  <span className="font-mono">Features</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className={`
                        relative p-3 rounded-lg border transition-all duration-300 cursor-default
                        ${hoveredFeature === index 
                          ? 'border-[hsl(var(--terminal-green))] bg-[hsl(var(--terminal-green)/0.1)] shadow-[0_0_20px_hsl(var(--terminal-green)/0.2)]' 
                          : 'border-border/50 bg-card/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`
                          w-1.5 h-1.5 rounded-full transition-colors duration-300
                          ${hoveredFeature === index ? 'bg-[hsl(var(--terminal-green))]' : 'bg-muted-foreground'}
                        `} />
                        <span className="text-sm text-muted-foreground font-mono">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Button */}
              <Button
                onClick={() => window.open(project.github, "_blank")}
                className="group relative overflow-hidden bg-transparent border-2 border-[hsl(var(--terminal-green))] text-[hsl(var(--terminal-green))] hover:text-background transition-all duration-300"
              >
                <span className="absolute inset-0 bg-[hsl(var(--terminal-green))] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Source Code
                </span>
              </Button>
            </div>

            {/* Right Column - Project Images Gallery */}
            <div className="relative animate-scale-in space-y-4">
              {/* Main Image */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--terminal-green)/0.2)] via-[hsl(var(--terminal-purple)/0.1)] to-[hsl(var(--terminal-blue)/0.2)] rounded-2xl blur-xl opacity-60" />
                
                {/* Image Container */}
                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-card/80 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-red))]" />
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-yellow))]" />
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-green))]" />
                      <span className="ml-3 text-xs text-muted-foreground font-mono">
                        preview_{selectedImage + 1}.png
                      </span>
                    </div>
                    {images.length > 1 && (
                      <span className="text-xs text-[hsl(var(--terminal-green))] font-mono">
                        {selectedImage + 1} / {images.length}
                      </span>
                    )}
                  </div>
                  
                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={images[selectedImage]}
                      alt={`${project.title} - Screenshot ${selectedImage + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    {/* Scan Line Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--terminal-green)/0.02)] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--terminal-green) / 0.03) 2px, hsl(var(--terminal-green) / 0.03) 4px)'
                    }} />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border border-[hsl(var(--terminal-green)/0.5)] text-[hsl(var(--terminal-green))] hover:bg-[hsl(var(--terminal-green)/0.2)] transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border border-[hsl(var(--terminal-green)/0.5)] text-[hsl(var(--terminal-green))] hover:bg-[hsl(var(--terminal-green)/0.2)] transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[hsl(var(--terminal-green))] opacity-60" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-[hsl(var(--terminal-green))] opacity-60" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-[hsl(var(--terminal-green))] opacity-60" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-[hsl(var(--terminal-green))] opacity-60" />
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`
                        relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300
                        ${selectedImage === index 
                          ? 'border-[hsl(var(--terminal-green))] shadow-[0_0_15px_hsl(var(--terminal-green)/0.4)]' 
                          : 'border-border/50 opacity-60 hover:opacity-100'
                        }
                      `}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-[hsl(var(--terminal-green)/0.1)]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
