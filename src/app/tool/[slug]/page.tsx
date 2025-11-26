import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import FavoriteButton from "@/app/components/FavoriteButton";

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("ai_tools")
    .select(
      "id, name, short_description, long_description, website_url, affiliate_url, logo_url, pricing_model"
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error(error);
    return notFound();
  }

  const tool = data as {
    id: number;
    name: string;
    short_description: string | null;
    long_description: string | null;
    website_url: string | null;
    affiliate_url: string | null;
    logo_url: string | null;
    pricing_model: string | null;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <a href="/" className="text-sm text-slate-400 underline mb-4 inline-block">
          ← Tüm AI araçlarına dön
        </a>

        <div className="flex items-center gap-4 mb-6">
          {tool.logo_url && (
            <img
              src={tool.logo_url}
              alt={tool.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1">{tool.name}</h1>
            {tool.short_description && (
              <p className="text-slate-300">{tool.short_description}</p>
            )}
          </div>
        </div>

        {tool.long_description && (
          <p className="text-slate-200 mb-6 leading-relaxed whitespace-pre-line">
            {tool.long_description}
          </p>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {tool.affiliate_url && (
            <a
              href={tool.affiliate_url}
              target="_blank"
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm"
            >
              Aracı İncele / Kullan
            </a>
          )}

          {tool.website_url && tool.website_url !== tool.affiliate_url && (
            <a
              href={tool.website_url}
              target="_blank"
              className="px-4 py-2 rounded-lg border border-slate-600 text-sm"
            >
              Resmi Sitesi
            </a>
          )}

          {tool.pricing_model && (
            <span className="px-3 py-1 rounded-full bg-slate-800 text-xs uppercase tracking-wide">
              {tool.pricing_model}
            </span>
          )}

          {/* Favori butonu */}
          <FavoriteButton toolId={tool.id} />
        </div>
      </div>
    </main>
  );
}
