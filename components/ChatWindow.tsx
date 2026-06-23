"use client";

import { useState } from "react";
import AgentStatus from "./AgentStatus";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I am your AI refund assistant. Please share your order ID and refund reason."
    }
  ]);

  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message
        }
      ]);

      setLogs(data.logs || []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[1.7fr_1fr]">
      <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold sm:text-2xl">Customer Chat</h1>
          <p className="mt-1 text-sm text-gray-500">
            Submit a refund request and let the AI agent evaluate it.
          </p>
        </div>

        <div className="h-[55vh] min-h-[380px] max-h-[720px] space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>

        <ChatInput
          value={input}
          loading={loading}
          onChange={setInput}
          onSend={handleSend}
        />
      </section>

      <aside className="space-y-4">
        <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-3 text-lg font-semibold">Look Ups</h2>

          <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
  <h2 className="mb-3 text-lg font-semibold">
    Refund Policy Summary
  </h2>

  <div className="space-y-3 text-sm text-gray-600">
    <div className="rounded-xl bg-gray-50 p-3">
      ✓ Refunds are allowed within 14 days of delivery
    </div>

    <div className="rounded-xl bg-gray-50 p-3">
      ✕ Digital Products are non-refundable
    </div>

    <div className="rounded-xl bg-gray-50 p-3">
      ✕ Gift Cards are non-refundable
    </div>

    <div className="rounded-xl bg-gray-50 p-3">
      Valid refund reasons:
      <ul className="mt-2 ml-4 list-disc">
        <li>Damaged product</li>
        <li>Defective item</li>
        <li>Wrong item received</li>
        <li>Missing parts</li>
        <li>Not as described</li>
      </ul>
    </div>
  </div>
</div>
        </div>

        <AgentStatus logs={logs} />
      </aside>
    </div>
  );
}