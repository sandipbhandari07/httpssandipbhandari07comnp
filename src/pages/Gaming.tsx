import { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BlobBackground from "@/components/BlobBackground";
import { Gamepad2, Swords, Target, Trophy, TrendingUp, Shield, Map, Crosshair, RefreshCw, Clock, Award, Star, Zap } from "lucide-react";
import { useOpenDota } from "@/hooks/useOpenDota";

// ─── Valorant Data (Static - API requires auth key) ───
const valorantProfile = {
  username: "S Bhandari #NOTAP",
  currentRank: "Gold 3",
  peakRank: "Platinum 1",
  peakAct: "V26: ACT II",
  team: "PULUKISI #1145",
  region: "South Asia : Advanced 5 : #172",
  stats: {
    matches: 281,
    playtime: "165h",
    winRate: "48.8%",
    kd: "1.01",
    headshot: "17.1%",
    kills: "4,345",
    deaths: "4,284",
    assists: "1,764",
    acs: "212.6",
    clutches: 74,
    flawless: 240,
    damageRound: "136.8",
  },
  topAgents: [
    { name: "Chamber", matches: 49, winRate: "42.9%", kd: "1.05", acs: "204.4", hours: "28h", role: "Sentinel" },
    { name: "Sage", matches: 39, winRate: "53.8%", kd: "1.04", acs: "208.6", hours: "23h", role: "Sentinel" },
    { name: "Yoru", matches: 36, winRate: "50.0%", kd: "0.96", acs: "211.8", hours: "21h", role: "Duelist" },
  ],
  topWeapons: [
    { name: "Vandal", kills: 1717, hs: "26%" },
    { name: "Phantom", kills: 689, hs: "26%" },
    { name: "Spectre", kills: 417, hs: "19%" },
  ],
  topMaps: [
    { name: "Fracture", winRate: "66.7%", record: "4W - 2L" },
    { name: "Split", winRate: "60.7%", record: "17W - 11L" },
    { name: "Haven", winRate: "56.4%", record: "22W - 17L" },
    { name: "Breeze", winRate: "50.0%", record: "10W - 10L" },
    { name: "Pearl", winRate: "48.8%", record: "21W - 21L" },
  ],
  recentMatches: [
    { agent: "Miks", map: "Breeze", score: "5:13", kd: "1.1", kda: "15/14/7", acs: "230", result: "Lost", ago: "19h ago" },
    { agent: "Chamber", map: "Lotus", score: "9:13", kd: "0.9", kda: "12/13/0", acs: "160", result: "Lost", ago: "4d ago" },
    { agent: "Skye", map: "Split", score: "9:13", kd: "1.3", kda: "20/15/7", acs: "265", result: "Lost", ago: "5d ago" },
    { agent: "Miks", map: "Breeze", score: "13:11", kd: "1.4", kda: "23/17/14", acs: "249", result: "Won", ago: "5d ago" },
    { agent: "Gekko", map: "Bind", score: "13:7", kd: "1.3", kda: "16/12/6", acs: "241", result: "Won", ago: "5d ago" },
  ],
};

const Gaming = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"dota" | "valorant">("valorant");
  const { profile: dotaProfile, loading: dotaLoading, lastUpdated, error: dotaError, refetch, getRankName } = useOpenDota();

  // Compute Dota 2 achievements from live data
  const dotaAchievements = dotaProfile ? [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      title: "Battle Veteran",
      desc: `${dotaProfile.totalMatches} total matches played`,
      unlocked: dotaProfile.totalMatches >= 100,
    },
    {
      icon: <Star className="w-5 h-5 text-terminal-cyan" />,
      title: "Win Streak Hunter",
      desc: `${dotaProfile.wins} victories achieved`,
      unlocked: dotaProfile.wins >= 100,
    },
    {
      icon: <Zap className="w-5 h-5 text-terminal-green" />,
      title: "Hero Explorer",
      desc: `${dotaProfile.topHeroes.length}+ heroes mastered`,
      unlocked: dotaProfile.topHeroes.length >= 5,
    },
    {
      icon: <Award className="w-5 h-5 text-terminal-purple" />,
      title: "Ranked Warrior",
      desc: `Achieved ${getRankName(dotaProfile.rank)}`,
      unlocked: !!dotaProfile.rank,
    },
    {
      icon: <Target className="w-5 h-5 text-red-400" />,
      title: "Slayer",
      desc: (() => {
        const totalKills = dotaProfile.recentMatches.reduce((s, m) => s + m.kills, 0);
        return `${totalKills} kills in last ${dotaProfile.recentMatches.length} matches`;
      })(),
      unlocked: true,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlobBackground />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="w-6 h-6 text-terminal-green" />
            <span className="font-mono text-sm text-terminal-green">~/gaming-profiles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Game <span className="text-terminal-green">Profiles</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-8">
            // When I'm not coding, I'm fragging. Data refreshes every 5 minutes.
          </p>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("valorant")}
              className={`px-6 py-3 rounded-xl font-mono text-sm border transition-all ${
                activeTab === "valorant"
                  ? "bg-red-500/20 border-red-500/60 text-red-400 shadow-[0_0_15px_hsl(0_70%_50%/0.15)]"
                  : "bg-card/40 border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                VALORANT
              </span>
            </button>
            <button
              onClick={() => setActiveTab("dota")}
              className={`px-6 py-3 rounded-xl font-mono text-sm border transition-all ${
                activeTab === "dota"
                  ? "bg-terminal-green/20 border-terminal-green/60 text-terminal-green shadow-[0_0_15px_hsl(var(--terminal-green)/0.15)]"
                  : "bg-card/40 border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Swords className="w-4 h-4" />
                DOTA 2
              </span>
            </button>
          </div>

          {/* ─── VALORANT TAB ─── */}
          {activeTab === "valorant" && (
            <div className="space-y-6 animate-fade-in">
              {/* Profile Card */}
              <div className="flex items-center gap-4 bg-card/60 border border-border/50 rounded-xl p-5">
                <img
                  src="https://titles.trackercdn.com/valorant-api/playercards/6bfb3fca-49dc-e129-d85e-10a162dd4d3f/displayicon.png"
                  alt="Valorant Avatar"
                  className="w-16 h-16 rounded-xl border-2 border-red-500/40 object-cover"
                />
                <div>
                  <p className="text-xl font-bold">{valorantProfile.username}</p>
                  <p className="text-sm text-muted-foreground font-mono">Competitive Player • {valorantProfile.stats.playtime} Playtime</p>
                </div>
              </div>

              {/* Profile Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span className="font-mono text-sm text-muted-foreground">Current Rank</span>
                  </div>
                  <p className="text-2xl font-bold text-red-400">{valorantProfile.currentRank}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">Level 58</p>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-terminal-cyan" />
                    <span className="font-mono text-sm text-muted-foreground">Peak Rank</span>
                  </div>
                  <p className="text-2xl font-bold text-terminal-cyan">{valorantProfile.peakRank}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{valorantProfile.peakAct}</p>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="font-mono text-sm text-muted-foreground">Premier Team</span>
                  </div>
                  <p className="text-lg font-bold text-yellow-400">{valorantProfile.team}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{valorantProfile.region}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "K/D", value: valorantProfile.stats.kd, color: "text-red-400" },
                  { label: "Win Rate", value: valorantProfile.stats.winRate, color: "text-terminal-green" },
                  { label: "HS%", value: valorantProfile.stats.headshot, color: "text-terminal-cyan" },
                  { label: "ACS", value: valorantProfile.stats.acs, color: "text-terminal-purple" },
                  { label: "Kills", value: valorantProfile.stats.kills, color: "text-red-400" },
                  { label: "Matches", value: valorantProfile.stats.matches, color: "text-terminal-green" },
                  { label: "Clutches", value: valorantProfile.stats.clutches, color: "text-yellow-400" },
                  { label: "Flawless", value: valorantProfile.stats.flawless, color: "text-terminal-cyan" },
                ].map((s) => (
                  <div key={s.label} className="bg-card/40 border border-border/40 rounded-lg p-3 text-center">
                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground font-mono">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Top Agents & Weapons */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                  <h3 className="font-mono text-sm text-red-400 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Top Agents
                  </h3>
                  <div className="space-y-3">
                    {valorantProfile.topAgents.map((a) => (
                      <div key={a.name} className="flex items-center justify-between bg-background/40 rounded-lg px-3 py-2.5">
                        <div>
                          <span className="font-semibold text-sm">{a.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({a.role})</span>
                        </div>
                        <div className="flex gap-4 text-xs font-mono">
                          <span>{a.matches} games</span>
                          <span className="text-terminal-green">{a.winRate} WR</span>
                          <span className="text-terminal-cyan">{a.kd} K/D</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                  <h3 className="font-mono text-sm text-red-400 mb-4 flex items-center gap-2">
                    <Crosshair className="w-4 h-4" /> Top Weapons
                  </h3>
                  <div className="space-y-3">
                    {valorantProfile.topWeapons.map((w) => (
                      <div key={w.name} className="flex items-center justify-between bg-background/40 rounded-lg px-3 py-2.5">
                        <span className="font-semibold text-sm">{w.name}</span>
                        <div className="flex gap-4 text-xs font-mono">
                          <span className="text-red-400">{w.kills} kills</span>
                          <span className="text-terminal-cyan">{w.hs} HS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Maps */}
              <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                <h3 className="font-mono text-sm text-red-400 mb-4 flex items-center gap-2">
                  <Map className="w-4 h-4" /> Top Maps
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {valorantProfile.topMaps.map((m) => (
                    <div key={m.name} className="bg-background/40 rounded-lg p-3 text-center">
                      <p className="font-semibold text-sm mb-1">{m.name}</p>
                      <p className="text-terminal-green text-lg font-bold">{m.winRate}</p>
                      <p className="text-xs text-muted-foreground font-mono">{m.record}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Matches */}
              <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                <h3 className="font-mono text-sm text-red-400 mb-4 flex items-center gap-2">
                  <Swords className="w-4 h-4" /> Latest 5 Matches (Competitive)
                </h3>
                <div className="space-y-2">
                  {valorantProfile.recentMatches.map((m, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 border ${
                        m.result === "Won"
                          ? "bg-terminal-green/5 border-terminal-green/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold w-10 ${m.result === "Won" ? "text-terminal-green" : "text-red-400"}`}>
                          {m.result === "Won" ? "WIN" : "LOSS"}
                        </span>
                        <span className="font-semibold text-sm w-20">{m.agent}</span>
                        <span className="text-xs text-muted-foreground w-16">{m.map}</span>
                      </div>
                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-foreground font-bold">{m.score}</span>
                        <span className="text-muted-foreground">{m.kda}</span>
                        <span className="text-terminal-cyan">{m.kd} K/D</span>
                        <span className="text-muted-foreground hidden sm:inline">{m.ago}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://tracker.gg/valorant/profile/riot/S%20Bhandari%23NOTAP/overview?playlist=competitive&platform=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 font-mono text-sm hover:bg-red-500/20 transition-all"
                >
                  ↗ View Full Profile on Tracker.gg
                </a>
              </div>
            </div>
          )}

          {/* ─── DOTA 2 TAB ─── */}
          {activeTab === "dota" && (
            <div className="space-y-6 animate-fade-in">
              {/* Live Status Bar */}
              <div className="flex items-center justify-between bg-terminal-green/5 border border-terminal-green/20 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                  <span className="font-mono text-xs text-terminal-green">LIVE DATA • OpenDota API</span>
                </div>
                <div className="flex items-center gap-3">
                  {lastUpdated && (
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                  <button
                    onClick={refetch}
                    className="text-terminal-green hover:text-terminal-green/80 transition-colors"
                    title="Refresh now"
                  >
                    <RefreshCw className={`w-4 h-4 ${dotaLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>

              {dotaError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 font-mono text-sm">
                  {dotaError} — showing cached data
                </div>
              )}

              {dotaLoading && !dotaProfile ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <RefreshCw className="w-8 h-8 text-terminal-green animate-spin" />
                  <p className="font-mono text-sm text-muted-foreground">Fetching live data from OpenDota...</p>
                </div>
              ) : dotaProfile ? (
                <>
                  {/* Profile Card */}
                  <div className="flex items-center gap-4 bg-card/60 border border-border/50 rounded-xl p-5">
                    <img
                      src={dotaProfile.avatar}
                      alt="Dota 2 Avatar"
                      className="w-16 h-16 rounded-xl border-2 border-terminal-green/40 object-cover"
                    />
                    <div>
                      <p className="text-xl font-bold">{dotaProfile.username}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Dota 2 Player • {getRankName(dotaProfile.rank)}
                      </p>
                    </div>
                  </div>

                  {/* Stats Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-terminal-green" />
                        <span className="font-mono text-sm text-muted-foreground">Rank</span>
                      </div>
                      <p className="text-2xl font-bold text-terminal-green">{getRankName(dotaProfile.rank)}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">@{dotaProfile.username}</p>
                    </div>
                    <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="font-mono text-sm text-muted-foreground">Record</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-400">{dotaProfile.wins}W - {dotaProfile.losses}L</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">{dotaProfile.winRate} Win Rate</p>
                    </div>
                    <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-5 h-5 text-terminal-cyan" />
                        <span className="font-mono text-sm text-muted-foreground">Total Matches</span>
                      </div>
                      <p className="text-2xl font-bold text-terminal-cyan">{dotaProfile.totalMatches}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">Lifetime games</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                    <h3 className="font-mono text-sm text-yellow-400 mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {dotaAchievements.map((a, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 border transition-all ${
                            a.unlocked
                              ? "bg-yellow-400/5 border-yellow-400/20"
                              : "bg-card/20 border-border/30 opacity-50"
                          }`}
                        >
                          <div className={`flex-shrink-0 ${!a.unlocked ? "grayscale" : ""}`}>
                            {a.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{a.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">{a.desc}</p>
                          </div>
                          {a.unlocked && (
                            <span className="ml-auto text-xs text-yellow-400 font-mono">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Heroes */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                    <h3 className="font-mono text-sm text-terminal-green mb-4 flex items-center gap-2">
                      <Swords className="w-4 h-4" /> Most Played Heroes
                    </h3>
                    <div className="space-y-2">
                      {dotaProfile.topHeroes.map((h) => (
                        <div key={h.heroName} className="flex items-center justify-between bg-background/40 rounded-lg px-4 py-3">
                          <span className="font-semibold text-sm">{h.heroName}</span>
                          <div className="flex gap-4 font-mono text-xs">
                            <span className="text-muted-foreground">{h.games} games</span>
                            <span className="text-terminal-green">{h.winRate} WR</span>
                            <span className="text-terminal-cyan">{h.wins}W</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Matches - Now shows up to 10 */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-5">
                    <h3 className="font-mono text-sm text-terminal-green mb-4 flex items-center gap-2">
                      <Swords className="w-4 h-4" /> Recent Matches (Live)
                    </h3>
                    <div className="space-y-2">
                      {dotaProfile.recentMatches.map((m) => (
                        <a
                          key={m.match_id}
                          href={`https://www.dotabuff.com/matches/${m.match_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between rounded-lg px-4 py-3 border hover:brightness-110 transition-all ${
                            m.result === "Won"
                              ? "bg-terminal-green/5 border-terminal-green/20"
                              : "bg-red-500/5 border-red-500/20"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-bold w-10 ${m.result === "Won" ? "text-terminal-green" : "text-red-400"}`}>
                              {m.result === "Won" ? "WIN" : "LOSS"}
                            </span>
                            <span className="font-semibold text-sm w-32 truncate">{m.heroName}</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">{m.gameMode}</span>
                          </div>
                          <div className="flex items-center gap-4 font-mono text-xs">
                            <span className="text-foreground font-bold">{m.kills}/{m.deaths}/{m.assists}</span>
                            <span className="text-muted-foreground">{Math.floor(m.duration / 60)}:{(m.duration % 60).toString().padStart(2, "0")}</span>
                            <span className="text-muted-foreground hidden sm:inline">{m.ago}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://www.dotabuff.com/players/1172803135"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-terminal-green/10 border border-terminal-green/40 rounded-xl text-terminal-green font-mono text-sm hover:bg-terminal-green/20 transition-all"
                    >
                      ↗ View Full Profile on Dotabuff
                    </a>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gaming;
