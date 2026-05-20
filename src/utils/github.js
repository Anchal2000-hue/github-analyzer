const BASE = "https://api.github.com";

export async function fetchUser(username) {
  const res = await fetch(`${BASE}/users/${username}`);
  if (!res.ok) throw new Error(res.status === 404 ? "User not found" : "GitHub API error");
  return res.json();
}

export async function fetchRepos(username) {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export async function fetchEvents(username) {
  const res = await fetch(`${BASE}/users/${username}/events/public?per_page=100`);
  if (!res.ok) return [];
  return res.json();
}

export function calcLanguages(repos) {
  const counts = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([lang, count]) => ({
      lang,
      count,
      pct: Math.round((count / total) * 100),
    }));
}

export function calcActivity(events) {
  const map = {};
  events.forEach((e) => {
    const date = e.created_at?.slice(0, 10);
    if (date) map[date] = (map[date] || 0) + 1;
  });
  // Last 30 days
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, short: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count: map[key] || 0 });
  }
  return days;
}

export function getPersonality(user, repos, languages) {
  const topLang = languages[0]?.lang || "";
  const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const hasPython = languages.some((l) => l.lang === "Python");
  const hasJS = languages.some((l) => ["JavaScript", "TypeScript"].includes(l.lang));
  const hasML = hasPython && repos.some((r) => r.description?.toLowerCase().match(/ml|ai|neural|deep|learning/));

  if (hasML) return { type: "The AI Whisperer", emoji: "🤖", desc: "You speak in tensors and dream in neural networks. ML/AI is your playground.", color: "#d2a8ff" };
  if (stars > 100) return { type: "The Open Source Hero", emoji: "⭐", desc: "Your code has fans. You build things people actually use and star.", color: "#ffa657" };
  if (repos.length > 40) return { type: "The Prolific Builder", emoji: "🏗️", desc: "Quantity meets quality. You ship fast, ship often, and never stop building.", color: "#58a6ff" };
  if (topLang === "Python") return { type: "The Pythonista", emoji: "🐍", desc: "Elegant, powerful, and Pythonic. You automate the world one script at a time.", color: "#3fb950" };
  if (hasJS && hasPython) return { type: "The Full-Stack Ninja", emoji: "⚡", desc: "Frontend, backend, scripts — you do it all. No stack is too tall.", color: "#58a6ff" };
  if (hasJS) return { type: "The Web Craftsman", emoji: "🎨", desc: "You make the web beautiful. Pixels and components are your medium.", color: "#ffa657" };
  if (user.followers > 50) return { type: "The Community Builder", emoji: "🌐", desc: "People follow your work. You inspire others with what you create.", color: "#3fb950" };
  return { type: "The Quiet Architect", emoji: "🏛️", desc: "Methodical, thoughtful, and precise. You build things that last.", color: "#d2a8ff" };
}

export const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  React: "#61dafb", Java: "#b07219", "C++": "#f34b7d", C: "#555555",
  "C#": "#178600", Go: "#00ADD8", Rust: "#dea584", Ruby: "#701516",
  PHP: "#4F5D95", Swift: "#F05138", Kotlin: "#A97BFF", HTML: "#e34c26",
  CSS: "#563d7c", Shell: "#89e051", Dart: "#00B4AB", Vue: "#41b883",
  "Jupyter Notebook": "#DA5B0B",
};

export function getLangColor(lang) {
  return LANG_COLORS[lang] || "#8b949e";
}
