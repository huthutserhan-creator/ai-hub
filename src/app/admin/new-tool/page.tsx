// src/app/admin/new-tool/page.tsx
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function NewToolPage() {
  const supabase = createClientComponentClient();
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    supabase
      .from("ai_categories")
      .select("id, name")
      .order("name", { ascending: true })
      .then(({ data }) => {
        setCategories((data as Category[]) || []);
      });
  }, [supabase]);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      category_id: form.category_id ? Number(form.category_id) : null,
    };

    const { error } = await supabase.from("ai_tools").insert(payload);

    if (error) {
      alert("Hata: " + error.message);
    } else {
      alert("Yeni AI aracı eklendi!");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Yeni AI Aracı Ekle</h1>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            placeholder="chatgpt, midjourney gibi..."
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Kısa Açıklama
          </label>
          <input
            value={form.short_description}
            onChange={(e) => update("short_description", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Uzun Açıklama
          </label>
          <textarea
            value={form.long_description}
            onChange={(e) => update("long_description", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700 min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Website URL
            </label>
            <input
              value={form.website_url}
              onChange={(e) => update("website_url", e.target.value)}
              className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Affiliate URL
            </label>
            <input
              value={form.affiliate_url}
              onChange={(e) => update("affiliate_url", e.target.value)}
              className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Logo URL</label>
          <input
            value={form.logo_url}
            onChange={(e) => update("logo_url", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Pricing Model
          </label>
          <input
            value={form.pricing_model}
            onChange={(e) => update("pricing_model", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            placeholder="free, freemium, paid..."
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Kategori</label>
          <select
            value={form.category_id}
            onChange={(e) => update("category_id", e.target.value)}
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          >
            <option value="">Seç...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

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
