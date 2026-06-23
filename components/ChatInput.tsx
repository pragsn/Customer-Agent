"use client";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend
}: ChatInputProps) {
  return (
    <div className="flex flex-col gap-3 border-t bg-white p-4 sm:flex-row">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
        placeholder="Example: I received a damaged product for ORD-1001"
        className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:border-gray-900"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Checking..." : "Send"}
      </button>
    </div>
  );
}