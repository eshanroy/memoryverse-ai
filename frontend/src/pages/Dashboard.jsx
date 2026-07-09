import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import api from "../services/api";

function Dashboard() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMemories() {
      try {
        const response = await api.get("/memories");

        console.log("API Response:", response.data);

        setMemories(response.data);
      } catch (error) {
        console.error("Error loading memories:", error);

        if (error.response) {
          console.error("Response:", error.response.data);
        }

        if (error.request) {
          console.error("Request:", error.request);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMemories();
  }, []);

  const totalCategories = new Set(
    memories.map((m) => m.category)
  ).size;

  const totalOrganizations = new Set(
    memories.flatMap((m) =>
      m.organizations
        ? m.organizations.split(",").map((o) => o.trim())
        : []
    )
  ).size;

  const totalSkills = new Set(
    memories.flatMap((m) =>
      m.skills
        ? m.skills.split(",").map((s) => s.trim().toLowerCase())
        : []
    )
  ).size;

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold">
        Dashboard
      </h1>

      <p className="mt-3 text-gray-400">
        Your AI-powered digital identity at a glance.
      </p>

      {loading ? (
        <p className="mt-6 text-gray-400">
          Loading memories...
        </p>
      ) : (
        <>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Memories"
              value={memories.length}
              color="cyan"
            />

            <StatsCard
              title="Categories"
              value={totalCategories}
              color="purple"
            />

            <StatsCard
              title="Organizations"
              value={totalOrganizations}
              color="green"
            />

            <StatsCard
              title="Skills"
              value={totalSkills}
              color="orange"
            />
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold">
              Recent Memories
            </h2>

            <div className="grid gap-6">
              {memories.slice(0, 3).map((memory) => (
                <div
                  key={memory.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <h3 className="text-2xl font-bold">
                    {memory.title}
                  </h3>

                  <p className="mt-2 text-cyan-400">
                    {memory.category}
                  </p>

                  <p className="mt-4 text-gray-300">
                    {memory.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;