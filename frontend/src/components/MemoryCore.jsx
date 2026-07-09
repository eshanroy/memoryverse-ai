import { motion } from "framer-motion";

function MemoryCore() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[550px] w-[550px] rounded-full bg-cyan-400/10 blur-[120px]"
      />

      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-96 w-96 rounded-full border border-cyan-400/20"
      />

      {/* Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-80 w-80 rounded-full border border-purple-400/20"
      />

      {/* Inner Energy */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl shadow-[0_0_80px_rgba(34,211,238,0.45)]"
      >
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="h-16 w-16 rounded-full bg-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.9)]"
        />
      </motion.div>

    </div>
  );
}

export default MemoryCore;