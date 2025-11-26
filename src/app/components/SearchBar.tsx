"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="AI araçlarında ara..."
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
      />
    </form>
  );
}
