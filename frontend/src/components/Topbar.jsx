import UploadButton from "./UploadButton";

function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#050816] px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome to MemoryVerse 👋
        </h2>

        <p className="text-gray-400">
          Your AI-powered digital identity.
        </p>
      </div>

      <UploadButton />
    </header>
  );
}

export default Topbar;