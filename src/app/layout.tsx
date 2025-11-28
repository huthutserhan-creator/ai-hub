// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "AI Hub – En iyi yapay zeka araçları",
  description:
    "En iyi AI araçlarını keşfet, karşılaştır ve favorilerine ekle. Chatbot, video, görsel, yazı ve verimlilik odaklı yapay zekalar tek platformda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
