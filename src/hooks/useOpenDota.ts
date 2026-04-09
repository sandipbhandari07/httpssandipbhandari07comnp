import { useState, useEffect, useCallback } from "react";

const ACCOUNT_ID = 1172803135;
const BASE_URL = "https://api.opendota.com/api";
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Hero ID → Name mapping (Dota 2)
const HERO_NAMES: Record<number, string> = {
  1:"Anti-Mage",2:"Axe",3:"Bane",4:"Bloodseeker",5:"Crystal Maiden",6:"Drow Ranger",
  7:"Earthshaker",8:"Juggernaut",9:"Mirana",10:"Morphling",11:"Shadow Fiend",
  12:"Phantom Lancer",13:"Puck",14:"Pudge",15:"Razor",16:"Sand King",17:"Storm Spirit",
  18:"Sven",19:"Tiny",20:"Vengeful Spirit",21:"Windranger",22:"Zeus",23:"Kunkka",
  25:"Lina",26:"Lion",27:"Shadow Shaman",28:"Slardar",29:"Tidehunter",30:"Witch Doctor",
  31:"Lich",32:"Riki",33:"Enigma",34:"Tinker",35:"Sniper",36:"Necrophos",
  37:"Warlock",38:"Beastmaster",39:"Queen of Pain",40:"Venomancer",41:"Faceless Void",
  42:"Wraith King",43:"Death Prophet",44:"Phantom Assassin",45:"Pugna",46:"Templar Assassin",
  47:"Viper",48:"Luna",49:"Dragon Knight",50:"Dazzle",51:"Clockwerk",52:"Leshrac",
  53:"Nature's Prophet",54:"Lifestealer",55:"Dark Seer",56:"Clinkz",57:"Omniknight",
  58:"Enchantress",59:"Huskar",60:"Night Stalker",61:"Broodmother",62:"Bounty Hunter",
  63:"Weaver",64:"Jakiro",65:"Batrider",66:"Chen",67:"Spectre",68:"Ancient Apparition",
  69:"Doom",70:"Ursa",71:"Spirit Breaker",72:"Gyrocopter",73:"Alchemist",74:"Invoker",
  75:"Silencer",76:"Outworld Destroyer",77:"Lycan",78:"Brewmaster",79:"Shadow Demon",
  80:"Lone Druid",81:"Chaos Knight",82:"Meepo",83:"Treant Protector",84:"Ogre Magi",
  85:"Undying",86:"Rubick",87:"Disruptor",88:"Nyx Assassin",89:"Naga Siren",
  90:"Keeper of the Light",91:"Io",92:"Visage",93:"Slark",94:"Medusa",95:"Troll Warlord",
  96:"Centaur Warrunner",97:"Magnus",98:"Timbersaw",99:"Bristleback",100:"Tusk",
  101:"Skywrath Mage",102:"Abaddon",103:"Elder Titan",104:"Legion Commander",
  105:"Techies",106:"Ember Spirit",107:"Earth Spirit",108:"Underlord",109:"Terrorblade",
  110:"Phoenix",111:"Oracle",112:"Winter Wyvern",113:"Arc Warden",114:"Monkey King",
  119:"Dark Willow",120:"Pangolier",121:"Grimstroke",123:"Hoodwink",126:"Void Spirit",
  128:"Snapfire",129:"Mars",131:"Ringmaster",135:"Dawnbreaker",136:"Marci",
  137:"Primal Beast",138:"Muerta",145:"Kez",
};

export interface DotaMatch {
  match_id: number;
  hero_id: number;
  heroName: string;
  kills: number;
  deaths: number;
  assists: number;
  duration: number;
  result: "Won" | "Lost";
  gameMode: string;
  startTime: number;
  ago: string;
}

export interface DotaHeroStat {
  heroName: string;
  games: number;
  wins: number;
  winRate: string;
}

export interface DotaProfile {
  username: string;
  avatar: string;
  rank: number | null;
  wins: number;
  losses: number;
  winRate: string;
  recentMatches: DotaMatch[];
  topHeroes: DotaHeroStat[];
  totalMatches: number;
}

const GAME_MODES: Record<number, string> = {
  0: "Unknown", 1: "All Pick", 2: "Captains Mode", 3: "Random Draft",
  4: "Single Draft", 5: "All Random", 22: "Ranked All Pick", 23: "Turbo",
};

const RANK_NAMES: Record<number, string> = {
  11:"Herald I",12:"Herald II",13:"Herald III",14:"Herald IV",15:"Herald V",
  21:"Guardian I",22:"Guardian II",23:"Guardian III",24:"Guardian IV",25:"Guardian V",
  31:"Crusader I",32:"Crusader II",33:"Crusader III",34:"Crusader IV",35:"Crusader V",
  41:"Archon I",42:"Archon II",43:"Archon III",44:"Archon IV",45:"Archon V",
  51:"Legend I",52:"Legend II",53:"Legend III",54:"Legend IV",55:"Legend V",
  61:"Ancient I",62:"Ancient II",63:"Ancient III",64:"Ancient IV",65:"Ancient V",
  71:"Divine I",72:"Divine II",73:"Divine III",74:"Divine IV",75:"Divine V",
  80:"Immortal",
};

function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function useOpenDota() {
  const [profile, setProfile] = useState<DotaProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [playerRes, wlRes, matchesRes, heroesRes] = await Promise.all([
        fetch(`${BASE_URL}/players/${ACCOUNT_ID}`),
        fetch(`${BASE_URL}/players/${ACCOUNT_ID}/wl`),
        fetch(`${BASE_URL}/players/${ACCOUNT_ID}/recentMatches`),
        fetch(`${BASE_URL}/players/${ACCOUNT_ID}/heroes`),
      ]);

      const [player, wl, matches, heroes] = await Promise.all([
        playerRes.json(), wlRes.json(), matchesRes.json(), heroesRes.json(),
      ]);

      const recentMatches: DotaMatch[] = matches.slice(0, 10).map((m: any) => {
        const isRadiant = m.player_slot < 128;
        const won = isRadiant === m.radiant_win;
        return {
          match_id: m.match_id,
          hero_id: m.hero_id,
          heroName: HERO_NAMES[m.hero_id] || `Hero ${m.hero_id}`,
          kills: m.kills,
          deaths: m.deaths,
          assists: m.assists,
          duration: m.duration,
          result: won ? "Won" : "Lost",
          gameMode: GAME_MODES[m.game_mode] || "Other",
          startTime: m.start_time,
          ago: timeAgo(m.start_time),
        };
      });

      const playedHeroes = heroes
        .filter((h: any) => h.games > 0)
        .sort((a: any, b: any) => b.games - a.games)
        .slice(0, 8)
        .map((h: any) => ({
          heroName: HERO_NAMES[h.hero_id] || `Hero ${h.hero_id}`,
          games: h.games,
          wins: h.win,
          winRate: h.games > 0 ? ((h.win / h.games) * 100).toFixed(1) + "%" : "0%",
        }));

      const rankTier = player.rank_tier;
      const rankName = rankTier ? (RANK_NAMES[rankTier] || `Rank ${rankTier}`) : "Unranked";

      setProfile({
        username: player.profile?.personaname || "Unknown",
        avatar: player.profile?.avatarfull || "",
        rank: rankTier,
        wins: wl.win,
        losses: wl.lose,
        winRate: wl.win + wl.lose > 0 ? ((wl.win / (wl.win + wl.lose)) * 100).toFixed(2) + "%" : "0%",
        recentMatches,
        topHeroes: playedHeroes,
        totalMatches: wl.win + wl.lose,
      });

      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch Dota 2 data");
      console.error("OpenDota API error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getRankName = (tier: number | null) => {
    if (!tier) return "Unranked";
    return RANK_NAMES[tier] || `Rank ${tier}`;
  };

  return { profile, loading, lastUpdated, error, refetch: fetchData, getRankName };
}
