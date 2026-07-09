import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed left-1/2 top-6 z-50 w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Memory<span className="text-cyan-400">Verse</span>
        </Link>

        <div className="flex items-center gap-8 text-gray-300">

          <Link
            to="/"
            className="transition hover:text-cyan-400"
          >
            Home
          </Link>

          <Link
            to="/timeline"
            className="transition hover:text-cyan-400"
          >
            Timeline
          </Link>

          <button
  disabled
  title="Knowledge Graph will be available in the next version."
  className="cursor-not-allowed rounded-lg border border-white/10 px-3 py-2 text-gray-500 opacity-70"
>
  🕸️ Knowledge Graph
  <span className="ml-2 rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
    Coming Soon
  </span>
</button>

          <Link
            to="/dashboard"
            className="transition hover:text-cyan-400"
          >
            Dashboard
          </Link>

        </div>

        <Link
          to="/dashboard"
          className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-black transition hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;