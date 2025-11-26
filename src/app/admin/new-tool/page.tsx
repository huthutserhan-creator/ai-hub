"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function NewToolPage() {
  const supabase = createClientComponentClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    short_description: "",
    long_description: "",
    website_url: "",
    affiliate_url: "",
    logo_url: "",
    pricing_model: "",
    category_id: "",
  });

  async function submit(e: any) {
    e.preventDefault();

    const { error } = await supabase.from("ai_tools").insert(form);

    if (error) {
      alert("Hata: " + error.message);
    } else {
      alert("Yeni AI aracı eklendi!");
    }
  }

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <main className="p-8 text-slate-100">
      <h1 className="text-2xl font-bold mb-4">Yeni AI Aracı Ekle</h1>

      <form onSubmit={submit} className="space-y-4 max-w-xl">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block mb-1 text-sm font-medium">{key}</label>
            <input
              value={(form as any)[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            />
          </div>
        ))}

        <button
          className="px-4 py-2 bg-emerald-500 text-slate-900 rounded font-semibold"
          type="submit"
        >
          Kaydet
        </button>
      </form>
    </main>
  );
}
