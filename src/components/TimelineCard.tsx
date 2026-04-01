import { Briefcase, GraduationCap, Calendar, MapPin, ChevronDown } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  gpa?: string;
  description: string[];
  skills: string[];
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isLeft: boolean;
}

const TimelineCard = ({ item, index, isExpanded, onToggle, isLeft }: TimelineCardProps) => {
  const isWork = item.type === "work";

  return (
    <div
      className="relative mb-12 last:mb-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
    >
      {/* Node on the line */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 backdrop-blur-xl transition-all duration-300 ${
          isWork
            ? "bg-terminal-blue/20 border-terminal-blue/50 text-terminal-blue shadow-[0_0_15px_hsl(var(--terminal-blue)/0.3)]"
            : "bg-terminal-purple/20 border-terminal-purple/50 text-terminal-purple shadow-[0_0_15px_hsl(var(--terminal-purple)/0.3)]"
        } ${isExpanded ? "scale-110" : ""}`}>
          {isWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
        </div>
      </div>

      {/* Card */}
      <div className={`md:w-[calc(50%-40px)] ${isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"} ml-16 md:ml-0`}>
        <div
          onClick={onToggle}
          className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
            isExpanded ? "ring-1" : "ring-0"
          } ${
            isWork ? "ring-terminal-blue/30" : "ring-terminal-purple/30"
          }`}
        >
          {/* Card glow on hover */}
          <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
            isWork
              ? "from-terminal-blue/30 to-terminal-green/20"
              : "from-terminal-purple/30 to-terminal-green/20"
          }`} />

          <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
            {/* Top accent bar */}
            <div className={`h-1 bg-gradient-to-r ${
              isWork
                ? "from-terminal-blue via-terminal-green to-terminal-blue"
                : "from-terminal-purple via-terminal-green to-terminal-purple"
            }`} />

            {/* Header section */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border ${
                      isWork
                        ? "text-terminal-blue bg-terminal-blue/10 border-terminal-blue/20"
                        : "text-terminal-purple bg-terminal-purple/10 border-terminal-purple/20"
                    }`}>
                      {item.type}
                    </span>
                    {item.gpa && (
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-terminal-green/10 border border-terminal-green/20 text-terminal-green">
                        GPA: {item.gpa}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold group-hover:text-terminal-green transition-colors duration-300">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3 h-3 text-terminal-green/70" />
                      <span className="text-xs">{item.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3 h-3 text-terminal-green/70" />
                      <span className="text-xs font-mono">{item.period}</span>
                    </div>
                  </div>
                </div>

                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1 flex-shrink-0 ${
                  isExpanded ? "rotate-180" : ""
                }`} />
              </div>
            </div>

            {/* Expandable content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
              <div className="px-5 pb-5 border-t border-border/30">
                {/* Description */}
                <ul className="mt-4 space-y-2">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="text-terminal-green mt-1 text-xs">▹</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-mono border transition-colors duration-300 ${
                        isWork
                          ? "bg-terminal-blue/5 border-terminal-blue/20 text-terminal-blue hover:bg-terminal-blue/10"
                          : "bg-terminal-purple/5 border-terminal-purple/20 text-terminal-purple hover:bg-terminal-purple/10"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
