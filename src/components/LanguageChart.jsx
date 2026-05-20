import { getLangColor } from "../utils/github";

export default function LanguageChart({ languages }) {
  if (!languages.length) return null;

  return (
    <div className="card">
      <div className="card-title">Languages</div>
      <div className="lang-bar">
        {languages.map((l) => (
          <div
            key={l.lang}
            className="lang-bar-segment"
            style={{ width: l.pct + "%", background: getLangColor(l.lang) }}
            title={`${l.lang} ${l.pct}%`}
          />
        ))}
      </div>
      <div className="lang-list">
        {languages.map((l) => (
          <div key={l.lang} className="lang-item">
            <span className="lang-dot" style={{ background: getLangColor(l.lang) }} />
            <span className="lang-name">{l.lang}</span>
            <span className="lang-pct">{l.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
