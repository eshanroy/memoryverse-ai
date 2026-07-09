import Aurora from "./Aurora";
import StarField from "./StarField";

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Aurora */}
      <Aurora />

      {/* Stars */}
      <StarField />

      {/* Purple Glow */}
      <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      {/* Cyan Glow */}
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
    </div>
  );
}

export default Background;