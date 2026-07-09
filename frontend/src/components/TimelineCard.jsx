function TimelineCard({ memory }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <div className="absolute -left-10 top-8 h-4 w-4 rounded-full bg-cyan-400"></div>

      <h2 className="text-2xl font-bold">
        {memory.title}
      </h2>

      <p className="mt-2 text-cyan-400">
        {memory.category}
      </p>

      <p className="mt-4 text-gray-300">
        {memory.summary}
      </p>

      <p className="mt-5 text-sm text-gray-500">
        {memory.created_at}
      </p>
    </div>
  );
}

export default TimelineCard;