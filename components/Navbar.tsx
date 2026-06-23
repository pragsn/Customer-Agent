import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-gray-900 sm:text-xl">
          AI Refund Agent
        </Link>

        <div className="flex flex-wrap gap-3 text-sm font-medium sm:gap-6 sm:text-base">
          <Link href="/" className="text-gray-700 hover:text-black">
            Customer Chat
          </Link>

          <Link href="/admin" className="text-gray-700 hover:text-black">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}