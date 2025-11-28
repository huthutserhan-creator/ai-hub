// src/app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

  async function signIn() {
    const email = prompt("Giriş için e-mail adresini yaz:");
    if (!email) return;
    await supabase.auth.signInWithOtp({ email });
    alert("Mailine giriş linki gönderildi 👌");
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          AI Hub
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/favorites" className="underline underline-offset-4">
            Favorilerim
          </Link>
          <Link href="/admin" className="underline underline-offset-4">
            Admin
          </Link>

          {!user ? (
            <button
              onClick={signIn}
              className="px-3 py-1 rounded-lg border border-slate-600 hover:border-slate-400"
            >
              Giriş Yap
            </button>
          ) : (
            <button
              onClick={signOut}
              className="px-3 py-1 rounded-lg border border-slate-600 hover:border-red-400"
            >
              Çıkış Yap
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
