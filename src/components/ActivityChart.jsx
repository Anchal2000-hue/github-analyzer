import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ActivityChart({ activity }) {
  const max = Math.max(...activity.map((d) => d.count), 1);

  return (
    <div className="card">
      <div className="card-title">30-Day Activity</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={activity} barSize={6} margin={{ top: 4, right: 4, bottom: 4, left: -30 }}>
          <XAxis
            dataKey="short"
            tick={{ fill: "var(--fg3)", fontSize: 9, fontFamily: "var(--mono)" }}
            axisLine={false}
            tickLine={false}
            interval={6}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--fg3)", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 11,
              fontFamily: "var(--mono)",
              color: "var(--fg)",
            }}
            cursor={{ fill: "rgba(88,166,255,0.06)" }}
            formatter={(val) => [val + " events", ""]}
            labelFormatter={(label) => label}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]}>
            {activity.map((d, i) => (
              <Cell
                key={i}
                fill={d.count === 0 ? "var(--bg3)" : `rgba(88,166,255,${0.3 + (d.count / max) * 0.7})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
