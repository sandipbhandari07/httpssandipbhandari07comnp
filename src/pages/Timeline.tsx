import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Briefcase, GraduationCap, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { highlightDart } from "@/lib/dartHighlighter";

const timelineData = [
  {
    id: 1, type: "work" as const, title: "Android Developer",
    company: "BlackBoard Nepal Pvt. Ltd.", period: "July 2024 - Present",
    description: ["Flutter app development", "Building eCommerce admin app", "Integrating RESTful APIs", "Designing responsive UI components"],
    skills: ["Flutter", "REST API", "UI/UX"],
    dartCode: `class BlackBoardDev extends Developer {
  final String role = 'Android Developer';
  final DateTime startDate = DateTime(2024, 7);

  @override
  List<Widget> build() => [
    FlutterApp(type: 'eCommerce Admin'),
    RestApiIntegration(),
    ResponsiveUI(),
  ];
}`,
  },
  {
    id: 2, type: "education" as const, title: "Bachelor in Computer Application",
    company: "Kathmandu Bernhardt College", period: "2023", gpa: "3.18",
    description: ["Web programming", "Mobile app development", "Database management"],
    skills: ["Programming", "Database", "Web Dev"],
    dartCode: `@Education(degree: 'BCA', gpa: 3.18)
class KathmanduBernhardt {
  final subjects = <String>[
    'Web Programming',
    'Mobile App Development',
    'Database Management',
  ];
}`,
  },
  {
    id: 3, type: "work" as const, title: "Django Developer Intern",
    company: "Corpola Tech", period: "April 2023 - July 2023",
    description: ["Django app development", "Bug fixing and testing", "Database schema handling with ORM"],
    skills: ["Django", "Python", "PostgreSQL"],
    dartCode: `class CorpolaIntern implements Intern {
  final String stack = 'Django + PostgreSQL';
  
  Future<void> dailyTasks() async {
    await buildDjangoApps();
    await fixBugs();
    await handleDatabaseORM();
  }
}`,
  },
  {
    id: 4, type: "work" as const, title: "IT Engineer",
    company: "LAFUGO Corporation Japan", period: "Dec 2022 - March 2023",
    description: ["Docker containers", "Environment setup", "Feature implementation"],
    skills: ["Docker", "DevOps"],
    dartCode: `class LafugoEngineer with DevOpsMixin {
  final String location = 'Japan 🇯🇵';

  void setupEnvironment() {
    Docker.compose(services: ['app', 'db']);
    implementFeatures();
  }
}`,
  },
  {
    id: 5, type: "education" as const, title: "+2 Science",
    company: "Kathmandu Bernhardt College", period: "2018", gpa: "2.77",
    dartCode: `@Education(level: '+2 Science', gpa: 2.77)
class HigherSecondary {
  final majors = ['Physics', 'Math', 'CS'];
}`,
    description: ["Physics", "Mathematics", "Computer Science"],
    skills: ["Science", "Math"],
  },
  {
    id: 6, type: "education" as const, title: "SLC",
    company: "Bright Angels' School", period: "2016", gpa: "3.70",
    dartCode: `@Education(level: 'SLC', gpa: 3.70)
class BrightAngels {
  String get achievement => 'Strong Foundation ✨';
}`,
    description: ["Strong academic foundation"],
    skills: ["Academics"],
  },
];


const Timeline = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (direction: "left" | "right") => {
    const next = direction === "left" ? Math.max(0, activeIndex - 1) : Math.min(timelineData.length - 1, activeIndex + 1);
    setActiveIndex(next);
  };

  const item = timelineData[activeIndex];
  const isWork = item.type === "work";
  const highlightedCode = highlightDart(item.dartCode);

  return (
    <div className="min-h-screen h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-5">
          {/* Header */}
          <div className="animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terminal-green animate-pulse" />
              <span className="text-xs font-mono text-terminal-green tracking-wider uppercase">Experience & Education</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-purple bg-clip-text text-transparent">
              myJourney.dart
            </h1>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => scrollTo("left")} disabled={activeIndex === 0}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-terminal-green hover:border-terminal-green/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {timelineData.map((d, i) => (
                <button key={d.id} onClick={() => setActiveIndex(i)}
                  className={`relative transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? `w-8 h-3 ${d.type === "work" ? "bg-terminal-blue" : "bg-terminal-purple"}`
                      : "w-3 h-3 bg-border/60 hover:bg-muted-foreground/40"
                  }`} />
              ))}
            </div>
            <button onClick={() => scrollTo("right")} disabled={activeIndex === timelineData.length - 1}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-terminal-green hover:border-terminal-green/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card */}
          <div className="relative animate-fade-in" key={item.id}>
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br blur-xl opacity-20 ${
              isWork ? "from-terminal-blue to-terminal-green" : "from-terminal-purple to-terminal-green"
            }`} />

            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              {/* Accent bar */}
              <div className={`h-1 bg-gradient-to-r ${
                isWork ? "from-terminal-blue via-terminal-green to-terminal-blue" : "from-terminal-purple via-terminal-green to-terminal-purple"
              }`} />

              <div className="flex flex-col md:flex-row">
                {/* Left: Dart Code Block */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-border/30">
                  {/* Code header bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-background/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-terminal-yellow/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/70" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground ml-2">
                      {item.title.toLowerCase().replace(/\s+/g, '_')}.dart
                    </span>
                  </div>

                  {/* Code content */}
                  <div className="p-4 md:p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
                    {highlightedCode.map((lineElements, i) => (
                      <div key={i} className="flex">
                        <span className="w-6 text-right mr-4 text-muted-foreground/40 select-none text-xs">{i + 1}</span>
                        <span>{lineElements}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Meta Info */}
                <div className="md:w-72 p-5 flex flex-col gap-4">
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
                      <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="font-mono text-xs">
                      <span className="text-terminal-blue">company</span>: <span className="text-terminal-green">'{item.company}'</span>
                    </p>
                    <p className="font-mono text-xs">
                      <span className="text-terminal-blue">period</span>: <span className="text-terminal-green">'{item.period}'</span>
                    </p>
                    {item.gpa && (
                      <p className="font-mono text-xs">
                        <span className="text-terminal-blue">gpa</span>: <span className="text-terminal-yellow">{item.gpa}</span>
                      </p>
                    )}
                  </div>

                  {/* Skills as Dart list */}
                  <div className="mt-auto">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">// tech_stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <span key={skill} className={`text-[11px] px-2.5 py-1.5 rounded-lg font-mono border transition-colors ${
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
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground font-mono">
            <span className="text-terminal-green">timeline</span>[<span className="text-terminal-yellow">{activeIndex}</span>] <span className="text-muted-foreground/50">// {activeIndex + 1} of {timelineData.length}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
