type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[80%] lg:max-w-[70%] ${
          isUser ? "bg-gray-900 text-white" : "border bg-white text-gray-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
}