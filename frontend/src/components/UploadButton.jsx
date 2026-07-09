import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { uploadMemory } from "../services/upload";

function UploadButton() {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(event) {
    const file = event.target.files[0];

    if (!file) return;

    setLoading(true);

    const loadingToast = toast.loading("🧠 AI is processing your memory...");

    try {
      const result = await uploadMemory(file);

      toast.update(loadingToast, {
        render: `✅ "${result.memory.title}" uploaded successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Temporary (we'll remove this in the next step)
      setTimeout(() => {
        window.location.reload();
      }, 1200);

    } catch (error) {
      console.error(error);

      toast.update(loadingToast, {
        render: "❌ Upload failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);

      // Allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFile}
      />

      <button
        onClick={() => inputRef.current.click()}
        disabled={loading}
        className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "+ Upload Memory"}
      </button>
    </>
  );
}

export default UploadButton;