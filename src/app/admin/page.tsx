import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <main className="p-8 text-slate-100">
        <h1 className="text-2xl font-bold mb-4">Yetki Yok</h1>
        <p>Bu sayfaya sadece giriş yapmış kullanıcılar girebilir.</p>
      </main>
    );
  }

  return (
    <main className="p-8 text-slate-100">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <Link
        href="/admin/new-tool"
        className="px-4 py-2 bg-emerald-500 rounded text-slate-900 font-semibold"
      >
        Yeni AI Aracı Ekle
      </Link>
    </main>
  );
}
