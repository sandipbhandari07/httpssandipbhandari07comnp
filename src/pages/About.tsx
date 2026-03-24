import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Github, Linkedin, Mail, MapPin, Music, Play, Code2, Database, Cloud, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile-sandip.jpg";
const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);
  const spotifyPlaylists = [{
    id: 1,
    name: "Coding Flow",
    tracks: 45,
    coverUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop"
  }, {
    id: 2,
    name: "Chill Vibes",
    tracks: 32,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  }, {
    id: 3,
    name: "Workout Energy",
    tracks: 28,
    coverUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
  }, {
    id: 4,
    name: "Late Night",
    tracks: 38,
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
  }];
  const skills = [{
    category: "Languages",
    icon: Code2,
    items: ["TypeScript", "Python", "Go", "JavaScript", "Dart"]
  }, {
    category: "Backend",
    icon: Database,
    items: ["Node.js", "PostgreSQL", "Redis", "Django"]
  }, {
    category: "Cloud",
    icon: Cloud,
    items: ["AWS", "Docker", "Kubernetes"]
  }, {
    category: "Frontend",
    icon: Sparkles,
    items: ["React", "Flutter", "Tailwind CSS"]
  }];
  return <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="h-screen flex items-center px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1fr_320px] gap-8 h-full">
          
          {/* Left Side - Profile & Skills Combined */}
          <div className="flex flex-col justify-center gap-6 animate-fade-in">
            {/* Profile Section */}
            <div className="flex items-start gap-6">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[hsl(var(--terminal-green))] to-[hsl(var(--terminal-purple))] opacity-60 blur-sm animate-pulse" />
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[hsl(var(--terminal-green))]">
                  <img src={profileImage} alt="Sandip Bhandari" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[hsl(var(--terminal-green))] rounded-full flex items-center justify-center border-2 border-background">
                  <div className="w-2 h-2 bg-background rounded-full" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-[hsl(var(--terminal-green))] to-foreground bg-clip-text text-transparent">
                  Sandip Bhandari
                </h1>
                <p className="text-base text-[hsl(var(--terminal-purple))] font-mono mt-1">  Android &amp; API  Dev  </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Building scalable systems and creating impactful digital experiences with modern technologies.
                </p>
                
                {/* Contact & Social Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="font-mono text-xs">bhandarisandip882@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono text-xs">Nepal</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(var(--terminal-green))]/10 border border-[hsl(var(--terminal-green))]/30 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--terminal-green))] animate-pulse" />
                    <span className="text-xs font-mono text-[hsl(var(--terminal-green))]">Available</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a href="https://github.com/sandipbhandari07" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-[hsl(var(--terminal-green))]/20 hover:border-[hsl(var(--terminal-green))]/50 hover:text-[hsl(var(--terminal-green))] transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/sandipbhandari07/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-[hsl(var(--terminal-purple))]/20 hover:border-[hsl(var(--terminal-purple))]/50 hover:text-[hsl(var(--terminal-purple))] transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid - Horizontal Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              {skills.map(skill => <div key={skill.category} className="group relative">
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[hsl(var(--terminal-green))]/20 to-[hsl(var(--terminal-purple))]/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                  <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-[hsl(var(--terminal-green))]/30 transition-all h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-[hsl(var(--terminal-green))]/10 border border-[hsl(var(--terminal-green))]/30 flex items-center justify-center text-[hsl(var(--terminal-green))]">
                        <skill.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{skill.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map(item => <span key={item} className="text-[9px] px-1.5 py-0.5 bg-secondary/50 border border-border/50 rounded font-mono hover:border-[hsl(var(--terminal-green))]/50 hover:text-[hsl(var(--terminal-green))] transition-colors cursor-default">
                          {item}
                        </span>)}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Right Side - Spotify Playlists */}
          <div className="flex flex-col justify-center animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[hsl(142,76%,36%)] to-[hsl(var(--terminal-purple))] opacity-30 blur-sm" />
              
              <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(142,76%,36%)] flex items-center justify-center">
                    <Music className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">My Playlists</h2>
                    <p className="text-xs text-muted-foreground font-mono">via Spotify</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {spotifyPlaylists.map(playlist => <a key={playlist.id} href="https://open.spotify.com/user/l74zqsnogdrcza7mxoean84gk" target="_blank" rel="noopener noreferrer" className="group/item flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-all" onMouseEnter={() => setHoveredPlaylist(playlist.id)} onMouseLeave={() => setHoveredPlaylist(null)}>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={playlist.coverUrl} alt={playlist.name} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${hoveredPlaylist === playlist.id ? 'opacity-100' : 'opacity-0'}`}>
                          <Play className="w-5 h-5 text-[hsl(142,76%,36%)] fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate group-hover/item:text-[hsl(142,76%,36%)] transition-colors">
                          {playlist.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {playlist.tracks} tracks
                        </p>
                      </div>
                    </a>)}
                </div>

                <a href="https://open.spotify.com/user/l74zqsnogdrcza7mxoean84gk" target="_blank" rel="noopener noreferrer" className="block mt-4 pt-4 border-t border-border/30 text-center text-xs text-muted-foreground hover:text-[hsl(142,76%,36%)] transition-colors font-mono">
                  View all on Spotify →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default About;