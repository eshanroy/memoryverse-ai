import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import MemoryCore from "./MemoryCore";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* AI Memory Core */}
      <MemoryCore />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl text-center"
      >
        <p className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur-md">
          ✨ AI Powered Digital Identity
        </p>

        <h1 className="text-6xl font-extrabold leading-tight md:text-8xl">
          Every <span className="text-cyan-400">Achievement</span>
          <br />
          Tells a Story.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-300">
          Upload certificates, resumes, internships, projects and
          achievements. MemoryVerse AI understands your journey,
          connects every experience, and lets you ask your memories
          anything.
        </p>

        <div className="mt-12 flex justify-center">
          <Link
            to="/upload"
            className="rounded-2xl bg-cyan-400 px-10 py-4 font-bold text-black transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          >
            🚀 Preserve a Memory
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;