import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MemoryVault from "./pages/MemoryVault";
import Timeline from "./pages/Timeline";
import Aura from "./pages/Aura";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* MemoryVerse Features */}
        <Route path="/vault" element={<MemoryVault />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/aura" element={<Aura />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;