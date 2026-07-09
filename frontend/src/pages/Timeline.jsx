import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import TimelineCard from "../components/TimelineCard";
import api from "../services/api";

function Timeline() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const response = await api.get("/memories");

        const sorted = response.data.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

        setMemories(sorted);
      } catch (error) {
        console.error(error);
      }
    }

    loadTimeline();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="mb-10 text-5xl font-bold">
        Timeline
      </h1>

      <div className="relative ml-10 border-l-2 border-cyan-500 pl-10">
        {memories.map((memory) => (
          <div key={memory.id} className="mb-8">
            <TimelineCard memory={memory} />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Timeline;