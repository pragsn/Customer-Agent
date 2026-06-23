import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <ChatWindow />
      </main>
    </>
  );
}