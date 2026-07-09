function MemoryCard({ memory, onClick }) {
  const skills = memory.skills
    ? memory.skills.split(",").slice(0, 5)
    : [];

  return (
    <div
      onClick={() => onClick(memory)}
      className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {memory.title}
          </h2>

          <p className="mt-2 text-cyan-400">
            {memory.category}
          </p>
        </div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          📄 {memory.category}
        </span>
      </div>

      <p className="mt-5 line-clamp-3 text-gray-300">
        {memory.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-gray-400">
          Click to view details →
        </span>

        <span className="text-cyan-400">
          →
        </span>
      </div>
    </div>
  );
}

export default MemoryCard;