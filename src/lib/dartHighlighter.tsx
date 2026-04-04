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
      keyword: "text-terminal-blue",
      type: "text-terminal-purple",
      annotation: "text-terminal-yellow",
      string: "text-terminal-green",
      comment: "text-muted-foreground italic",
      number: "text-terminal-yellow",
      arrow: "text-terminal-red",
    };

    for (const t of filtered) {
      if (t.start > pos) {
        elements.push(<span key={`${lineIdx}-${pos}`} className="text-foreground/80">{line.slice(pos, t.start)}</span>);
      }
      elements.push(<span key={`${lineIdx}-${t.start}`} className={colorMap[t.type]}>{line.slice(t.start, t.end)}</span>);
      pos = t.end;
    }
    if (pos < line.length) {
      elements.push(<span key={`${lineIdx}-${pos}`} className="text-foreground/80">{line.slice(pos)}</span>);
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
    <div className={`rounded-xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden ${className}`}>
      {/* Code header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-background/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-yellow/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/70" />
        </div>
        <span className="text-[11px] font-mono text-muted-foreground ml-2">{fileName}</span>
      </div>
      {/* Code content */}
      <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
        {highlighted.map((lineElements, i) => (
          <div key={i} className="flex">
            <span className="w-6 text-right mr-4 text-muted-foreground/40 select-none text-xs">{i + 1}</span>
            <span>{lineElements}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
