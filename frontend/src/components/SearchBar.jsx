import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search your memories with AI..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none backdrop-blur-md transition focus:border-cyan-400"
      />
    </div>
  );
}

export default SearchBar;