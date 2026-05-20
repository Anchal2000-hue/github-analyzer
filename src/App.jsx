import { useState } from "react";
import SearchView from "./views/SearchView";
import ResultView from "./views/ResultView";
import "./styles/app.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">GitInsight</span>
          </div>
          {data && (
            <button className="back-btn" onClick={() => { setData(null); setError(""); }}>
              ← New Search
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {!data ? (
          <SearchView
            loading={loading}
            error={error}
            onSearch={async (username) => {
              setLoading(true);
              setError("");
              try {
                const { fetchUser, fetchRepos, fetchEvents, calcLanguages, calcActivity, getPersonality } = await import("./utils/github.js");
                const [user, repos, events] = await Promise.all([
                  fetchUser(username),
                  fetchRepos(username),
                  fetchEvents(username),
                ]);
                const languages = calcLanguages(repos);
                const activity = calcActivity(events);
                const personality = getPersonality(user, repos, languages);
                setData({ user, repos, languages, activity, personality });
              } catch (e) {
                setError(e.message || "Something went wrong");
              } finally {
                setLoading(false);
              }
            }}
          />
        ) : (
          <ResultView data={data} />
        )}
      </main>

      <footer className="app-footer">
        <span>Built with GitHub API · No auth required · Open source</span>
      </footer>
    </div>
  );
}
