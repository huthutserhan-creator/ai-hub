// src/app/category/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { data: category, error: catError } = await supabase
    .from("ai_categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (catError || !category) return notFound();

  const { data: tools } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-slate-400 underline mb-4 inline-block"
      >
        ← Ana sayfaya dön
      </Link>

      <h1 className="text-3xl font-bold mb-1">{category.name}</h1>
      {category.description && (
        <p className="text-slate-300 mb-6">{category.description}</p>
      )}

      <div className="space-y-3">
        {tools?.map((tool) => (
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

        {!tools?.length && (
          <p className="text-slate-500">
            Bu kategoride henüz araç yok. Admin panelden ekleyebilirsin.
          </p>
        )}
      </div>
    </main>
  );
}
