export default function PersonalityCard({ personality }) {
  return (
    <div className="card personality-card" style={{ borderColor: personality.color + "40" }}>
      <div className="card-title">Developer Personality</div>
      <div className="personality-emoji">{personality.emoji}</div>
      <div className="personality-type" style={{ color: personality.color }}>
        {personality.type}
      </div>
      <p className="personality-desc">{personality.desc}</p>
      <div className="personality-badge" style={{ background: personality.color + "20", border: `1px solid ${personality.color}40`, color: personality.color }}>
        {personality.type}
      </div>
    </div>
  );
}
