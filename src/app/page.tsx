import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import SearchBar from "./components/SearchBar";


type Tool = {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  logo_url: string | null;
  affiliate_url: string | null;
};

type Category = {
  name: string;
  slug: string;
};

export default async function HomePage() {
  // Kategorileri çek
  const { data: categories, error: catError } = await supabase
    .from("ai_categories")
    .select("name, slug")
    .order("name", { ascending: true });

  if (catError) {
    console.error(catError);
  }

  // Araçları çek
  const { data, error } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url, affiliate_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const tools = (data ?? []) as Tool[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">AI Hub</h1>
        <SearchBar />


        {/* Kategori chip'leri */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories?.map((cat: Category) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1 rounded-full bg-slate-800 text-xs hover:bg-slate-700 transition"
            >
              {cat.name}
            </a>
          ))}
        </div>

        <p className="text-slate-300 mb-8">
          En iyi yapay zeka araçlarını keşfet, karşılaştır ve kullan.
        </p>

        {tools.length === 0 && (
          <div className="text-slate-400">Henüz eklenmiş bir araç yok.</div>
        )}

        <div className="space-y-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="border border-slate-800 rounded-xl hover:border-slate-500 transition"
            >
              <Link
                href={`/tool/${tool.slug}`}
                className="p-4 flex items-center justify-between block"
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
                    <h2 className="font-semibold">{tool.name}</h2>
                    <p className="text-sm text-slate-400">
                      {tool.short_description ?? "Açıklama yakında."}
                    </p>
                  </div>
                </div>

                {tool.affiliate_url && (
                  <span className="text-sm font-medium underline">
                    İncele
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
