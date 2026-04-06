import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { DartCodeBlock } from "@/lib/dartHighlighter";
import { Github, Linkedin, Music, Play, MapPin, Mail, Code2 } from "lucide-react";
import profileImage from "@/assets/profile-sandip.jpg";

const aboutCode = `class SandipBhandari extends StatelessWidget {
  final String name = 'Sandip Bhandari';
  final String title = 'Mobile & Web Developer';
  final String email = 'bhandarisandip882@gmail.com';
  final String location = 'Nepal 🇳🇵';

  bool get isAvailable => true;

  String get bio =>
    'Passionate developer working with mobile '
    'and web technologies. Specializing in '
    'Android development, RESTful APIs, and '
    'building modern applications.';
}`;

const skillsCode = `// my_skills.dart
abstract class SkillSet {
  List<String> get languages =>
    ['Dart', 'Java', 'PHP', 'Python', 'JavaScript'];

  List<String> get frameworks =>
    ['Flutter', 'Laravel', 'Django', 'React'];

  List<String> get cloud =>
    ['Firebase', 'AWS', 'Docker'];

  List<String> get databases =>
    ['PostgreSQL', 'MySQL', 'Redis'];
}`;

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);

  const spotifyPlaylists = [
    { id: 1, name: "Coding Flow", tracks: 45, coverUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop" },
    { id: 2, name: "Chill Vibes", tracks: 32, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
    { id: 3, name: "Workout Energy", tracks: 28, coverUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" },
    { id: 4, name: "Late Night", tracks: 38, coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto w-full animate-fade-in">
          {/* Top: Profile Card */}
          <div className="relative mb-6">
            <div className="flex items-center gap-6 p-6 bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-terminal-green to-terminal-purple opacity-60 blur-sm animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-terminal-green">
                  <img src={profileImage} alt="Sandip Bhandari" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-terminal-green rounded-full flex items-center justify-center border-2 border-background">
                  <div className="w-2 h-2 bg-background rounded-full" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-terminal-green to-terminal-purple bg-clip-text text-transparent">
                  Sandip Bhandari
                </h1>
                <p className="text-sm font-mono text-terminal-cyan mt-0.5">Android & API Developer</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-terminal-orange" /> Nepal</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-terminal-pink" /> bhandarisandip882@gmail.com</span>
                  <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-terminal-green" /> Available for work</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                <a href="https://github.com/sandipbhandari07" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-terminal-green/20 hover:border-terminal-green/50 hover:text-terminal-green transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/sandipbhandari07/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-terminal-purple/20 hover:border-terminal-purple/50 hover:text-terminal-purple transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom: Code blocks + Spotify */}
          <div className="grid lg:grid-cols-[1fr_1fr_320px] gap-5 items-stretch">
            {/* Code block 1 */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-green/15 to-terminal-blue/15 blur-xl" />
              <DartCodeBlock code={aboutCode} fileName="about_me.dart" className="relative h-full" />
            </div>

            {/* Code block 2 */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-terminal-purple/15 to-terminal-cyan/15 blur-xl" />
              <DartCodeBlock code={skillsCode} fileName="my_skills.dart" className="relative h-full" />
            </div>

            {/* Spotify */}
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[hsl(142,76%,36%)] to-terminal-purple opacity-20 blur-sm" />
              <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[hsl(142,76%,36%)] flex items-center justify-center">
                    <Music className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">My Playlists</h2>
                    <p className="text-[10px] text-muted-foreground font-mono">// via Spotify</p>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1">
                  {spotifyPlaylists.map(playlist => (
                    <a key={playlist.id} href="https://open.spotify.com/user/l74zqsnogdrcza7mxoean84gk" target="_blank" rel="noopener noreferrer"
                      className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-all"
                      onMouseEnter={() => setHoveredPlaylist(playlist.id)}
                      onMouseLeave={() => setHoveredPlaylist(null)}>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={playlist.coverUrl} alt={playlist.name} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${hoveredPlaylist === playlist.id ? 'opacity-100' : 'opacity-0'}`}>
                          <Play className="w-4 h-4 text-[hsl(142,76%,36%)] fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium truncate group-hover/item:text-[hsl(142,76%,36%)] transition-colors">{playlist.name}</h3>
                        <p className="text-[10px] text-muted-foreground">{playlist.tracks} tracks</p>
                      </div>
                    </a>
                  ))}
                </div>
                <a href="https://open.spotify.com/user/l74zqsnogdrcza7mxoean84gk" target="_blank" rel="noopener noreferrer"
                  className="block mt-3 pt-3 border-t border-border/30 text-center text-[10px] text-muted-foreground hover:text-[hsl(142,76%,36%)] transition-colors font-mono">
                  View all on Spotify →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
