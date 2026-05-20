export default function StatsRow({ user, repos }) {
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const avgStars = repos.length ? (totalStars / repos.length).toFixed(1) : 0;

  const stats = [
    { label: "Repositories", value: user.public_repos, icon: "📁" },
    { label: "Followers", value: user.followers.toLocaleString(), icon: "👥" },
    { label: "Following", value: user.following, icon: "➡️" },
    { label: "Total Stars", value: totalStars.toLocaleString(), icon: "⭐" },
    { label: "Total Forks", value: totalForks.toLocaleString(), icon: "🍴" },
    { label: "Avg Stars / Repo", value: avgStars, icon: "📊" },
  ];

  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="stat-icon">{s.icon}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
