function Chip({ children }) {
  return (
    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
      {children}
    </span>
  );
}

function MemoryModal({ memory, onClose }) {
  if (!memory) return null;

  const skills = memory.skills ? memory.skills.split(",") : [];
  const technologies = memory.technologies
    ? memory.technologies.split(",")
    : [];
  const organizations = memory.organizations
    ? memory.organizations.split(",")
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0A0F1F] p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold">{memory.title}</h2>
            <p className="mt-2 text-cyan-400">{memory.category}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-500 px-4 py-2"
          >
            Close
          </button>
        </div>

        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Summary</h3>
          <p className="text-gray-300">{memory.summary}</p>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Skills</h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Chip key={skill}>{skill.trim()}</Chip>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Technologies</h3>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Chip key={tech}>{tech.trim()}</Chip>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Organizations</h3>

          <div className="flex flex-wrap gap-2">
            {organizations.map((org) => (
              <Chip key={org}>{org.trim()}</Chip>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xl font-semibold">
            Source File
          </h3>

          <p className="text-gray-400 break-all">
            {memory.source_file}
          </p>
        </section>
      </div>
    </div>
  );
}

export default MemoryModal;