import "../styles/components.css";

export default function ProfileCard({ user }) {
  return (
    <div className="card profile-card">
      <div className="profile-top">
        <img className="profile-avatar" src={user.avatar_url} alt={user.login} />
        <div className="profile-info">
          <h2 className="profile-name">{user.name || user.login}</h2>
          <a className="profile-login" href={user.html_url} target="_blank" rel="noopener">
            @{user.login}
          </a>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
      </div>
      <div className="profile-meta">
        {user.company && <span className="meta-item">🏢 {user.company}</span>}
        {user.location && <span className="meta-item">📍 {user.location}</span>}
        {user.blog && (
          <a className="meta-item meta-link" href={user.blog.startsWith("http") ? user.blog : "https://" + user.blog} target="_blank" rel="noopener">
            🔗 {user.blog.replace(/https?:\/\//, "").slice(0, 30)}
          </a>
        )}
        {user.twitter_username && (
          <span className="meta-item">🐦 @{user.twitter_username}</span>
        )}
      </div>
      <div className="profile-joined">
        Joined {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </div>
    </div>
  );
}
