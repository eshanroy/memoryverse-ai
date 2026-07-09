import { motion } from "framer-motion";

function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora - Cyan */}
      <motion.div
        animate={{
          x: [-60, 60, -60],
          y: [-20, 20, -20],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[140px]"
      />

      {/* Aurora - Purple */}
      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [20, -20, 20],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[160px]"
      />
    </div>
  );
}

export default Aurora;