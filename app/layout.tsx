import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Refund Agent",
  description: "AI Customer Support Agent for refund decisions"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}