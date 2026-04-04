import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { projects, ProjectType } from "@/lib/projects";
import { highlightDart } from "@/lib/dartHighlighter";
import { ExternalLink, Github, Sparkles, Play, Code2, Smartphone } from "lucide-react";

// Generate a Dart class snippet for each project
const projectToDart = (project: { title: string; category: string; features: string[] }) => {
  const className = project.title.replace(/[^a-zA-Z]/g, '');
  return `class ${className} extends App {
  final category = '${project.category}';
  final features = [
${project.features.slice(0, 3).map(f => `    '${f}',`).join('\n')}
  ];
}`;
};

const Work = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectType>("github");
  const navigate = useNavigate();

  const filteredProjects = projects.filter((p) => p.type === activeTab);
  const publishedProjects = projects.filter((p) => p.type === "published");

  const tabs: { id: ProjectType; label: string; icon: React.ReactNode; count: number }[] = [
    { id: "github", label: "GitHub Projects", icon: <Github className="w-4 h-4" />, count: projects.filter((p) => p.type === "github").length },
    { id: "published", label: "Published Apps", icon: <Smartphone className="w-4 h-4" />, count: publishedProjects.length },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col gap-5">
          {/* Header */}
          <div className="animate-fade-in flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-terminal-green animate-pulse" />
                <div className="absolute inset-0 blur-lg bg-terminal-green opacity-50" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-terminal-green via-terminal-purple to-terminal-green bg-clip-text text-transparent">
                  projects.dart
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                  // {projects.length} projects loaded
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="animate-fade-in flex gap-2" style={{ animationDelay: "0.1s" }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-terminal-green/10 border-terminal-green/50 text-terminal-green shadow-lg shadow-terminal-green/10"
                    : "bg-card/50 border-border/50 text-muted-foreground hover:border-terminal-green/30 hover:text-foreground"
                }`}>
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? "bg-terminal-green/20 text-terminal-green" : "bg-secondary text-muted-foreground"
                }`}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 pb-4">
                {filteredProjects.map((project, index) => {
                  const dartSnippet = projectToDart(project);
                  const highlighted = highlightDart(dartSnippet);
                  return (
                    <div key={project.id} onClick={() => navigate(`/project/${project.id}`)}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="group relative cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                      {/* Glow */}
                      <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-terminal-green via-terminal-purple to-terminal-green opacity-0 blur-sm transition-opacity duration-500 ${
                        hoveredProject === project.id ? "opacity-70" : ""
                      }`} />

                      <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-terminal-green/50 group-hover:shadow-2xl group-hover:shadow-terminal-green/10">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img src={project.imageUrl} alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
                          {/* Category Badge */}
                          <div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-md border border-terminal-green/30 rounded-full">
                            <span className="text-xs font-mono text-terminal-green">{project.category}</span>
                          </div>
                          {/* Type Badge */}
                          <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-md border border-terminal-purple/30 rounded-full flex items-center gap-1">
                            {project.type === "github" ? <Code2 className="w-3 h-3 text-terminal-purple" /> : <Play className="w-3 h-3 text-terminal-purple" />}
                            <span className="text-[10px] font-mono text-terminal-purple">{project.type === "github" ? "Open Source" : "Published"}</span>
                          </div>
                          {/* Hover Actions */}
                          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border rounded-lg text-xs font-mono hover:border-terminal-green hover:text-terminal-green transition-colors">
                              <Github className="w-3.5 h-3.5" /> Source
                            </a>
                            {project.playStoreUrl && (
                              <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 px-3 py-1.5 bg-terminal-purple/20 backdrop-blur-md border border-terminal-purple/50 rounded-lg text-xs font-mono text-terminal-purple hover:bg-terminal-purple/30 transition-colors">
                                <Play className="w-3.5 h-3.5" /> Play Store
                              </a>
                            )}
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-terminal-green/20 backdrop-blur-md border border-terminal-green/50 rounded-lg text-xs font-mono text-terminal-green hover:bg-terminal-green/30 transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" /> View
                            </button>
                          </div>
                        </div>

                        {/* Dart code snippet */}
                        <div className="px-4 pt-3 pb-1 border-b border-border/30 bg-background/30">
                          <div className="font-mono text-[11px] leading-relaxed overflow-hidden max-h-20">
                            {highlighted.map((lineElements, i) => (
                              <div key={i} className="flex">
                                <span className="w-4 text-right mr-2 text-muted-foreground/30 select-none text-[10px]">{i + 1}</span>
                                <span className="truncate">{lineElements}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col gap-3">
                          <div>
                            <h3 className="text-lg font-bold mb-1 group-hover:text-terminal-green transition-colors">{project.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-border/30 mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                              <span className="text-xs text-muted-foreground font-mono">{project.subtitle}</span>
                            </div>
                            <div className="text-xs text-terminal-green font-mono opacity-0 group-hover:opacity-100 transition-opacity">ENTER →</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center h-full">
                <div className="text-center space-y-4 animate-fade-in">
                  <Smartphone className="w-16 h-16 text-terminal-purple/30 mx-auto" />
                  <h3 className="text-xl font-bold font-mono">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Published apps will appear here.<br />
                    <span className="text-terminal-purple">Stay tuned...</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Work;
