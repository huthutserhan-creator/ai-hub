"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function signIn() {
    await supabase.auth.signInWithOtp({ email: prompt("E-mail adresin?") || "" });
    alert("Mailine giriş linki gönderildi!");
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">AI Hub</Link>

      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-sm underline">Admin</Link>

        {/* FAVORİLERİM */}
        <Link href="/favorites" className="text-sm underline">
          Favorilerim
        </Link>

        {!user ? (
          <button onClick={signIn} className="text-sm opacity-70 hover:opacity-100">
            Giriş Yap
          </button>
        ) : (
          <button onClick={signOut} className="text-sm opacity-70 hover:opacity-100">
            Çıkış Yap
          </button>
        )}
      </div>
    </nav>
  );
}
