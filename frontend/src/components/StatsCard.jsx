function StatsCard({ title, value, color = "cyan" }) {
  const colors = {
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-400/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-400/20",
    green: "from-green-500/20 to-green-600/10 border-green-400/20",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-400/20",
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-md ${colors[color]}`}
    >
      <p className="text-gray-400">{title}</p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;