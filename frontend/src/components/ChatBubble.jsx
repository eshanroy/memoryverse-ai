function ChatBubble({ role, message }) {
  const isUser = role === "user";

  return (
    <div
      className={`mb-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-cyan-500 text-black"
            : "bg-white/10 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;