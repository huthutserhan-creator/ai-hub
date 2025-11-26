import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Kategori bilgisi
  const { data: category, error: catError } = await supabase
    .from("ai_categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (catError || !category) return notFound();

  // Araçlar
  const { data: tools, error: toolError } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  if (!tools) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link href="/" className="text-sm text-slate-400 underline mb-4 inline-block">
          ← Tüm kategorilere dön
        </Link>

        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-slate-400 mb-8">{category.description}</p>
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
