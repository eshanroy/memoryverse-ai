import { useEffect, useRef, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ChatBubble from "../components/ChatBubble";
import { askAura } from "../services/chat";

const suggestions = [
  "Summarize my resume",
  "What skills do I have?",
  "Show my certifications",
  "What technologies do I know?",
];

function Aura() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      message:
        "👋 Welcome to AURA!\n\nI'm your AI-powered memory assistant.\n\nI can answer questions about your:\n\n• Resume\n• Certificates\n• Projects\n• Skills\n• Technologies\n• Organizations\n\nTry one of the suggestions below 👇",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(customQuestion) {
    const text = customQuestion || question;

    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await askAura(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "❌ Sorry, something went wrong while processing your request.",
        },
      ]);
    }

    setLoading(false);
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        message:
          "👋 Welcome back!\nAsk me anything about your memories.",
      },
    ]);
  }

  return (
    <DashboardLayout>
      <div className="mx-auto flex h-[82vh] max-w-5xl flex-col">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              🤖 AURA
            </h1>

            <p className="mt-2 text-gray-400">
              Your AI-powered memory assistant.
            </p>
          </div>

          <button
            onClick={clearChat}
            className="rounded-xl border border-white/10 px-5 py-3 transition hover:bg-white/10"
          >
            🗑 Clear Chat
          </button>

        </div>

        {/* Suggestions */}

        <div className="mb-5 flex flex-wrap gap-3">

          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => sendMessage(item)}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
            >
              {item}
            </button>
          ))}

        </div>

        {/* Chat */}

        <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-6">

          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              message={msg.message}
            />
          ))}

          {loading && (
            <ChatBubble
              role="assistant"
              message="🧠 AURA is thinking..."
            />
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}

        <div className="mt-4 flex gap-3">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask AURA anything..."
            className="flex-1 rounded-xl border border-white/10 bg-[#0B1020] p-4 outline-none transition focus:border-cyan-400"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-7 font-bold text-black transition hover:scale-105 disabled:opacity-50"
          >
            Send
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Aura;