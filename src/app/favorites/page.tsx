import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type FavoriteRow = {
  id: number;
  tool: {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    logo_url: string | null;
  }[] | null; // <-- DİKKAT: ARRAY OLARAK TANIMLADIK
};

export default async function FavoritesPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold mb-4">Favoriler</h1>
          <p className="text-slate-300">
            Favorilerini görmek için giriş yapman gerekiyor.
          </p>
        </div>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .select(
      `
      id,
      tool:ai_tools (
        id,
        name,
        slug,
        short_description,
        logo_url
      )
    `
    )
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const favorites = (data ?? []) as FavoriteRow[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Favori AI Araçların</h1>

        <div className="space-y-4">
          {favorites.map((row) => {
            // Supabase tool'u array olarak döndürdüğü için ilk elemanı alıyoruz
            const tool = row.tool?.[0];
            if (!tool) return null;

            return (
              <Link
                key={row.id}
                href={`/tool/${tool.slug}`}
                className="block border border-slate-800 rounded-xl p-4 hover:border-slate-500 transition"
              >
                <div className="flex items-center gap-3">
                  {tool.logo_url && (
                    <img
                      src={tool.logo_url}
                      className="w-10 h-10 rounded-lg"
                      alt={tool.name}
                    />
                  )}
                  <div>
                    <h2 className="font-semibold">{tool.name}</h2>
                    <p className="text-sm text-slate-400">
                      {tool.short_description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}

          {(!favorites || favorites.length === 0) && (
            <p className="text-slate-400">
              Henüz favoriye eklediğin bir AI aracı yok.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
