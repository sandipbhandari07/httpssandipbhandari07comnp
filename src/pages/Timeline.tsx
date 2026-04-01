import { useState, useRef } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const timelineData = [
  {
    id: 1, type: "work" as const, title: "Android Developer",
    company: "BlackBoard Nepal Pvt. Ltd.", period: "July 2024 - Present",
    description: ["Flutter app development", "Building eCommerce admin app", "Integrating RESTful APIs", "Designing responsive UI components"],
    skills: ["Flutter", "REST API", "UI/UX"],
  },
  {
    id: 2, type: "education" as const, title: "Bachelor in Computer Application",
    company: "Kathmandu Bernhardt College", period: "2023", gpa: "3.18",
    description: ["Web programming", "Mobile app development", "Database management"],
    skills: ["Programming", "Database", "Web Dev"],
  },
  {
    id: 3, type: "work" as const, title: "Django Developer Intern",
    company: "Corpola Tech", period: "April 2023 - July 2023",
    description: ["Django app development", "Bug fixing and testing", "Database schema handling with ORM"],
    skills: ["Django", "Python", "PostgreSQL"],
  },
  {
    id: 4, type: "work" as const, title: "IT Engineer",
    company: "LAFUGO Corporation Japan", period: "Dec 2022 - March 2023",
    description: ["Docker containers", "Environment setup", "Feature implementation"],
    skills: ["Docker", "DevOps"],
  },
  {
    id: 5, type: "education" as const, title: "+2 Science",
    company: "Kathmandu Bernhardt College", period: "2018", gpa: "2.77",
    description: ["Physics", "Mathematics", "Computer Science"],
    skills: ["Science", "Math"],
  },
  {
    id: 6, type: "education" as const, title: "SLC",
    company: "Bright Angels' School", period: "2016", gpa: "3.70",
    description: ["Strong academic foundation"],
    skills: ["Academics"],
  },
];

const Timeline = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    const next = direction === "left" ? Math.max(0, activeIndex - 1) : Math.min(timelineData.length - 1, activeIndex + 1);
    setActiveIndex(next);
  };

  const item = timelineData[activeIndex];
  const isWork = item.type === "work";

  return (
    <div className="min-h-screen h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
          {/* Header */}
          <div className="animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terminal-green animate-pulse" />
              <span className="text-xs font-mono text-terminal-green tracking-wider uppercase">Experience & Education</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-purple bg-clip-text text-transparent">
              My Journey
            </h1>
          </div>

          {/* Horizontal progress dots */}
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => scrollTo("left")} disabled={activeIndex === 0}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-terminal-green hover:border-terminal-green/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {timelineData.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? `w-8 h-3 ${d.type === "work" ? "bg-terminal-blue" : "bg-terminal-purple"} shadow-[0_0_10px_hsl(var(--terminal-${d.type === "work" ? "blue" : "purple"})/0.5)]`
                      : "w-3 h-3 bg-border/60 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>

            <button onClick={() => scrollTo("right")} disabled={activeIndex === timelineData.length - 1}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-terminal-green hover:border-terminal-green/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Card */}
          <div className="relative animate-fade-in" key={item.id}>
            {/* Glow */}
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br blur-xl opacity-30 ${
              isWork ? "from-terminal-blue to-terminal-green" : "from-terminal-purple to-terminal-green"
            }`} />

            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              {/* Accent bar */}
              <div className={`h-1 bg-gradient-to-r ${
                isWork ? "from-terminal-blue via-terminal-green to-terminal-blue" : "from-terminal-purple via-terminal-green to-terminal-purple"
              }`} />

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-xl ${
                        isWork
                          ? "bg-terminal-blue/20 border-terminal-blue/50 text-terminal-blue shadow-[0_0_12px_hsl(var(--terminal-blue)/0.3)]"
                          : "bg-terminal-purple/20 border-terminal-purple/50 text-terminal-purple shadow-[0_0_12px_hsl(var(--terminal-purple)/0.3)]"
                      }`}>
                        {isWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${
                          isWork ? "text-terminal-blue" : "text-terminal-purple"
                        }`}>{item.type}</span>
                        <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-terminal-green/70" />
                        <span className="text-sm">{item.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-terminal-green/70" />
                        <span className="text-sm font-mono">{item.period}</span>
                      </div>
                      {item.gpa && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-terminal-green/10 border border-terminal-green/20 text-terminal-green">
                          GPA: {item.gpa}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-terminal-green mt-0.5">▹</span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Skills */}
                  <div className="md:w-48 flex flex-row md:flex-col flex-wrap gap-2 md:border-l md:border-border/30 md:pl-6">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider w-full mb-1">Tech Stack</span>
                    {item.skills.map((skill) => (
                      <span key={skill} className={`text-xs px-3 py-2 rounded-lg font-mono border text-center transition-colors ${
                        isWork
                          ? "bg-terminal-blue/5 border-terminal-blue/20 text-terminal-blue"
                          : "bg-terminal-purple/5 border-terminal-purple/20 text-terminal-purple"
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-xs text-muted-foreground font-mono">
            <span className="text-terminal-green">{activeIndex + 1}</span>/{timelineData.length} — click dots or arrows to navigate
          </p>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
