import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "HOME", path: "/" },
  { number: "02", label: "PROJECTS", path: "/work" },
  { number: "03", label: "ABOUT", path: "/about" },
  { number: "04", label: "TIMELINE", path: "/timeline" },
  { number: "05", label: "CONTACT", path: "/contact" },
  { number: "06", label: "GAMING", path: "/gaming" },
  { number: "07", label: "TERMINAL", path: "/terminal" },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg animate-fade-in">
      <div className="absolute top-8 right-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-transparent"
        >
          <X className="w-8 h-8" />
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <nav className="space-y-8">
          {menuItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="flex items-baseline gap-6 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-sm text-muted-foreground">{item.number}</span>
              <span className="text-6xl font-bold tracking-wider text-foreground group-hover:text-muted-foreground transition-colors">
                {item.label}
              </span>
            </button>
          ))}

          <div className="flex gap-6 pt-8 pl-16 text-sm">
            <a
              href="https://github.com/sandipbhandari07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ↗ github
            </a>
            <a
              href="mailto:bhandarisandip882@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ↗ email
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;
