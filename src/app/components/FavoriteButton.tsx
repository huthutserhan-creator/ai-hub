// src/app/components/FavoriteButton.tsx
"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  toolId: number;
};

export default function FavoriteButton({ toolId }: Props) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      setUserId(data.user.id);

      const { data: fav } = await supabase
        .from("user_favorites")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("tool_id", toolId)
        .maybeSingle();

      if (fav) setIsFav(true);
    }
    load();
  }, [supabase, toolId]);

  async function toggleFavorite() {
    if (!userId) {
      alert("Favorilere eklemek için önce giriş yap 🧠");
      return;
    }

    setLoading(true);

    if (isFav) {
      await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("tool_id", toolId);
      setIsFav(false);
    } else {
      await supabase.from("user_favorites").insert({
        user_id: userId,
        tool_id: toolId,
      });
      setIsFav(true);
    }

    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-2 ${
        isFav
          ? "border-amber-400 text-amber-300"
          : "border-slate-600 text-slate-200"
      }`}
    >
      {isFav ? "Favorilerden çıkar" : "Favorilere ekle"}
    </button>
  );
}
