// src/app/page.tsx
import { supabase } from "@/lib/supabaseClient";
import SearchBar from "./components/SearchBar";
import Link from "next/link";

type Category = {
  slug: string;
  name: string;
};

type Tool = {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  logo_url: string | null;
};

export default async function HomePage() {
  const { data: categories } = await supabase
    .from("ai_categories")
    .select("slug, name")
    .order("name", { ascending: true });

  const { data: tools } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">
        AI Hub – Yapay Zeka Araç Marketi
      </h1>
      <p className="text-slate-300 mb-6">
        En iyi yapay zeka araçlarını keşfet, karşılaştır, favorilerine ekle.
      </p>

      <SearchBar />

      <div className="flex flex-wrap gap-3 mb-8">
        {categories?.map((cat: Category) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs hover:border-slate-400"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Son Eklenen AI Araçları</h2>

      <div className="space-y-3">
        {tools?.map((tool: Tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.slug}`}
            className="block border border-slate-800 rounded-xl p-4 hover:border-slate-500 transition"
          >
            <div className="flex items-center gap-3">
              {tool.logo_url && (
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold">{tool.name}</h3>
                <p className="text-sm text-slate-400">
                  {tool.short_description ?? "Açıklama yakında."}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {!tools?.length && (
          <p className="text-slate-500">
            Henüz eklenmiş bir araç yok. Admin panelden ekleyebilirsin.
          </p>
        )}
      </div>
    </main>
  );
}
