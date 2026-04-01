import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, ChevronDown } from "lucide-react";
import TimelineCard from "@/components/TimelineCard";

const timelineData = [
  {
    id: 1,
    type: "work" as const,
    title: "Android Developer",
    company: "BlackBoard Nepal Pvt. Ltd.",
    period: "July 2024 - Present",
    description: ["Flutter app development", "Building eCommerce admin app", "Integrating RESTful APIs", "Designing responsive UI components"],
    skills: ["Flutter", "REST API", "UI/UX"],
  },
  {
    id: 2,
    type: "education" as const,
    title: "Bachelor in Computer Application",
    company: "Kathmandu Bernhardt College",
    period: "2023",
    gpa: "3.18",
    description: ["Web programming", "Mobile app development", "Database management"],
    skills: ["Programming", "Database", "Web Dev"],
  },
  {
    id: 3,
    type: "work" as const,
    title: "Django Developer Intern",
    company: "Corpola Tech",
    period: "April 2023 - July 2023",
    description: ["Django app development", "Bug fixing and testing", "Database schema handling with ORM"],
    skills: ["Django", "Python", "PostgreSQL"],
  },
  {
    id: 4,
    type: "work" as const,
    title: "IT Engineer",
    company: "LAFUGO Corporation Japan",
    period: "Dec 2022 - March 2023",
    description: ["Docker containers", "Environment setup", "Feature implementation"],
    skills: ["Docker", "DevOps"],
  },
  {
    id: 5,
    type: "education" as const,
    title: "+2 Science",
    company: "Kathmandu Bernhardt College",
    period: "2018",
    gpa: "2.77",
    description: ["Physics", "Mathematics", "Computer Science"],
    skills: ["Science", "Math"],
  },
  {
    id: 6,
    type: "education" as const,
    title: "SLC",
    company: "Bright Angels' School",
    period: "2016",
    gpa: "3.70",
    description: ["Strong academic foundation"],
    skills: ["Academics"],
  },
];

const Timeline = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="animate-fade-in text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-terminal-green animate-pulse" />
              <span className="text-xs font-mono text-terminal-green tracking-wider uppercase">Experience & Education</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-purple bg-clip-text text-transparent">
              My Journey
            </h1>
            <p className="text-muted-foreground mt-3 font-mono text-sm">
              ~/career <span className="text-terminal-green">$</span> cat timeline.log
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
              <div className="h-full w-full bg-gradient-to-b from-terminal-green/60 via-terminal-blue/40 to-terminal-purple/60" />
              <div className="absolute top-0 h-full w-full bg-gradient-to-b from-terminal-green/60 via-terminal-blue/40 to-terminal-purple/60 blur-sm" />
            </div>

            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                isLeft={index % 2 === 0}
              />
            ))}

            {/* End dot */}
            <div className="absolute left-6 md:left-1/2 -bottom-2 w-3 h-3 -translate-x-1.5 md:-translate-x-1.5 rounded-full bg-terminal-purple border-2 border-background" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
