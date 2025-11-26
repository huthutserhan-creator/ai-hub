import { supabase } from "@/lib/supabaseClient";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";

  const { data } = await supabase
    .from("ai_tools")
    .select("id, name, slug, short_description, logo_url")
    .ilike("name", `%${q}%`);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">
          Arama Sonuçları: "{q}"
        </h1>

        <div className="space-y-4">
          {data?.map((tool) => (
            <a
              key={tool.id}
              href={`/tool/${tool.slug}`}
              className="block border border-slate-800 rounded-xl p-4 hover:border-slate-500 transition"
            >
              <div className="flex items-center gap-3">
                {tool.logo_url && (
                  <img
                    src={tool.logo_url}
                    className="w-10 h-10 rounded-lg"
                  />
                )}
                <div>
                  <h2 className="font-semibold">{tool.name}</h2>
                  <p className="text-sm text-slate-400">
                    {tool.short_description}
                  </p>
                </div>
              </div>
            </a>
          ))}

          {data?.length === 0 && (
            <p className="text-slate-400">Sonuç bulunamadı.</p>
          )}
        </div>
      </div>
    </main>
  );
}
