import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

type Category = {
  id: number;
  name: string;
  description: string | null;
};

type Tool = {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  logo_url: string | null;
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1) Kategori bilgisini çek
  const { data: category, error: catError } = await supabase
    .from("ai_categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (catError || !category) {
    console.error("Category error:", catError);
    return notFound();
  }

  const cat = category as Category;

  // 2) Bu kategoriye bağlı AI tool'ları çek
  const { data: toolsData, error: toolsError } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url")
    .eq("category_id", cat.id)
    .order("created_at", { ascending: false });

  if (toolsError) {
    console.error("Tools error:", toolsError);
  }

  const tools = (toolsData ?? []) as Tool[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link
          href="/"
          className="text-sm text-slate-400 underline mb-4 inline-block"
        >
          ← Tüm kategorilere dön
        </Link>

        <h1 className="text-3xl font-bold mb-2">{cat.name}</h1>

        {cat.description && (
          <p className="text-slate-400 mb-8">{cat.description}</p>
        )}

        {tools.length === 0 && (
          <p className="text-slate-400 mt-4">
            Bu kategoride henüz listelenen bir AI aracı yok.
          </p>
        )}

        <div className="space-y-4">
          {tools.map((tool) => (
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
                  <h2 className="font-semibold">{tool.name}</h2>
                  <p className="text-sm text-slate-400">
                    {tool.short_description ?? "Açıklama yakında."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
