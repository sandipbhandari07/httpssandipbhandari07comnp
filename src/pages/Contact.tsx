import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { Mail, Phone, Globe, Github, Linkedin, Send, ArrowUpRight, Terminal } from "lucide-react";

const contactCode = `// contact.dart
class ContactInfo {
  final String email = 'bhandarisandip882@gmail.com';
  final String phone = '+977 9860311353';
  final String website = 'sandipbhandari07.com.np';
  
  Map<String, String> get socials => {
    'GitHub': 'github.com/sandipbhandari07',
    'LinkedIn': 'linkedin.com/in/sandipbhandari07',
  };

  Future<void> sendMessage(String msg) async {
    await EmailService.send(
      to: email,
      subject: 'New Inquiry',
      body: msg,
    );
    print('Message sent successfully! ✉️');
  }
}`;

const statusCode = `// availability.dart
class Availability extends ChangeNotifier {
  final bool isAvailable = true;
  final String responseTime = '< 24 hours';
  
  String get currentStatus =>
    '🟢 Open for opportunities';
}`;

const Contact = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const contactLinks = [
    { id: "email", icon: Mail, label: "Email", value: "bhandarisandip882@gmail.com", href: "mailto:bhandarisandip882@gmail.com", color: "terminal-green" },
    { id: "phone", icon: Phone, label: "Phone", value: "+977 9860311353", href: "tel:+9779860311353", color: "terminal-cyan" },
    { id: "website", icon: Globe, label: "Website", value: "sandipbhandari07.com.np", href: "https://sandipbhandari07.com.np", color: "terminal-blue" },
  ];

  const socialLinks = [
    { id: "github", icon: Github, label: "GitHub", href: "https://github.com/sandipbhandari07", username: "@sandipbhandari07", color: "terminal-purple" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sandipbhandari07/", username: "Sandip Bhandari", color: "terminal-blue" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto w-full animate-fade-in">
          {/* Terminal badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card/60 border border-border/50 rounded-full font-mono text-sm">
              <Terminal className="w-3.5 h-3.5 text-terminal-green" />
              <span className="text-muted-foreground">~/sandip-bhandari</span>
              <span className="text-terminal-green">$</span>
              <span className="text-terminal-cyan">dart run contact.dart</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column: Code blocks stacked */}
            <div className="flex flex-col gap-4">
              <div className="relative flex-1">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-green/20 to-terminal-cyan/20 blur-xl" />
                <DartCodeBlock code={contactCode} fileName="contact.dart" className="relative h-full" />
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-purple/20 to-terminal-green/20 blur-xl" />
                <DartCodeBlock code={statusCode} fileName="availability.dart" className="relative h-full" />
              </div>
            </div>

            {/* Right column: Contact info + socials */}
            <div className="flex flex-col gap-4">
              {/* Send message CTA */}
              <a
                href="mailto:bhandarisandip882@gmail.com"
                className="group flex items-center gap-3 px-6 py-4.5 bg-terminal-green/10 border border-terminal-green/50 rounded-xl hover:bg-terminal-green/20 hover:border-terminal-green transition-all hover:shadow-[0_0_20px_hsl(var(--terminal-green)/0.2)]"
              >
                <Send className="w-5 h-5 text-terminal-green group-hover:translate-x-1 transition-transform" />
                <span className="text-terminal-green font-mono text-base">sendMessage()</span>
                <ArrowUpRight className="w-5 h-5 text-terminal-green opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </a>

              {/* Contact cards */}
              {contactLinks.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target={contact.id === "website" ? "_blank" : undefined}
                  rel={contact.id === "website" ? "noopener noreferrer" : undefined}
                  className="group relative block"
                  onMouseEnter={() => setHoveredLink(contact.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-${contact.color} to-terminal-green opacity-0 blur-sm transition-opacity duration-500 ${hoveredLink === contact.id ? 'opacity-50' : ''}`} />
                  <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-5 hover:border-terminal-green/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-${contact.color}/10 border border-${contact.color}/30 flex items-center justify-center`}>
                        <contact.icon className={`w-5 h-5 text-${contact.color}`} />
                      </div>
                      <div className="flex-1 font-mono">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{contact.label}</p>
                        <p className="text-base group-hover:text-terminal-green transition-colors">{contact.value}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-terminal-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}

              {/* Social links row */}
              <div className="grid grid-cols-2 gap-3">
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
                    <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-${link.color} to-terminal-green opacity-0 blur-sm transition-opacity ${hoveredLink === link.id ? 'opacity-60' : ''}`} />
                    <div className="relative flex items-center gap-3 px-5 py-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-terminal-green/50 transition-all">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-terminal-green transition-colors" />
                      <div className="font-mono">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</p>
                        <p className="text-sm group-hover:text-terminal-green transition-colors">{link.username}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Status indicator - matches home page style */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-card/60 border border-border/50 rounded-xl font-mono text-sm">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-terminal-green animate-ping opacity-75" />
                </div>
                <span className="text-muted-foreground">
                  <span className="text-terminal-green">status</span>: <span className="text-terminal-green">'Available for work'</span>
                </span>
                <span className="text-muted-foreground ml-auto">responseTime: <span className="text-terminal-cyan">'&lt; 24h'</span></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
