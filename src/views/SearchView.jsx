import { useState } from "react";
import "../styles/search.css";

const EXAMPLES = ["torvalds", "gaearon", "yyx990803", "sindresorhus", "Anchal2000-hue"];

export default function SearchView({ onSearch, loading, error }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="search-view">
      <div className="search-hero">
        <div className="search-badge">GitHub Profile Analyzer</div>
        <h1 className="search-title">
          Decode any<br />
          <span className="search-title-accent">GitHub profile</span>
        </h1>
        <p className="search-sub">
          Enter a GitHub username to get deep insights — languages, activity,
          top repos, and your developer personality type.
        </p>

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-input-wrap">
            <span className="search-prefix">github.com/</span>
            <input
              className="search-input"
              type="text"
              placeholder="username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </div>
          <button className="search-btn" type="submit" disabled={loading || !input.trim()}>
            {loading ? <span className="search-spinner" /> : "Analyze →"}
          </button>
        </form>

        {error && <div className="search-error">⚠ {error}</div>}

        <div className="search-examples">
          <span className="examples-label">Try:</span>
          {EXAMPLES.map((u) => (
            <button
              key={u}
              className="example-chip"
              onClick={() => { setInput(u); onSearch(u); }}
              disabled={loading}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="search-features">
        {[
          { icon: "📊", title: "Language Breakdown", desc: "See which languages dominate your repos" },
          { icon: "🎯", title: "Personality Type", desc: "Discover what kind of developer you are" },
          { icon: "⭐", title: "Top Repos", desc: "Ranked by stars, forks, and impact" },
          { icon: "📈", title: "Activity Chart", desc: "30-day contribution timeline" },
        ].map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
