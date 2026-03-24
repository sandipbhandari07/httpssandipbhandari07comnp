import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Mail, Phone, Globe, Github, Linkedin, Send, Sparkles, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const contactLinks = [
    { id: "email", icon: Mail, label: "Email", value: "bhandarisandip882@gmail.com", href: "mailto:bhandarisandip882@gmail.com", color: "terminal-green" },
    { id: "phone", icon: Phone, label: "Phone", value: "+977 9860311353", href: "tel:+9779860311353", color: "terminal-purple" },
    { id: "website", icon: Globe, label: "Website", value: "sandipbhandari07.com.np", href: "https://sandipbhandari07.com.np", color: "terminal-blue" },
  ];

  const socialLinks = [
    { id: "github", icon: Github, label: "GitHub", href: "https://github.com/sandipbhandari07", username: "@sandipbhandari07" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sandipbhandari07/", username: "Sandip Bhandari" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main CTA */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="w-6 h-6 text-[hsl(var(--terminal-green))] animate-pulse" />
                  <div className="absolute inset-0 blur-lg bg-[hsl(var(--terminal-green))] opacity-50" />
                </div>
                <span className="text-sm font-mono text-muted-foreground">Let's Connect</span>
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-[hsl(var(--terminal-green))] to-foreground bg-clip-text text-transparent">
                    Get In Touch
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-md">
                  Have a project in mind or just want to say hello? I'd love to hear from you.
                </p>
              </div>

              {/* Primary CTA */}
              <a
                href="mailto:bhandarisandip882@gmail.com"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-[hsl(var(--terminal-green))]/10 border border-[hsl(var(--terminal-green))]/50 rounded-xl hover:bg-[hsl(var(--terminal-green))]/20 hover:border-[hsl(var(--terminal-green))] transition-all"
              >
                <Send className="w-5 h-5 text-[hsl(var(--terminal-green))] group-hover:translate-x-1 transition-transform" />
                <span className="text-[hsl(var(--terminal-green))] font-mono">Send me an email</span>
                <ArrowUpRight className="w-4 h-4 text-[hsl(var(--terminal-green))] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[hsl(var(--terminal-green))] to-[hsl(var(--terminal-purple))] opacity-0 blur-sm transition-opacity ${hoveredLink === link.id ? 'opacity-60' : ''}`} />
                    <div className="relative flex items-center gap-3 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl hover:border-[hsl(var(--terminal-green))]/50 transition-all">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--terminal-green))] transition-colors" />
                      <div className="hidden sm:block">
                        <p className="text-xs text-muted-foreground">{link.label}</p>
                        <p className="text-sm font-mono group-hover:text-[hsl(var(--terminal-green))] transition-colors">{link.username}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Contact Cards */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {contactLinks.map((contact, index) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target={contact.id === "website" ? "_blank" : undefined}
                  rel={contact.id === "website" ? "noopener noreferrer" : undefined}
                  className="group relative block"
                  onMouseEnter={() => setHoveredLink(contact.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[hsl(var(--${contact.color}))] to-[hsl(var(--terminal-green))] opacity-0 blur-sm transition-opacity duration-500 ${hoveredLink === contact.id ? 'opacity-50' : ''}`} />

                  {/* Card */}
                  <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-5 hover:border-[hsl(var(--terminal-green))]/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-[hsl(var(--${contact.color}))]/10 border border-[hsl(var(--${contact.color}))]/30 flex items-center justify-center`}>
                        <contact.icon className={`w-5 h-5 text-[hsl(var(--${contact.color}))]`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">{contact.label}</p>
                        <p className="text-sm md:text-base font-medium group-hover:text-[hsl(var(--terminal-green))] transition-colors">
                          {contact.value}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--terminal-green))] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}

              {/* Status Card */}
              <div className="relative mt-6">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[hsl(var(--terminal-green))] via-[hsl(var(--terminal-purple))] to-[hsl(var(--terminal-green))] opacity-30 blur-sm" />
                <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--terminal-green))]" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[hsl(var(--terminal-green))] animate-ping opacity-75" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Available for opportunities</p>
                      <p className="text-xs text-muted-foreground">Typically responds within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
