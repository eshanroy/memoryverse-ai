import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <Background />
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;