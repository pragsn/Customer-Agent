"use client";

import { useState } from "react";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
 onerror: (() => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  const [listening, setListening] = useState(false);

  function handleVoiceInput() {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Could not capture voice. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

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
  type="button"
  onClick={handleVoiceInput}
  disabled={loading || listening}
  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:opacity-50 ${
    listening
      ? "border-red-200 bg-red-50 text-red-600"
      : "bg-white text-gray-700 hover:bg-gray-50"
  }`}
>
  <span className="relative flex h-3 w-3">
    {listening && (
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
    )}
    <span
      className={`relative inline-flex h-3 w-3 rounded-full ${
        listening ? "bg-red-500" : "bg-gray-400"
      }`}
    />
  </span>

  {listening ? "Listening" : ""}
</button>

      <button
        type="button"
        onClick={onSend}
        disabled={loading}
        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Checking..." : "Send"}
      </button>
    </div>
  );
}