import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { Mail, Phone, Globe, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";

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

const statusCode = `// status.dart
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
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Dart code blocks */}
            <div className="space-y-4 animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-green to-terminal-blue opacity-15 blur-xl" />
                <DartCodeBlock code={contactCode} fileName="contact.dart" className="relative" />
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-purple to-terminal-green opacity-15 blur-xl" />
                <DartCodeBlock code={statusCode} fileName="status.dart" className="relative" />
              </div>
            </div>

            {/* Right: Contact Cards */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Primary CTA */}
              <a href="mailto:bhandarisandip882@gmail.com"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-terminal-green/10 border border-terminal-green/50 rounded-xl hover:bg-terminal-green/20 hover:border-terminal-green transition-all w-full">
                <Send className="w-5 h-5 text-terminal-green group-hover:translate-x-1 transition-transform" />
                <span className="text-terminal-green font-mono">sendMessage()</span>
                <ArrowUpRight className="w-4 h-4 text-terminal-green opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </a>

              {/* Contact cards */}
              {contactLinks.map((contact) => (
                <a key={contact.id} href={contact.href}
                  target={contact.id === "website" ? "_blank" : undefined}
                  rel={contact.id === "website" ? "noopener noreferrer" : undefined}
                  className="group relative block"
                  onMouseEnter={() => setHoveredLink(contact.id)}
                  onMouseLeave={() => setHoveredLink(null)}>
                  <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-${contact.color} to-terminal-green opacity-0 blur-sm transition-opacity duration-500 ${hoveredLink === contact.id ? 'opacity-50' : ''}`} />
                  <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-4 hover:border-terminal-green/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-${contact.color}/10 border border-${contact.color}/30 flex items-center justify-center`}>
                        <contact.icon className={`w-4 h-4 text-${contact.color}`} />
                      </div>
                      <div className="flex-1 font-mono">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{contact.label}</p>
                        <p className="text-sm group-hover:text-terminal-green transition-colors">{contact.value}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-terminal-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="group relative flex-1"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-terminal-green to-terminal-purple opacity-0 blur-sm transition-opacity ${hoveredLink === link.id ? 'opacity-60' : ''}`} />
                    <div className="relative flex items-center gap-3 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl hover:border-terminal-green/50 transition-all">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-terminal-green transition-colors" />
                      <div>
                        <p className="text-xs text-muted-foreground">{link.label}</p>
                        <p className="text-sm font-mono group-hover:text-terminal-green transition-colors">{link.username}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
