import React from "react";

export const highlightDart = (code: string) => {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const tokens: { start: number; end: number; type: string }[] = [];

    const findAll = (regex: RegExp, type: string) => {
      let match;
      const r = new RegExp(regex.source, "g");
      while ((match = r.exec(line)) !== null) {
        tokens.push({ start: match.index, end: match.index + match[0].length, type });
      }
    };

    findAll(/(\/\/.*)/, "comment");
    findAll(/(@\w+)/, "annotation");
    findAll(/('[^']*')/, "string");
    findAll(/\b(class|extends|implements|with|final|void|async|await|return|override|get|set|static|const|new|this|super|import|export|if|else|for|while|switch|case|break|try|catch|throw|enum|abstract|mixin)\b/, "keyword");
    findAll(/\b(String|List|DateTime|Future|int|double|bool|Map|Widget|void|dynamic|var)\b/, "type");
    findAll(/(=>)/, "arrow");
    findAll(/\b(\d+\.?\d*)\b/, "number");

    tokens.sort((a, b) => a.start - b.start);

    const filtered: typeof tokens = [];
    let lastEnd = 0;
    for (const t of tokens) {
      if (t.start >= lastEnd) {
        filtered.push(t);
        lastEnd = t.end;
      }
    }

    let pos = 0;
    const elements: React.ReactNode[] = [];
    const colorMap: Record<string, string> = {
      keyword: "text-terminal-pink font-medium",
      type: "text-terminal-cyan",
      annotation: "text-terminal-yellow",
      string: "text-terminal-green",
      comment: "text-muted-foreground/60 italic",
      number: "text-terminal-orange",
      arrow: "text-terminal-pink",
    };

    for (const t of filtered) {
      if (t.start > pos) {
        elements.push(<span key={`${lineIdx}-${pos}`} className="text-foreground/90">{line.slice(pos, t.start)}</span>);
      }
      elements.push(<span key={`${lineIdx}-${t.start}`} className={colorMap[t.type]}>{line.slice(t.start, t.end)}</span>);
      pos = t.end;
    }
    if (pos < line.length) {
      elements.push(<span key={`${lineIdx}-${pos}`} className="text-foreground/90">{line.slice(pos)}</span>);
    }

    return elements;
  });
};

interface DartCodeBlockProps {
  code: string;
  fileName: string;
  className?: string;
}

export const DartCodeBlock = ({ code, fileName, className = "" }: DartCodeBlockProps) => {
  const highlighted = highlightDart(code);
  return (
    <div className={`rounded-xl border border-border/40 bg-code-bg backdrop-blur-xl overflow-hidden shadow-lg shadow-black/20 flex flex-col ${className}`}>
      {/* Code header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-background/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red/80 hover:bg-terminal-red transition-colors" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow/80 hover:bg-terminal-yellow transition-colors" />
          <div className="w-3 h-3 rounded-full bg-terminal-green/80 hover:bg-terminal-green transition-colors" />
        </div>
        <div className="flex items-center gap-2 ml-3 px-3 py-1 rounded-md bg-code-line-highlight/60 border-b-2 border-terminal-blue/60">
          <svg className="w-3 h-3 text-terminal-blue" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.889 4L7.333 12l-3.444 8h4.12l5.444-8-5.444-8H3.89zm8.444 0L15.778 12l-3.445 8h4.12l5.445-8-5.444-8h-4.12z"/>
          </svg>
          <span className="text-xs font-mono text-foreground/70">{fileName}</span>
        </div>
      </div>
      {/* Code content */}
      <div className="p-5 font-mono text-sm leading-[1.8] overflow-x-auto flex-1">
        {highlighted.map((lineElements, i) => (
          <div key={i} className="flex hover:bg-code-line-highlight/40 rounded-sm -mx-2 px-2 transition-colors">
            <span className="w-8 text-right mr-5 text-muted-foreground/30 select-none text-xs leading-[1.8]">{i + 1}</span>
            <span className="flex-1">{lineElements}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
