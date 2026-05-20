import { getLangColor } from "../utils/github";

export default function TopRepos({ repos }) {
  const sorted = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="top-repos">
      <div className="card-title" style={{ marginBottom: "1rem" }}>Top Repositories</div>
      <div className="repos-grid">
        {sorted.map((repo) => (
          <a
            key={repo.id}
            className="repo-card"
            href={repo.html_url}
            target="_blank"
            rel="noopener"
          >
            <div className="repo-top">
              <span className="repo-icon">📦</span>
              <span className="repo-name">{repo.name}</span>
              {repo.fork && <span className="repo-fork-badge">fork</span>}
            </div>
            {repo.description && (
              <p className="repo-desc">{repo.description.slice(0, 90)}{repo.description.length > 90 ? "…" : ""}</p>
            )}
            <div className="repo-bottom">
              {repo.language && (
                <span className="repo-lang">
                  <span className="repo-lang-dot" style={{ background: getLangColor(repo.language) }} />
                  {repo.language}
                </span>
              )}
              <span className="repo-stat">⭐ {repo.stargazers_count}</span>
              <span className="repo-stat">🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
