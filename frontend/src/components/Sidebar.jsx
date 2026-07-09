import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    icon: "📊",
    path: "/dashboard",
  },
  {
    name: "Memory Vault",
    icon: "🧠",
    path: "/vault",
  },
  {
    name: "Upload",
    icon: "📤",
    path: "/upload",
  },
  {
    name: "Timeline",
    icon: "📅",
    path: "/timeline",
  },
  {
    name: "AURA",
    icon: "🤖",
    path: "/aura",
  },
];

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-white/10 bg-[#0A0F1F] p-6">
      <h1 className="mb-10 text-3xl font-bold text-cyan-400">
        MemoryVerse
      </h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-5 py-3 transition ${
                isActive
                  ? "bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-500/20"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            <span className="text-xl">
              {link.icon}
            </span>

            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
        <p className="text-sm text-cyan-300">
          🤖 <strong>AURA</strong> is ready to answer questions about your memories.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;