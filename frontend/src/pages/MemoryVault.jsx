import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import MemoryCard from "../components/MemoryCard";
import MemoryModal from "../components/MemoryModal";
import SearchBar from "../components/SearchBar";
import api from "../services/api";

function MemoryVault() {
  const [memories, setMemories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllMemories();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      loadAllMemories();
    } else {
      searchMemories();
    }
  }, [query]);

  async function loadAllMemories() {
    try {
      setLoading(true);

      const response = await api.get("/memories");

      setMemories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function searchMemories() {
    try {
      setLoading(true);

      const response = await api.get(`/search?q=${query}`);

      const results = response.data.results;

      const mapped = results.map((item) => ({
        id: item.memory_id,
        title: item.title,
        category: item.category,
        summary: item.summary,
        skills: item.skills || "",
        technologies: item.technologies || "",
        organizations: item.organizations || "",
        source_file: item.source_file || "",
      }));

      setMemories(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Memory Vault
        </h1>

        <p className="mt-3 text-gray-400">
          Browse and search all your AI memories.
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      {loading ? (
        <div className="mt-12 text-center text-gray-400">
          Loading memories...
        </div>
      ) : memories.length === 0 ? (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold">
            No memories found
          </h2>

          <p className="mt-2 text-gray-400">
            Try another search or upload a new memory.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onClick={setSelectedMemory}
            />
          ))}
        </div>
      )}

      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </DashboardLayout>
  );
}

export default MemoryVault;