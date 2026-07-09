import { useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);

      setResult({
        success: false,
        message:
          error.response?.data?.detail ||
          "Something went wrong while uploading the document.",
      });
    } finally {
      setLoading(false);
    }
  }

  function uploadAnother() {
    setFile(null);
    setResult(null);
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold">
          Upload Memory 📤
        </h1>

        <p className="mt-3 text-gray-400">
          Upload resumes, certificates, internships,
          projects and achievements.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg">

          {/* Drag & Drop Area */}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-14 text-center transition-all duration-300 ${
              dragging
                ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
                : "border-cyan-400/30 bg-[#0B1020]"
            }`}
          >
            <div className="text-7xl">📄</div>

            <h2 className="mt-6 text-3xl font-bold">
              Drag & Drop your PDF
            </h2>

            <p className="mt-3 text-gray-400">
              or click below to browse your computer
            </p>

            <label className="mt-8 inline-block cursor-pointer rounded-xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105">
              Choose File

              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />
            </label>

            {file && (
              <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <p className="text-lg font-semibold text-cyan-300">
                  ✅ {file.name}
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Ready to upload
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Uploading..." : "🚀 Upload Memory"}
            </button>
          </div>

          {/* Result */}

          {result && (
            <div
              className={`mt-10 rounded-3xl p-8 ${
                result.success
                  ? "border border-green-500/30 bg-green-500/10"
                  : "border border-red-500/30 bg-red-500/10"
              }`}
            >
              {result.success ? (
                <>
                  <h2 className="text-3xl font-bold text-green-400">
                    🎉 Memory Preserved Successfully
                  </h2>

                  <div className="mt-8 space-y-4">

                    <p>
                      <span className="font-bold">
                        📄 File:
                      </span>{" "}
                      {result.filename}
                    </p>

                    <p>
                      <span className="font-bold">
                        📝 Title:
                      </span>{" "}
                      {result.memory.title}
                    </p>

                    <p>
                      <span className="font-bold">
                        📂 Category:
                      </span>{" "}
                      {result.memory.category}
                    </p>

                    <p>
                      <span className="font-bold">
                        📖 Summary:
                      </span>{" "}
                      {result.memory.summary}
                    </p>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">

                    <Link
                      to="/vault"
                      className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
                    >
                      View Memory Vault →
                    </Link>

                    <button
                      onClick={uploadAnother}
                      className="rounded-xl border border-white/20 px-6 py-3 transition hover:bg-white/10"
                    >
                      Upload Another
                    </button>

                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-red-400">
                    ❌ Upload Failed
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-gray-300">
                    {result.message}
                  </p>

                  <button
                    onClick={uploadAnother}
                    className="mt-6 rounded-xl border border-white/20 px-6 py-3 transition hover:bg-white/10"
                  >
                    Try Another File
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Upload;